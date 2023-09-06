-- Purpose: This table stores the finances.
CREATE TABLE finances (
  finance_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  amount FLOAT NOT NULL,
  description VARCHAR(255) NOT NULL,
  transaction INTEGER NOT NULL,
  FOREIGN KEY (transaction) REFERENCES transactions(transaction_id)
);

-- Fields:
-- finance_id: The unique identifier for the finance.
-- date: The date of the finance.
-- amount: The amount of the finance.
-- description: A description of the finance.
-- transaction: The transaction ID of the finance.

-- Constraints:
-- The finance_id field is unique.
-- The transaction field references the transaction_id field in the transactions table.