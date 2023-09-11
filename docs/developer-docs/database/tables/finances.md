## Propósito

Esta tabla almacena las finanzas.

### SQL

```sql
  CREATE TABLE finances (
    finance_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    amount FLOAT NOT NULL,
    description VARCHAR(255) NOT NULL,
    transaction INTEGER NOT NULL,
    FOREIGN KEY (transaction) REFERENCES transactions(transaction_id)
  );
```

### Campos

* finance_id: El identificador único de la financiación.
* date: La fecha de la financiación.
* amount: El importe de la financiación.
* description: Una descripción de la financiación.
* transaction: El ID de la transacción de la financiación.

### Restricciones

* El campo finance_id es único.
* El campo transaction hace referencia al campo transaction_id de la tabla transactions.
