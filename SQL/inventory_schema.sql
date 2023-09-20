CREATE DATABASE IF NOT EXISTS dev_inventarios;
USE dev_inventarios;

CREATE DATABASE IF NOT EXISTS prod_inventarios;
USE prod_inventarios;

CREATE DATABASE IF NOT EXISTS test_inventarios;
USE test_inventarios;

CREATE TABLE IF NOT EXISTS categories (
	category_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) UNIQUE NOT NULL,
	description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS suppliers (
	supplier_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) UNIQUE NOT NULL,
	description VARCHAR(255) NOT NULL,
	address VARCHAR(255),
	city VARCHAR(255),
	state VARCHAR(255),
	zip_code BIGINT,
	phone_number BIGINT NOT NULL,
	email_address VARCHAR(255),
	website VARCHAR(255),
	credit_limit FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  product_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	product_code BIGINT UNIQUE NOT NULL,
	name VARCHAR(255) UNIQUE NOT NULL,
	description VARCHAR(255) NOT NULL,
	unit_measure VARCHAR(255) NOT NULL,
	quantity FLOAT NOT NULL,
	stock_min FLOAT NOT NULL,
	stock_max FLOAT NOT NULL,
	sale_price FLOAT NOT NULL,
	demand FLOAT NOT NULL,
	initial_quantity FLOAT NOT NULL,
	final_quantity FLOAT,
	category BIGINT NOT NULL,
	supplier BIGINT NOT NULL,
	FOREIGN KEY (category) REFERENCES categories(category_id),
	FOREIGN KEY (supplier) REFERENCES suppliers(supplier_id)
);

CREATE TABLE IF NOT EXISTS transactions (
	transaction_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS finances (
	finance_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	amount FLOAT NOT NULL,
	description VARCHAR(255) NOT NULL,
	transaction BIGINT NOT NULL,
	FOREIGN KEY (transaction) REFERENCES transactions(transaction_id)
);

CREATE TABLE IF NOT EXISTS order_statuses (
  order_status_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  description VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS purchase_orders (
	purchase_order_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	delivery_date DATE NOT NULL,
	total_amount FLOAT NOT NULL,
  supplier BIGINT NOT NULL,
	order_status BIGINT NOT NULL,
  FOREIGN KEY (supplier) REFERENCES suppliers(supplier_id),
  FOREIGN KEY (order_status) REFERENCES order_statuses(order_status_id)
);

CREATE TABLE IF NOT EXISTS purchase_order_details (
	purchase_order_detail_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	quantity FLOAT NOT NULL,
	price FLOAT NOT NULL,
	product BIGINT NOT NULL,
	purchase_order BIGINT NOT NULL,
	FOREIGN KEY (product) REFERENCES products(product_id),
	FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id)
);

CREATE TABLE IF NOT EXISTS lots (
	lot_number BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	purchase_order BIGINT NOT NULL,
	FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id)
);

CREATE TABLE IF NOT EXISTS inventories (
	inventory_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	quantity FLOAT NOT NULL,
	unit_cost FLOAT NOT NULL,
	purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	expiration_date DATE NOT NULL,
	product BIGINT NOT NULL,
	purchase_order BIGINT NOT NULL,
	lot BIGINT,
	FOREIGN KEY (product) REFERENCES products(product_id),
	FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id),
	FOREIGN KEY (lot) REFERENCES lots(lot_number)
);

CREATE TABLE IF NOT EXISTS discounts (
	discount_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	discount_type VARCHAR(255) NOT NULL,
	discount_amount FLOAT NOT NULL,
	discount_start_date DATE NOT NULL,
	discount_end_date DATE NOT NULL,
	product BIGINT NOT NULL,
	FOREIGN KEY (product) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS payment_methods (
	payment_method_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sales (
	sale_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	date DATE NOT NULL,
	total_amount FLOAT NOT NULL,
	payment_method BIGINT NOT NULL,
	FOREIGN KEY (payment_method) REFERENCES payment_methods(payment_method_id)
);

CREATE TABLE IF NOT EXISTS sales_details (
	sale_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	quantity FLOAT NOT NULL,
	price FLOAT NOT NULL,
	product BIGINT NOT NULL,
	FOREIGN KEY (product) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS losses_type (
	loss_type_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS losses (
	losse_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	date DATE NOT NULL,
	description VARCHAR(255) NOT NULL,
	quantity FLOAT NOT NULL,
	amount FLOAT NOT NULL,
	product BIGINT NOT NULL,
	loss_type BIGINT NOT NULL,
	FOREIGN KEY (product) REFERENCES products(product_id),
	FOREIGN KEY (loss_type) REFERENCES losses_type(loss_type_id)
);
