## Propósito

Esta tabla almacena los métodos de pago.

### SQL

```sql
  CREATE TABLE payment_methods (
    payment_method_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
  );
```

### Campos

* `payment_method_id`: El identificador único del método de pago.
* `name`: El nombre del método de pago.
* `description`: Una descripción del método de pago.

### Restricciones

* El campo `payment_method_id` es único.
