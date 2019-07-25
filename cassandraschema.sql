-- grouping by listing (all info for listing)
-- grouping by category

-- OPTION 1
CREATE TABLE IF NOT EXISTS ALL_INFO_FOR_LISTING (
  LISTINGID PRIMARY KEY,
  TITLE VARCHAR(80),
  CLAIMED BOOLEAN,
  PRICE INT,
  REVIEWID INT,
  RATING INT,
  CATEGORYID INT,
  CATEGORY VARCHAR(40),
  PRIMARY KEY((LISTINGID, TITLE), RATING)
)

-- OPTION 2
CREATE TABLE IF NOT EXISTS LISTING_RATINGS (
  LISTINGID int,
  TITLE text,
  CLAIMED BOOLEAN,
  PRICE INT,
  REVIEWID INT,
  RATING INT,
  CATEGORYID INT,
  CATEGORY text,
  PRIMARY KEY(LISTINGID)
)
-- sample query: SELECT * FROM LISTING_RATINGS WHERE LISTINGID ='1';

CREATE TABLE IF NOT EXISTS REVIEWS (
  REVIEWID SERIAL PRIMARY KEY,
  RATING INT,
  LISTINGID INT NOT NULL,
  FOREIGN KEY (LISTINGID)
    REFERENCES LISTING (LISTINGID)
);

CREATE TABLE IF NOT EXISTS CATEGORIES (
  CATEGORYID SERIAL PRIMARY KEY,
  CATEGORY VARCHAR(40),
  LISTINGID INT NOT NULL,
  FOREIGN KEY (LISTINGID)
    REFERENCES LISTING (LISTINGID)
);