CREATE DATABASE IF NOT EXISTS munch;

USE munch;

CREATE TABLE IF NOT EXISTS listing (
 listingID INT NOT NULL AUTO_INCREMENT,
 title VARCHAR(40),
 claimed INT,
--  streetAddress VARCHAR(100),
--  city VARCHAR(50),
--  state VARCHAR(25),
--  zipcode VARCHAR(10),
--  phone VARCHAR(40),
--  website VARCHAR(40),
 price INT,
 PRIMARY KEY (listingID) 
-- array for categories or join table?
-- array for reviews or join table?
);

CREATE TABLE IF NOT EXISTS reviews (
  reviewID INT NOT NULL AUTO_INCREMENT,
  rating INT,
  listing_id INT NOT NULL,
  FOREIGN KEY (listing_id)
    REFERENCES listing (listingID)
  PRIMARY KEY (reviewID)
);

CREATE TABLE IF NOT EXISTS categories (
  categoryID INT NOT NULL AUTO_INCREMENT,
  category VARCHAR(40),
  listing_id INT NOT NULL,
  FOREIGN KEY (listing_id)
    REFERENCES listing (listingID)
  PRIMARY KEY (categoryID)
);
