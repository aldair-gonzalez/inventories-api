## Purpose: This table stores the details of the purchase orders.

```SQL
  CREATE TABLE purchase_order_details (
    purchase_order_details_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity FLOAT NOT NULL,
    price FLOAT NOT NULL,
    product INTEGER NOT NULL,
    purchase_order INTEGER NOT NULL,
    FOREIGN KEY (product) REFERENCES products(product_code),
    FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id)
  );
```

### Fields:

* purchase_order_details_id: The unique identifier for the purchase order detail.
* quantity: The quantity of the product in the purchase order detail.
* price: The price of the product in the purchase order detail.
* product: The product ID of the product in the purchase order detail.
* purchase_order: The purchase order ID of the purchase order detail.

### Constraints:

* The purchase_order_details_id field is unique.
* The product field references the product_code field in the products table.
* The purchase_order field references the purchase_order_id field in the purchase_orders table.
