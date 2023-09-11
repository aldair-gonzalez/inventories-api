## Propósito

Esta tabla almacena los proveedores de productos.

### SQL

```sql
  CREATE TABLE vendors (
    vendor_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code INTEGER,
    phone_number INTEGER NOT NULL,
    email_address VARCHAR(255),
    website VARCHAR(255),
    credit_limit FLOAT NOT NULL
  );
```

### Campos

* `vendor_id`: El identificador único del proveedor.
* `name`: El nombre del proveedor.
* `description`: Una descripción del proveedor.
* `address`: La dirección del proveedor.
* `city`: La ciudad del proveedor.
* `state`: El estado del proveedor.
* `zip_code`: El código postal del proveedor.
* `phone_number`: El número de teléfono del proveedor.
* `email_address`: La dirección de correo electrónico del proveedor.
* `website`: La página web del proveedor.
* `credit_limit`: El límite de crédito del proveedor.

### Restricciones:

* El campo `name` es único.
