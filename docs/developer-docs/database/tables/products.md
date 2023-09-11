## Purpose: This table stores the products.

```SQL
  CREATE TABLE products (
    product_code INTEGER UNIQUE PRIMARY KEY NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    unit_measure VARCHAR(255) NOT NULL,
    quantity FLOAT NOT NULL,
    stock_min FLOAT NOT NULL,
    stock_max FLOAT NOT NULL,
    sale_price FLOAT NOT NULL,
    demand FLOAT NOT NULL,
    initial_quantity FLOAT NOT NULL,
    final_quantity FLOAT,
    category INTEGER NOT NULL,
    vendor INTEGER NOT NULL,
    FOREIGN KEY (category) REFERENCES categories(category_id),
    FOREIGN KEY (vendor) REFERENCES vendors(vendor_id)
  );
```

### Fields:

* product_code: The unique identifier for the product.
* name: The name of the product.
* description: A description of the product.
* unit_measure: The unit of measure of the product.
* quantity: The current quantity of the product in stock.
* stock_min: The minimum stock level for the product.
* stock_max: The maximum stock level for the product.
* sale_price: The sale price of the product.
* demand: The demand for the product.
* initial_quantity: The initial quantity of the product in stock.
* final_quantity: The final quantity of the product in stock.
* category: The category of the product.
* vendor: The vendor of the product.

### Constraints:

* The product_code field is unique.
* The category field references the category_id field in the categories table.
* The vendor field references the vendor_id field in the vendors table.
