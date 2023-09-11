## Purpose: This table stores the lots.

```SQL
  CREATE TABLE lots (
    lot_number INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    purchase_order INTEGER NOT NULL,
    FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id)
  );
```

### Fields:

* lot_number: The unique identifier for the lot.
* purchase_order: The purchase order ID of the lot.

### Constraints:

* The lot_number field is unique.
* The purchase_order field references the purchase_order_id field in the purchase_orders table.
