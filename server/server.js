require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const { request } = require('express');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Athletes

app
  .route('/api/v1/athletes')
  .get(async (request, response, next) => {
    try {
      const data = await db.query('SELECT * FROM athletes ORDER BY id ASC');

      response.status(200).json({
        status: 'success',
        data: data.rows,
      });
    } catch (error) {
      console.error('Error', error);
    }
  })
  .post(async (request, response, next) => {
    const { firstname, lastname, gender, dob, club } = request.body;

    try {
      const data = await db.query(
        'INSERT INTO athletes (firstname, lastname, gender, dob, club) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [firstname, lastname, gender, dob, club]
      );

      response.status(200).json({
        status: 'success',
        data: data.rows[0],
      });
    } catch (error) {
      console.error('Error', error);
    }
  });

// Athletes ID

app
  .route('/api/v1/athletes/:id')
  .get(async (request, response, next) => {
    const { id } = request.params;

    try {
      const data = await db.query('SELECT * FROM athletes WHERE id = $1', [id]);

      response.status(200).json({
        status: 'success',
        data: data.rows[0],
      });
    } catch (error) {
      console.error('Error', error);
    }
  })
  .put(async (request, response, next) => {
    const { id } = request.params;
    const { firstname, lastname, gender, dob, club } = request.body;

    try {
      const data = await db.query(
        'UPDATE athletes SET firstname = $2, lastname = $3, gender = $4, dob = $5, club = $6 WHERE id = $1 RETURNING *',
        [id, firstname, lastname, gender, dob, club]
      );

      response.status(200).json({
        status: 'success',
        data: data.rows[0],
      });
    } catch (error) {
      console.error('Error', error);
    }
  })
  .delete(async (request, response, next) => {
    const { id } = request.params;

    try {
      const data = await db.query(
        'DELETE FROM athletes WHERE id = $1 RETURNING id',
        [id]
      );

      response.status(200).json({
        status: 'success',
        data: data.rows[0],
      });
    } catch (error) {
      console.error('Error', error);
    }
  });

// Events

app
  .route('/api/v1/events')
  .get(async (request, response, next) => {
    try {
      const data = await db.query(
        'SELECT * FROM events ORDER BY date DESC, time DESC'
      );

      response.status(200).json({
        status: 'success',
        data: data.rows,
      });
    } catch (error) {
      console.error('Error', error);
    }
  })
  .post(async (request, response, next) => {
    const {
      name,
      type,
      date,
      time,
      location,
      city,
      distance,
      unit,
      info,
      homepage,
    } = request.body;

    try {
      const data = await db.query(
        'INSERT INTO events (name, type, date, time, location, city, distance, unit, info, homepage) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [name, type, date, time, location, city, distance, unit, info, homepage]
      );

      response.status(200).json({
        status: 'success',
        data: data.rows[0],
      });
    } catch (error) {
      console.error('Error', error);
    }
  });

// Events ID

app
  .route('/api/v1/events/:id')
  .get(async (request, response, next) => {
    const { id } = request.params;

    try {
      const data = await db.query('SELECT * FROM events WHERE id = $1', [id]);

      response.status(200).json({
        status: 'success',
        data: data.rows[0],
      });
    } catch (error) {
      console.error('Error', error);
    }
  })
  .put(async (request, response, next) => {
    const { id } = request.params;
    const {
      name,
      type,
      date,
      time,
      location,
      city,
      distance,
      unit,
      info,
      homepage,
    } = request.body;

    try {
      const data = await db.query(
        'UPDATE events SET name = $2, type = $3, date = $4, time = $5, location = $6, city = $7, distance = $8, unit = $9, info = $10, homepage = $11 WHERE id = $1 RETURNING *',
        [
          id,
          name,
          type,
          date,
          time,
          location,
          city,
          distance,
          unit,
          info,
          homepage,
        ]
      );

      response.status(200).json({
        status: 'success',
        data: data.rows[0],
      });
    } catch (error) {
      console.error('Error', error);
    }
  })
  .delete(async (request, response, next) => {
    const { id } = request.params;

    try {
      const data = await db.query(
        'DELETE FROM events WHERE id = $1 RETURNING id',
        [id]
      );

      response.status(200).json({
        status: 'success',
        data: data.rows[0],
      });
    } catch (error) {
      console.error('Error', error);
    }
  });

// Results

app.route('/api/v1/results').post(async (request, response, next) => {
  const { events_id, athletes_id, hours, minutes, seconds } = request.body;

  try {
    const data = await db.query(
      'INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [events_id, athletes_id, hours, minutes, seconds]
    );

    response.status(200).json({
      status: 'success',
      data: data.rows[0],
    });
  } catch (error) {
    console.error('Error', error);
  }
});

// Results ID

app.route('/api/v1/results/:id').delete(async (request, response, next) => {
  const { id } = request.params;

  try {
    const data = await db.query(
      'DELETE FROM results WHERE id = $1 RETURNING id',
      [id]
    );

    response.status(200).json({
      status: 'success',
      data: data.rows[0],
    });
  } catch (error) {
    console.error('Error', error);
  }
});

// Results athlete ID

app
  .route('/api/v1/results/athlete/:id')
  .get(async (request, response, next) => {
    const { id } = request.params;

    try {
      const data = await db.query(
        'SELECT e.id, e.date, e.name, e.distance, e.unit, e.type, r.hours, r.minutes, r.seconds FROM events e, results r WHERE r.athletes_id = $1 AND e.id = r.events_id ORDER BY e.date DESC',
        [id]
      );

      response.status(200).json({
        status: 'success',
        data: data.rows,
      });
    } catch (error) {
      console.error('Error', error);
    }
  });

// Results event ID

app.route('/api/v1/results/event/:id').get(async (request, response, next) => {
  const { id } = request.params;

  try {
    const data = await db.query(
      'SELECT id, events_id, athletes_id, hours, minutes, seconds, RANK () OVER ( ORDER BY hours, minutes, seconds ) rank FROM results WHERE events_id = $1 ORDER BY rank ASC RETURNING *',
      [id]
    );

    response.status(200).json({
      status: 'success',
      data: data.rows,
    });
  } catch (error) {
    console.error('Error', error);
  }
});

app.listen(PORT, () => console.info('App is running on port', +PORT));
