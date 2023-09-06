-- Purpose: This table stores the payment methods.
CREATE TABLE payment_methods (
  payment_method_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL
);

-- Fields:
-- payment_method_id: The unique identifier for the payment method.
-- name: The name of the payment method.
-- description: A description of the payment method.

-- Constraints:
-- The payment_method_id field is unique.


-- Purpose: This table stores the sales.
CREATE TABLE sales (
  sale_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  total_amount FLOAT NOT NULL,
  payment_method INTEGER NOT NULL,
  FOREIGN KEY (payment_method) REFERENCES payment_methods(payment_method_id)
);

-- Fields:
-- sale_id: The unique identifier for the sale.
-- date: The date of the sale.
-- total_amount: The total amount of the sale.
-- payment_method: The payment method ID of the sale.

-- Constraints:
-- The sale_id field is unique.
-- The payment_method field references the payment_method_id field in the payment_methods table.


-- Purpose: This table stores the details of the sales.
CREATE TABLE sales_details (
  sale_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  quantity FLOAT NOT NULL,
  price FLOAT NOT NULL,
  product INTEGER NOT NULL,
  FOREIGN KEY (product) REFERENCES products(product_code)
);

-- Fields:
-- sale_id: The unique identifier for the sale detail.
-- quantity: The quantity of the product in the sale detail.
-- price: The price of the product in the sale detail.
-- product: The product ID of the product in the sale detail.

-- Constraints:
-- The sale_id field is unique.
-- The product field references the product_code field in the products table.