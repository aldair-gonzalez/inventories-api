## Propósito:

Esta tabla almacena las categorías de productos.

### SQL

```SQL
  CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL
  );
```

### Campos:

* category_id: El identificador único de la categoría
* name: El nombre de la categoría.
* description: Una descripción de la categoría.

### Restricciones:

* El campo name es único.
