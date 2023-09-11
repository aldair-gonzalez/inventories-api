## Propósito

Esta tabla almacena los inventarios.

### SQL

```sql
  CREATE TABLE inventories (
    inventory_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity FLOAT NOT NULL,
    unit_cost FLOAT NOT NULL,
    purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiration_date DATE NOT NULL,
    product INTEGER NOT NULL,
    purchase_order INTEGER NOT NULL,
    lot INTEGER,
    FOREIGN KEY (product) REFERENCES products(product_code),
    FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id),
    FOREIGN KEY (lot) REFERENCES lots(lot_number)
  );
```

### Campos

* `inventory_id`: El identificador único del inventario.
* `quantity`: La cantidad del producto en el inventario.
* `unit_cost`: El coste unitario del producto en el inventario.
* `purchase_date`: La fecha en que se compró el producto.
* `expiration_date`: La fecha de caducidad del producto.
* `product`: El ID del producto del inventario.
* `purchase_order`: El ID de la orden de compra del inventario.
* `lot`: El número de lote del inventario.

### Restricciones

* El campo `inventory_id` es único.
* El campo `product` hace referencia al campo `product_code` de la tabla `products`.
* El campo `purchase_order` hace referencia al campo `purchase_order_id` de la tabla `purchase_orders`.
* El campo `lot` hace referencia al campo `lot_number` de la tabla `lots`.
