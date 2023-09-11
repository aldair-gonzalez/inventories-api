## Purpose: This table stores the losses.

```SQL
  CREATE TABLE losses (
    losse_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity FLOAT NOT NULL,
    amount FLOAT NOT NULL,
    product INTEGER NOT NULL,
    loss_type INTEGER NOT NULL,
    FOREIGN KEY (product) REFERENCES products(product_code),
    FOREIGN KEY (loss_type) REFERENCES losses_type(loss_type_id)
  );
```

### Fields:

* losse_id: The unique identifier for the loss.
* date: The date of the loss.
* description: A description of the loss.
* quantity: The quantity of the product lost.
* amount: The amount of the loss.
* product: The product ID of the product lost.
* loss_type: The loss type ID of the loss.

### Constraints:

* The losse_id field is unique.
* The product field references the product_code field in the products table.
* The loss_type field references the loss_type_id field in the losses_type table.
