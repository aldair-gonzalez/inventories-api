CREATE DATABASE IF NOT EXISTS inventarios;
USE inventarios;

CREATE TABLE IF NOT EXISTS categories (
	category_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) UNIQUE NOT NULL,
	description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS vendors (
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

CREATE TABLE IF NOT EXISTS products (
	product_code INTEGER UNIQUE PRIMARY KEY NOT NULL,
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
	category INTEGER NOT NULL,
	vendor INTEGER NOT NULL,
	FOREIGN KEY (category) REFERENCES categories(category_id),
	FOREIGN KEY (vendor) REFERENCES vendors(vendor_id)
);

CREATE TABLE IF NOT EXISTS transactions (
	transaction_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS finances (
	finance_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	date DATE NOT NULL,
	amount FLOAT NOT NULL,
	description VARCHAR(255) NOT NULL,
	transaction INTEGER NOT NULL,
	FOREIGN KEY (transaction) REFERENCES transactions(transaction_id)
);

CREATE TABLE IF NOT EXISTS purchase_orders (
	purchase_order_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	state VARCHAR(255) NOT NULL,
	delivery_date DATE NOT NULL,
	total_amount FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS purchase_order_details (
	purchase_order_details_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	quantity FLOAT NOT NULL,
	price FLOAT NOT NULL,
	product INTEGER NOT NULL,
	purchase_order INTEGER NOT NULL,
	FOREIGN KEY (product) REFERENCES products(product_code),
	FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id)
);

CREATE TABLE IF NOT EXISTS lots (
	lot_number INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	purchase_order INTEGER NOT NULL,
	FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id)
);

CREATE TABLE IF NOT EXISTS inventories (
	inventory_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	quantity FLOAT NOT NULL,
	unit_cost FLOAT NOT NULL,
	purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	expiration_date DATE NOT NULL,
	product INTEGER NOT NULL,
	purchase_order INTEGER NOT NULL,
	lot INTEGER,
	FOREIGN KEY (product) REFERENCES products(product_code),
	FOREIGN KEY (purchase_order) REFERENCES purchase_orders(purchase_order_id),
	FOREIGN KEY (lot) REFERENCES lots(lot_number)
);

CREATE TABLE IF NOT EXISTS discounts (
	discount_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	discount_type VARCHAR(255) NOT NULL,
	discount_amount FLOAT NOT NULL,
	discount_start_date DATE NOT NULL,
	discount_end_date DATE NOT NULL,
	product INTEGER NOT NULL,
	FOREIGN KEY (product) REFERENCES products(product_code)
);

CREATE TABLE IF NOT EXISTS payment_methods (
	payment_method_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sales (
	sale_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	date DATE NOT NULL,
	total_amount FLOAT NOT NULL,
	payment_method INTEGER NOT NULL,
	FOREIGN KEY (payment_method) REFERENCES payment_methods(payment_method_id)
);

CREATE TABLE IF NOT EXISTS sales_details (
	sale_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	quantity FLOAT NOT NULL,
	price FLOAT NOT NULL,
	product INTEGER NOT NULL,
	FOREIGN KEY (product) REFERENCES products(product_code)
);

CREATE TABLE IF NOT EXISTS losses_type (
	loss_type_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS losses (
	losse_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	date DATE NOT NULL,
	description VARCHAR(255) NOT NULL,
	quantity FLOAT NOT NULL,
	amount FLOAT NOT NULL,
	product INTEGER NOT NULL,
	loss_type INTEGER NOT NULL,
	FOREIGN KEY (product) REFERENCES products(product_code),
	FOREIGN KEY (loss_type) REFERENCES losses_type(loss_type_id)
);