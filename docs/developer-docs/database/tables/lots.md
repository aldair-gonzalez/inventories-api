## Propósito

Esta tabla almacena los lotes.

### SQL

```sql
  CREATE TABLE lots (
    lot_number INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    purchase_order INTEGER NOT NULL,
    FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id)
  );
```

### Campos

* `lot_number`: El identificador único del lote.
* `purchase_order`: El ID de la orden de compra del lote.

### Restricciones

* El campo `lot_number` es único.
* El campo `purchase_order` hace referencia al campo `purchase_order_id` de la tabla `purchase_orders`.
