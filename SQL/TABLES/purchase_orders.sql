-- Purpose: This table stores the purchase orders.
CREATE TABLE purchase_orders (
  purchase_order_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  state VARCHAR(255) NOT NULL,
  delivery_date DATE NOT NULL,
  total_amount FLOAT NOT NULL
);

-- Fields:
-- purchase_order_id: The unique identifier for the purchase order.
-- date: The date of the purchase order.
-- state: The state of the purchase order.
-- delivery_date: The delivery date of the purchase order.
-- total_amount: The total amount of the purchase order.

-- Constraints:
-- The purchase_order_id field is unique.


-- Purpose: This table stores the details of the purchase orders.
CREATE TABLE purchase_order_details (
  purchase_order_details_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  quantity FLOAT NOT NULL,
  price FLOAT NOT NULL,
  product INTEGER NOT NULL,
  purchase_order INTEGER NOT NULL,
  FOREIGN KEY (product) REFERENCES products(product_code),
  FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id)
);

-- Fields:
-- purchase_order_details_id: The unique identifier for the purchase order detail.
-- quantity: The quantity of the product in the purchase order detail.
-- price: The price of the product in the purchase order detail.
-- product: The product ID of the product in the purchase order detail.
-- purchase_order: The purchase order ID of the purchase order detail.

-- Constraints:
-- The purchase_order_details_id field is unique.
-- The product field references the product_code field in the products table.
-- The purchase_order field references the purchase_order_id field in the purchase_orders table.