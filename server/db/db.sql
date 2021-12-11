CREATE TABLE athletes(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  gender VARCHAR(30),
  dob VARCHAR(4),
  club VARCHAR(50)
);

CREATE TABLE events(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	type VARCHAR(10),
	date DATE,
	time TIME,
	location VARCHAR(100),
	city VARCHAR(30),
	distance VARCHAR(5),
	unit VARCHAR(2),
  info TEXT,
  homepage TEXT
);

CREATE TABLE results(
	id SERIAL PRIMARY KEY,
	events_id SMALLINT NOT NULL,
	athletes_id SMALLINT NOT NULL,
	hours VARCHAR(2),
	minutes VARCHAR(2),
  seconds VARCHAR(2)
);
