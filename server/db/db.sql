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

INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Träningstävling', 'club', '2020-05-21', '09:00:00', 'Norrstrand', 'Piteå', '10', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Martins träningstävling', 'club', '2020-07-02', '18:00:00', 'Grisberget', 'Piteå', '4,9', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Martins träningstävling', 'club', '2020-07-09', '18:00:00', 'Grisberget', 'Piteå', '3,1', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Martins träningstävling', 'club', '2020-07-16', '18:00:00', 'Grisberget', 'Piteå', '4', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Martins träningstävling', 'club', '2020-07-23', '18:00:00', 'Grisberget', 'Piteå', '4,9', 'km');
INSERT INTO events (name, type, date, time, location, city, distance, unit) VALUES ('Martins träningstävling', 'club', '2020-07-30', '18:00:00', 'Grisberget', 'Piteå', '10', 'km');

CREATE TABLE results(
  id SERIAL PRIMARY KEY,
  events_id SMALLINT NOT NULL,
  athletes_id SMALLINT NOT NULL,
  hours VARCHAR(2),
  minutes VARCHAR(2),
  seconds VARCHAR(2)
);

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
