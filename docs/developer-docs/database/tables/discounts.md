## Purpose: This table stores the discounts.

```SQL
  CREATE TABLE discounts (
    discount_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    discount_type VARCHAR(255) NOT NULL,
    discount_amount FLOAT NOT NULL,
    discount_start_date DATE NOT NULL,
    discount_end_date DATE NOT NULL,
    product INTEGER NOT NULL,
    FOREIGN KEY (product) REFERENCES products(product_code)
  );
```

### Fields:

* discount_id: The unique identifier for the discount.
* discount_type: The type of discount. This field can be one of the following values:
    * `Percentage`: The discount is a percentage of the product price.
    * `Fixed`: The discount is a fixed amount.
* discount_amount: The amount of the discount.
* discount_start_date: The start date of the discount.
* discount_end_date: The end date of the discount.
* product: The product ID of the product the discount applies to.

### Constraints:

* The discount_id field is unique.
* The product field references the product_code field in the products table.
