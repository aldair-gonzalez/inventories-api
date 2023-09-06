-- Purpose: This table stores the transactions.
CREATE TABLE transactions (
  transaction_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL
);

-- Fields:
-- transaction_id: The unique identifier for the transaction.
-- name: The name of the transaction.
-- description: A description of the transaction.

-- Constraints:
-- The transaction_id field is unique.