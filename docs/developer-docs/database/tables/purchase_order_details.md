## Propósito

Esta tabla almacena los detalles de las órdenes de compra.

### SQL

```sql
  CREATE TABLE purchase_order_details (
    purchase_order_details_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity FLOAT NOT NULL,
    price FLOAT NOT NULL,
    product INTEGER NOT NULL,
    purchase_order INTEGER NOT NULL,
    FOREIGN KEY (product) REFERENCES products(product_code),
    FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id)
  );
```

### Campos

* `purchase_order_details_id`: El identificador único del detalle de la orden de compra.
* `quantity`: La cantidad del producto en el detalle de la orden de compra.
* `price`: El precio del producto en el detalle de la orden de compra.
* `product`: El ID del producto del producto en el detalle de la orden de compra.
* `purchase_order`: El ID de la orden de compra del detalle de la orden de compra.

### Restricciones

* El campo `purchase_order_details_id` es único.
* El campo `product` hace referencia al campo `product_code` de la tabla `products`.
* El campo `purchase_order` hace referencia al campo `purchase_order_id` de la tabla `purchase_orders`.
