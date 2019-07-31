DROP KEYSPACE IF EXISTS munch;

CREATE KEYSPACE munch WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

use munch;

CREATE TABLE IF NOT EXISTS ALL_LISTING_DATA (
  LISTINGID INT,
  TITLE TEXT STATIC,
  CLAIMED BOOLEAN STATIC,
  PRICE INT STATIC,
  RATINGID INT,
  RATINGDATE DATE,
  RATING INT,
  CATEGORYID INT,
  CATEGORY TEXT,
  PRIMARY KEY (LISTINGID, RATINGDATE)
);
