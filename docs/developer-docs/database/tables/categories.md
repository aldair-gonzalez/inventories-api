## Purpose: This table stores the categories of products.

```SQL
  CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL
  );
```

### Fields:

* category_id: The unique identifier for the category.
* name: The name of the category.
* description: A description of the category.

### Constraints:

* The name field is unique.
