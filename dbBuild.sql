use phoneDetails;

CREATE TABLE Phones (
  id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Capacities (
  id INT NOT NULL,
  size TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Carriers (
  id INT NOT NULL,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Colors (
  id INT NOT NULL,
  name INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Phones_Capacities (
  phone_id INT NOT NULL,
  capacity_id INT NOT NULL,
  FOREIGN KEY (phone_id) REFERENCES Phones(id),
  FOREIGN KEY (capacity_id) REFERENCES Capacities(id)
);

CREATE TABLE Phones_Carriers (
  phone_id INT NOT NULL,
  carrier_id INT NOT NULL,
  FOREIGN KEY (phone_id) REFERENCES Phones(id),
  FOREIGN KEY (carrier_id) REFERENCES Carriers(id)
);

CREATE TABLE Phones_Colors (
  phone_id INT NOT NULL,
  color_id INT NOT NULL,
  FOREIGN KEY (phone_id) REFERENCES Phones(id),
  FOREIGN KEY (color_id) REFERENCES Colors(id)
);