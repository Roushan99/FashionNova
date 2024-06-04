CREATE DATABASE qcusers;

CREATE TABLE users(
    users_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);


--- BLUEFLY STARTED HERE ---

CREATE DATABASE bluefly;

CREATE TABLE users(                                             
    user_id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(150),
    contact Numeric(15, 0),
    email VARCHAR(100) UNIQUE,
    address VARCHAR(250),
    dob date,
    password VARCHAR(100)
);


CREATE TABLE upload(
 image Bytea  
);


CREATE TABLE products(
    product_id BIGSERIAL PRIMARY KEY,
    image BYTEA NOT NULL,
    name VARCHAR(250),
    price Numeric(10, 2),
    description VARCHAR(500),
    rating Numeric(1, 1)
);


CREATE TABLE reviews(
    review_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(product_id),
    rating NUMBER(1, 1),
    comment VARCHAR(500),
    email VARCHAR(50),
    name VARCHAR(50),
);


-- image, title, quantity, price, email
    -- product_id BIGINT REFERENCES products(product_id),
CREATE TABLE cart(
    product_id BIGSERIAL PRIMARY KEY,
    image VARCHAR(200),
    title VARCHAR(200),
    quantity INT,
    price VARCHAR(50),
    email VARCHAR(50)
);





-- Create Orders table
CREATE TABLE orders (
    order_id VARCHAR(50) PRIMARY KEY,
    total_amount DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orderedproducts (
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(order_id) ON DELETE CASCADE,
    image TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);



-- 
-- [
--   {
--     "orderId": "order_1",
--     "totalAmount": 100,
--     "products": [
--       {
--         "id": "prod_1",
--         "image": "https://via.placeholder.com/150",
--         "title": "Product 1",
--         "quantity": 2,
--         "price": 20
--       },
--       {
--         "id": "prod_2",
--         "image": "https://via.placeholder.com/150",
--         "title": "Product 2",
--         "quantity": 1,
--         "price": 60
--       }
--     ]
--   },
--   {
--     "orderId": "order_2",
--     "totalAmount": 150,
--     "products": [
--       {
--         "id": "prod_3",
--         "image": "https://via.placeholder.com/150",
--         "title": "Product 3",
--         "quantity": 3,
--         "price": 50
--       }
--     ]
--   }
-- ]
