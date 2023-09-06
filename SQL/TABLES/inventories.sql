-- Purpose: This table stores the inventories.
CREATE TABLE inventories (
  inventory_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  quantity FLOAT NOT NULL,
  unit_cost FLOAT NOT NULL,
  purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expiration_date DATE NOT NULL,
  product INTEGER NOT NULL,
  purchase_order INTEGER NOT NULL,
  lot INTEGER,
  FOREIGN KEY (product) REFERENCES products(product_code),
  FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id),
  FOREIGN KEY (lot) REFERENCES lots(lot_number)
);

-- Fields:
-- inventory_id: The unique identifier for the inventory.
-- quantity: The quantity of the product in the inventory.
-- unit_cost: The unit cost of the product in the inventory.
-- purchase_date: The date the product was purchased.
-- expiration_date: The expiration date of the product.
-- product: The product ID of the product in the inventory.
-- purchase_order: The purchase order ID of the inventory.
-- lot: The lot number of the inventory.

-- Constraints:
-- The inventory_id field is unique.
-- The product field references the product_code field in the products table.
-- The purchase_order field references the purchase_order_id field in the purchase_orders table.
-- The lot field references the lot_number field in the lots table.
