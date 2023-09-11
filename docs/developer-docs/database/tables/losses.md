## Propósito

Esta tabla almacena las pérdidas.

### SQL

```sql
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

### Campos

* `losse_id`: El identificador único de la pérdida.
* `date`: La fecha de la pérdida.
* `description`: Una descripción de la pérdida.
* `quantity`: La cantidad del producto perdido.
* `amount`: El importe de la pérdida.
* `product`: El ID del producto que se ha perdido.
* `loss_type`: El ID del tipo de pérdida.

### Restricciones

* El campo `losse_id` es único.
* El campo `product` hace referencia al campo `product_code` de la tabla `products`.
* El campo `loss_type` hace referencia al campo `loss_type_id` de la tabla `losses_type`.
