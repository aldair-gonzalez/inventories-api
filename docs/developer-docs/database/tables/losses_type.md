## Propósito

Esta tabla almacena los tipos de pérdida.

### SQL

```sql
  CREATE TABLE losses_type (
    loss_type_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
  );
```


### Campos

* `loss_type_id`: El identificador único del tipo de pérdida.
* `name`: El nombre del tipo de pérdida.
* `description`: Una descripción del tipo de pérdida.

### Restricciones

* El campo `loss_type_id` es único.
