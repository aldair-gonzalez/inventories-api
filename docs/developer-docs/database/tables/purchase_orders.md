## Purpose: This table stores the purchase orders.

```SQL
  CREATE TABLE purchase_orders (
    purchase_order_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    state VARCHAR(255) NOT NULL,
    delivery_date DATE NOT NULL,
    total_amount FLOAT NOT NULL
  );
```

### Fields:

* purchase_order_id: The unique identifier for the purchase order.
* date: The date of the purchase order.
* state: The state of the purchase order.
* delivery_date: The delivery date of the purchase order.
* total_amount: The total amount of the purchase order.

### Constraints:

* The purchase_order_id field is unique.
