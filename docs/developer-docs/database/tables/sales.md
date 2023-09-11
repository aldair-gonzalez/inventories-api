## Purpose: This table stores the sales.

```SQL
  CREATE TABLE sales (
    sale_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    total_amount FLOAT NOT NULL,
    payment_method INTEGER NOT NULL,
    FOREIGN KEY (payment_method) REFERENCES payment_methods(payment_method_id)
  );
```

### Fields:

* sale_id: The unique identifier for the sale.
* date: The date of the sale.
* total_amount: The total amount of the sale.
* payment_method: The payment method ID of the sale.

### Constraints:

* The sale_id field is unique.
* The payment_method field references the payment_method_id field in the payment_methods table.
