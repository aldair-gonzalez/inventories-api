## Propósito

Esta tabla almacena los detalles de las ventas.

### SQL

```sql
  CREATE TABLE sales_details (
    sale_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity FLOAT NOT NULL,
    price FLOAT NOT NULL,
    product INTEGER NOT NULL,
    FOREIGN KEY (product) REFERENCES products(product_code)
  );
```

### Campos

* `sale_id`: El identificador único del detalle de la venta.
* `quantity`: La cantidad del producto en el detalle de la venta.
* `price`: El precio del producto en el detalle de la venta.
* `product`: El ID del producto del producto en el detalle de la venta.

### Restricciones:

* El campo `sale_id` es único.
* El campo `product` hace referencia al campo `product_code` de la tabla `products`.
