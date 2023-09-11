## Propósito

Esta tabla almacena las órdenes de compra.

### SQL

```sql
  CREATE TABLE purchase_orders (
    purchase_order_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    state VARCHAR(255) NOT NULL,
    delivery_date DATE NOT NULL,
    total_amount FLOAT NOT NULL
  );
```

### Campos

* `purchase_order_id`: El identificador único de la orden de compra.
* `date`: La fecha de la orden de compra.
* `state`: El estado de la orden de compra.
* `delivery_date`: La fecha de entrega de la orden de compra.
* `total_amount`: El importe total de la orden de compra.

### Restricciones:

* El campo `purchase_order_id` es único.
