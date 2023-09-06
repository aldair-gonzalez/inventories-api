-- Purpose: This table stores the vendors of products.
CREATE TABLE vendors (
  vendor_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  description VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip_code INTEGER,
  phone_number INTEGER NOT NULL,
  email_address VARCHAR(255),
  website VARCHAR(255),
  credit_limit FLOAT NOT NULL
);

-- Fields:
-- vendor_id: The unique identifier for the vendor.
-- name: The name of the vendor.
-- description: A description of the vendor.
-- address: The address of the vendor.
-- city: The city of the vendor.
-- state: The state of the vendor.
-- zip_code: The zip code of the vendor.
-- phone_number: The phone number of the vendor.
-- email_address: The email address of the vendor.
-- website: The website of the vendor.
-- credit_limit: The credit limit of the vendor.

-- Constraints:
-- The name field is unique.