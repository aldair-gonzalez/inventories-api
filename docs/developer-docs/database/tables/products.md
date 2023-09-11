## Propósito

Esta tabla almacena los productos.

### SQL

```sql
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

### Campos

* `product_code`: El identificador único del producto.
* `name`: El nombre del producto.
* `description`: Una descripción del producto.
* `unit_measure`: La unidad de medida del producto.
* `quantity`: La cantidad actual del producto en stock.
* `stock_min`: El nivel mínimo de stock para el producto.
* `stock_max`: El nivel máximo de stock para el producto.
* `sale_price`: El precio de venta del producto.
* `demand`: La demanda del producto.
* `initial_quantity`: La cantidad inicial del producto en stock.
* `final_quantity`: La cantidad final del producto en stock.
* `category`: La categoría del producto.
* `vendor`: El proveedor del producto.

### Restricciones

* El campo `product_code` es único.
* El campo `category` hace referencia al campo `category_id` de la tabla `categories`.
* El campo `vendor` hace referencia al campo `vendor_id` de la tabla `vendors`.
