## Purpose: This table stores the details of the sales.+

```SQL
  CREATE TABLE sales_details (
    sale_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity FLOAT NOT NULL,
    price FLOAT NOT NULL,
    product INTEGER NOT NULL,
    FOREIGN KEY (product) REFERENCES products(product_code)
  );
```

### Fields:

* sale_id: The unique identifier for the sale detail.
* quantity: The quantity of the product in the sale detail.
* price: The price of the product in the sale detail.
* product: The product ID of the product in the sale detail.

### Constraints:

* The sale_id field is unique.
* The product field references the product_code field in the products table.
