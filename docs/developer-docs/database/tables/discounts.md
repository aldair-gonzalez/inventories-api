## Propósito

Esta tabla almacena los descuentos.

### SQL

```sql
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

### Campos

* discount_id: El identificador único del descuento.
* discount_type: El tipo de descuento. Este campo puede ser uno de los siguientes valores:
  * Percentage: El descuento es un porcentaje del precio del producto.
  * Fixed: El descuento es una cantidad fija.
* discount_amount: El importe del descuento.
* discount_start_date: La fecha de inicio del descuento.
* discount_end_date: La fecha de finalización del descuento.
* product: El ID del producto al que se aplica el descuento.

### Restricciones

* El campo discount_id es único.
* El campo product hace referencia al campo product_code de la tabla products.
