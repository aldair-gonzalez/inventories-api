## Propósito

Esta tabla almacena las transacciones.

### SQL

```sql
  CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
  );
```

### Campos

* `transaction_id`: El identificador único de la transacción.
* `name`: El nombre de la transacción.
* `description`: Una descripción de la transacción.

### Restricciones:

* El campo `transaction_id` es único.
