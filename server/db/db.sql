CREATE TABLE athletes(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  gender VARCHAR(30),
  dob VARCHAR(4),
  club VARCHAR(50)
);

INSERT INTO athletes (firstname, lastname, gender, dob, club) VALUES ('Pontus', 'Gustafsson', 'male', '1983', 'Pite Runners LDK');
INSERT INTO athletes (firstname, lastname, gender, dob, club) VALUES ('Elin', 'Vikström', 'female', '1990', 'Pite Runners LDK');
INSERT INTO athletes (firstname, lastname, gender, dob, club) VALUES ('Sammy', 'Pergament', 'male', '1985', 'Pite Runners LDK');

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

/* 2020 */
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Träningstävling', 'club', '2020-05-21', '09:00:00', 'Norrstrand', 'Piteå', '10', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Martins träningstävling', 'club', '2020-07-02', '18:00:00', 'Grisberget', 'Piteå', '4,9', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Martins träningstävling', 'club', '2020-07-09', '18:00:00', 'Grisberget', 'Piteå', '3,1', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Martins träningstävling', 'club', '2020-07-16', '18:00:00', 'Grisberget', 'Piteå', '4', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Martins träningstävling', 'club', '2020-07-23', '18:00:00', 'Grisberget', 'Piteå', '4,9', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Martins träningstävling', 'club', '2020-07-30', '18:00:00', 'Grisberget', 'Piteå', '10', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Träningstävling', 'club', '2020-09-08', '18:00:00', 'LF arena', 'Piteå', '3000', 'm');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Träningstävling', 'club', '2020-10-06', '18:00:00', 'LF arena', 'Piteå', '5000', 'm');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Träningstävling', 'club', '2020-10-11', '08:30:00', 'Öjebyn', 'Piteå', '10', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Träningstävling', 'club', '2020-11-04', '17:15:00', 'PiteEnergi arena', 'Piteå', '1000', 'm');

/* 2021 */
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Time Trial', 'club', '2021-05-08', '09:00:00', 'Polishuset', 'Piteå', '5', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Time Trial', 'club', '2021-05-22', '09:00:00', 'Öjebyn', 'Piteå', '10', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Time Trial', 'club', '2021-06-19', '09:00:00', 'LF arena', 'Piteå', '10000', 'm');


CREATE TABLE results(
  id SERIAL PRIMARY KEY,
  events_id SMALLINT NOT NULL,
  athletes_id SMALLINT NOT NULL,
  hours VARCHAR(2),
  minutes VARCHAR(2),
  seconds VARCHAR(2)
);

/* 2020 */
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (1, 1, '0', '37', '52');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (2, 1, '0', '17', '58');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (2, 3, '0', '17', '50');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (3, 1, '0', '10', '53');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (3, 2, '0', '12', '59');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (3, 3, '0', '10', '40');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (4, 1, '0', '14', '25');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (4, 2, '0', '16', '47');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (4, 3, '0', '13', '51');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (5, 1, '0', '17', '43');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (5, 2, '0', '20', '42');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (6, 1, '0', '38', '43');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (6, 2, '0', '44', '50');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (6, 3, '0', '37', '52');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (7, 1, '0', '10', '14');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (7, 3, '0', '09', '55');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (8, 3, '0', '16', '55');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (9, 1, '0', '35', '43');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (9, 2, '0', '40', '14');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (9, 3, '0', '35', '37');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (10, 3, '0', '02', '43');

/* 2021 */
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (11, 1, '0', '17', '30');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (11, 2, '0', '18', '20');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (11, 3, '0', '16', '42');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (12, 1, '0', '39', '15');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (12, 2, '0', '39', '10');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (12, 3, '0', '35', '14');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (13, 1, '0', '36', '14');
INSERT INTO results (events_id, athletes_id, hours, minutes, seconds) VALUES (13, 2, '0', '38', '29');

