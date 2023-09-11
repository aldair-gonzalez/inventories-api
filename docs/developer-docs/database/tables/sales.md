## Propósito

Esta tabla almacena las ventas.

### SQL

```sql
  CREATE TABLE sales (
    sale_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    total_amount FLOAT NOT NULL,
    payment_method INTEGER NOT NULL,
    FOREIGN KEY (payment_method) REFERENCES payment_methods(payment_method_id)
  );
```

### Campos

* `sale_id`: El identificador único de la venta.
* `date`: La fecha de la venta.
* `total_amount`: El importe total de la venta.
* `payment_method`: El ID del método de pago de la venta.

### Restricciones:

* El campo `sale_id` es único.
* El campo `payment_method` hace referencia al campo `payment_method_id` de la tabla `payment_methods`.
