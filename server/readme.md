# Eko8 Ecommerce CMS’s API documentation

This document contains the documentation for [Eko8 Ecommerce CMS](https://eko8-ecommerce-cms.herokuapp.com/)’s API.

#### Contents

- [Overview](#1-overview)
- [Authentication](#2-authentication)
- [Resources](#3-resources)
  - [Root](#31-root)
  - [Products](#32-products)
- [Testing](#4-testing)

## 1. Overview

Eko8 Ecommerce CMS’s API is a JSON-based OAuth2 API. It's content management system for ecommerce website. For local development all requests are made to endpoints beginning:
`https://localhost:3000`

All requests can be `https`, or `http`.

#### Developer agreement

Eko8 Ecommerce CMS is made for education purpose. You acknowledge that by copying or using the Project is at your own risk and you will be solely responsible for any damage or loss to you or any other party resulting therefrom.

## 2. Authentication

In order to create, fetching or modifying resourses, you will need an access token. An access token grants limited access to a user’s account.

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

Authentication to the API is performed via [HTTP Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication). Provide your API key as the basic auth username value. You do not need to provide a password.

You can get new access_token after login using email and password or by fetching your user info. Detail instructions can found below.

## 3. Resources

The API is RESTful and arranged around resources. All requests must be made with an integration token. All requests must be made using `https`.

Typically, the first request you make should be to acquire user details. This will confirm that your access token is valid, and give you a user id that you will need for subsequent requests.

### 3.1. Special endpoint

#### Create a new user

Make request to this endpoint to create a new user.

```
POST /register
```

Example request:

```
POST /register HTTP/1.1
Host: http://localhost:3000
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "firstName": "User",
  "lastName": "Pertama"
  "email": "demo@demo.io",
  "password": "your_password"
}
```

With the following fields:

| Parameter   | Type    | Required? | Description                         |
| ------------|---------|-----------|-------------------------------------|
| firstName   | string  | required  | The user's first name.              |
| lastName    | string  | optional  | The user's last name.               |
| email       | string  | required  | The user's email.                   |
| password    | string  | required  | The user's password.                |

The response is a User object within a data envelope.

Example response:

```
HTTP/1.1 201 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "id": 23,
    "email": "demo@demo.io",
    "firstName": "User",
    "lastName": "Pertama",
  }
}
```

Where a User object is:

| Field        | Type    | Description                                                               |
| -------------|---------|---------------------------------------------------------------------------|
| id           | integer | A unique identifier for the user.                                         |
| firstName    | string  | The user’s first name.                                                    |
| lastName     | string  | The user’s last name.                                                     |
| email        | string  | The user’s email.                                                         |

Possible errors:

| Error code                | Status | Error Code           | Description                                      |
| --------------------------|--------|----------------------|--------------------------------------------------|
| 400 Bad Request           | fail   | VALIDATION_ERROR     | Required fields were invalid or not specified.   |
| 500 Internal Server Error | error  | UNKNOWN_ERROR        | The connection to database is failed.            |

Example error response:

```
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "status": "fail",
  "errorCode": "EMAIL_ALREADY_USED"
}
```

#### Getting the authenticated user’s details via login endpoint

Returns details of the user who has login detail to the application.

```
POST /login
```

Example request:

```
POST /login HTTP/1.1
Host: http://localhost:3000
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "email": "demo@demo.io",
  "password": "your_password"
}
```

With the following fields:

| Parameter   | Type    | Required? | Description                         |
| ------------|---------|-----------|-------------------------------------|
| email       | string  | required  | The user's email.                   |
| password    | string  | required  | The user's password.                |

The response is a User object within a data envelope.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "id": 23,
    "email": "demo@demo.io",
    "firstName": "User",
    "lastName": "Pertama",
    "access_token": "181d415f34379af07b2c11d144dfbe35d"
  }
}
```

Where a User object is:

| Field        | Type    | Description                                                               |
| -------------|---------|---------------------------------------------------------------------------|
| id           | integer | A unique identifier for the user.                                         |
| firstName    | string  | The user’s first name.                                                    |
| lastName     | string  | The user’s last name.                                                     |
| email        | string  | The user’s email.                                                         |
| access_token | string  | A new token used to perform authenticated requests on behalf of the user. |

Possible errors:

| Error code                | Status | Error Code           | Description                             |
| --------------------------|--------|----------------------|-----------------------------------------|
| 401 Unauthorized          | fail   | INVALID_LOGIN_DETAIL | The `email and/or password` is invalid. |
| 500 Internal Server Error | error  | UNKNOWN_ERROR        | The connection to database is failed.   |

Example error response:

```
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8

{
  "status": "fail",
  "errorCode": "INVALID_LOGIN_DETAIL"
}
```

#### Getting the authenticated user’s details via me endpoint

Returns details of the user who has access_token from the application. This endpoint is usually used to auto signin a user which already signin in the past and still have access_token in their browser.

```
POST /me
```

Example request:

```
POST /me HTTP/1.1
Host: http://localhost:3000
access_toke: 181d415f34379af07b2c11d144dfbe35d
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8
```

The response is a User object within a data envelope.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "id": 23,
    "email": "demo@demo.io",
    "firstName": "User",
    "lastName": "Pertama",
    "access_token": "new181d415f34379af07b2c11d144dfbe35d"
  }
}
```

Where a User object is:

| Field        | Type    | Description                                                               |
| -------------|---------|---------------------------------------------------------------------------|
| id           | integer | A unique identifier for the user.                                         |
| firstName    | string  | The user’s first name.                                                    |
| lastName     | string  | The user’s last name.                                                     |
| email        | string  | The user’s email.                                                         |
| access_token | string  | A new token used to perform authenticated requests on behalf of the user. |

Possible errors:

| Error code                | Status | Error Code           | Description                                                          |
| --------------------------|--------|----------------------|----------------------------------------------------------------------|
| 401 Unauthorized          | fail   | INVALID_TOKEN        | The `access_tken` is invalid or the user's account has been deleted. |
| 500 Internal Server Error | error  | UNKNOWN_ERROR        | The connection to database is failed.                                |

Example error response:

```
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8

{
  "status": "fail",
  "errorCode": "INVALID_TOKEN"
}
```

### 3.2. Products

#### Listing or fetching all products

Returns a full list of produsts that the store is sold. This includes all products which in stock and products which not in stock.

The REST API endpoint exposes this list of products as a collection of resources. A request to fetch a list of products looks like this:

```
GET /products
```

Example request:

```
GET /products HTTP/1.1
Host: http://localhost:3000
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8
```

The response is a list of product objects. An empty array is returned if the server doesn’t have any products yet. The response array is wrapped in a data envelope. This endpoint will return all products from the database.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": [
    {
      "id": 1,
      "name": "Niko Shirt",
      "description": "A cool shirt product which is super cheap",
      "price": 250000,
      "stock": 999,
      "imageUrl": "https://dynamic.zacdn.com/RBmcFCDPKLS6WfonAoq4c159ky8=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/nike-6895-1172812-4.jpg"
    },
    {
      "id": 2,
      "name": "Niko Air T-Shirt",
      "description": "Another cool t-shirt product which is insanely expensive",
      "price": 350000,
      "stock": 999,
      "imageUrl": "https://dynamic.zacdn.com/QmYWjXuYGTD9zbQGB7P4_2wPRzc=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/nike-6874-2272812-4.jpg"
    }
  ]
}
```

Where a Product object is:

| Field       | Type    | Description                                     |
| ------------|---------|-------------------------------------------------|
| id          | integer | A unique identifier for the product.            |
| name        | string  | The product's name.                             |
| description | string  | Short description of the product                |
| price       | integer | The product's current price.                    |
| stock       | integer | The product's current stock.                    |
| imageUrl    | string  | The URL to the product's image.                 |

Possible errors:

| Error code                | Status | Error Code           | Description                             |
| --------------------------|--------|----------------------|-----------------------------------------|
| 500 Internal Server Error | error  | UNKNOWN_ERROR        | The connection to database is failed.   |

Example error response:

```
HTTP/1.1 500 Internal Server Error
Content-Type: application/json; charset=utf-8

{
  "status": "error",
  "errorCode": "UNKNOWN_ERROR"
}
```

#### Creating or input a product

Creates or input a product to database.

```
POST /products
```

Example request:

```
POST /products HTTP/1.1
Host: http://localhost:3000
access_token: 181d415f34379af07b2c11d144dfbe35d
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "name": "Low Rising Short Sleeve Tee Id",
  "description": "Kaos detail back print untuk casual beach wear\r\nWarna putih\r\nKerah bulat\r\nUnlined\r\nRegular fit",
  "price": 350000,
  "stock": 199,
  "imageUrl": "https://dynamic.zacdn.com/DpjTTOOmzIasmKJ5Ctm5XnRS5PU=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/quiksilver-8536-9933232-1.jpg"
}
```

With the following fields:

| Parameter   | Type    | Required? | Description                         |
| ------------|---------|-----------|-------------------------------------|
| name        | string  | required  | The product's name.                 |
| description | string  | required  | Short description of the product    |
| price       | integer | required  | The product's current price.        |
| stock       | integer | required  | The product's current stock.        |
| imageUrl    | string  | required  | The URL to the product's image.     |

The response is a Product object within a data envelope. Example response:

```
HTTP/1.1 201 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "id": 24,
    "name": "Low Rising Short Sleeve Tee Id",
    "description": "Kaos detail back print untuk casual beach wear\r\nWarna putih\r\nKerah bulat\r\nUnlined\r\nRegular fit",
    "price": 350000,
    "stock": 199,
    "imageUrl": "https://dynamic.zacdn.com/DpjTTOOmzIasmKJ5Ctm5XnRS5PU=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/quiksilver-8536-9933232-1.jpg"
  }
}
```

Where a Product object is:

| Field       | Type    | Description                                     |
| ------------|---------|-------------------------------------------------|
| id          | integer | A unique identifier for the product.            |
| name        | string  | The product's name.                             |
| description | string  | Short description of the product                |
| price       | integer | The product's current price.                    |
| stock       | integer | The product's current stock.                    |
| imageUrl    | string  | The URL to the product's image.                 |

Possible errors:

| Error code                | Status | Error Code           | Description                                                            |
| --------------------------|--------|----------------------|------------------------------------------------------------------------|
| 400 Bad Request           | fail   | VALIDATION_ERROR     | Required fields were invalid, not specified.                           |
| 401 Unauthorized          | fail   | INVALID_TOKEN        | The `access_tken` is invalid or the user's account has been deleted.   |
| 403 Forbidden             | fail   | NOT_AUTHORIZED       | The user does not have permission to input or insert data to database. |
| 500 Internal Server Error | error  | UNKNOWN_ERROR        | The connection to database is failed.                                  |

#### Fecthing single product detail

Fecthing single product detail. 

```
GET /products/{{id}}
```

Here `id` is the product id which is the unique identifier of the product.

Example request:

```
GET /products/24 HTTP/1.1
Host: http://localhost:3000
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8
```

The response is a Product object within a data envelope. Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "id": 24,
    "name": "Low Rising Short Sleeve Tee Id",
    "description": "Kaos detail back print untuk casual beach wear\r\nWarna putih\r\nKerah bulat\r\nUnlined\r\nRegular fit",
    "price": 350000,
    "stock": 199,
    "imageUrl": "https://dynamic.zacdn.com/DpjTTOOmzIasmKJ5Ctm5XnRS5PU=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/quiksilver-8536-9933232-1.jpg"
  }
}
```

Where a Product object is:

| Field       | Type    | Description                                     |
| ------------|---------|-------------------------------------------------|
| id          | integer | A unique identifier for the product.            |
| name        | string  | The product's name.                             |
| description | string  | Short description of the product                |
| price       | integer | The product's current price.                    |
| stock       | integer | The product's current stock.                    |
| imageUrl    | string  | The URL to the product's image.                 |

Possible errors:

| Error code                | Status | Error Code                  | Description                                                                                |
| --------------------------|--------|-----------------------------|--------------------------------------------------------------------------------------------|
| 400 Bad Request           | fail   | INVALID_TEXT_REPRESENTATION | Required fields were invalid type.                                                         |
| 404 Not Found             | fail   | PRODUCT_NOT_FOUND           | Required fields is valid type but the item with the requested id is not found in database. |
| 500 Internal Server Error | error  | UNKNOWN_ERROR               | The connection to database is failed.                                                      |

#### Modifying single product data

This end point is for modify or update the product data.

```
PUT /products/{{id}}
```

Here `id` is the product id which is the unique identifier of the product.

Example request:

```
PUT /products/24 HTTP/1.1
Host: http://localhost:3000
access_token: 181d415f34379af07b2c11d144dfbe35d
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "name": "Updated product name Low Rising Short Sleeve Tee Id",
  "description": "Updated product description Kaos detail back print untuk casual beach wear\r\nWarna putih\r\nKerah bulat\r\nUnlined\r\nRegular fit",
  "price": 350000,
  "stock": 199,
  "imageUrl": "https://dynamic.zacdn.com/DpjTTOOmzIasmKJ5Ctm5XnRS5PU=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/quiksilver-8536-9933232-1.jpg"
}
```

With the following fields:

| Parameter   | Type    | Required? | Description                         |
| ------------|---------|-----------|-------------------------------------|
| name        | string  | required  | The product's name.                 |
| description | string  | required  | Short description of the product    |
| price       | integer | required  | The product's current price.        |
| stock       | integer | required  | The product's current stock.        |
| imageUrl    | string  | required  | The URL to the product's image.     |

The response is a Product object with new updated value within a data envelope. Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "id": 24,
    "name": "Updated product name Low Rising Short Sleeve Tee Id",
    "description": "Updated product description Kaos detail back print untuk casual beach wear\r\nWarna putih\r\nKerah bulat\r\nUnlined\r\nRegular fit",
    "price": 350000,
    "stock": 199,
    "imageUrl": "https://dynamic.zacdn.com/DpjTTOOmzIasmKJ5Ctm5XnRS5PU=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/quiksilver-8536-9933232-1.jpg"
  }
}
```

Where a Product object is:

| Field       | Type    | Description                                     |
| ------------|---------|-------------------------------------------------|
| id          | integer | A unique identifier for the product.            |
| name        | string  | The product's name.                             |
| description | string  | Short description of the product                |
| price       | integer | The product's current price.                    |
| stock       | integer | The product's current stock.                    |
| imageUrl    | string  | The URL to the product's image.                 |

Possible errors:

| Error code                | Status | Error Code                  | Description                                                                                |
| --------------------------|--------|-----------------------------|--------------------------------------------------------------------------------------------|
| 400 Bad Request           | fail   | VALIDATION_ERROR            | Required fields were invalid, not specified.                                               |
| 401 Unauthorized          | fail   | INVALID_TOKEN               | The `access_tken` is invalid or the user's account has been deleted.                       |
| 403 Forbidden             | fail   | UNOUTHORIZED_USER           | The user does not have permission to input or insert data to database.                     |
| 404 Forbidden             | fail   | PRODUCT_NOT_FOUND           | Required fields is valid type but the item with the requested id is not found in database. |
| 500 Internal Server Error | error  | UNKNOWN_ERROR               | The connection to database is failed.                                                      |


#### Delete single product

Delete single product entry. 

```
DELETE /products/{{id}}
```

Here `id` is the product id which is the unique identifier of the product.

Example request:

```
DELETE /products/24 HTTP/1.1
Host: http://localhost:3000
access_token: 181d415f34379af07b2c11d144dfbe35d
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8
```

The response is a Product object and additional status field with value 'deleted' within a data envelope. Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "id": 24,
    "name": "Low Rising Short Sleeve Tee Id",
    "description": "Kaos detail back print untuk casual beach wear\r\nWarna putih\r\nKerah bulat\r\nUnlined\r\nRegular fit",
    "price": 350000,
    "stock": 199,
    "imageUrl": "https://dynamic.zacdn.com/DpjTTOOmzIasmKJ5Ctm5XnRS5PU=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/quiksilver-8536-9933232-1.jpg",
    "status": "deleted"
  }
}
```

## 4. Testing

We do not have a sandbox environment yet. To test, please feel free to create a testing account. *We recommend you do this by registering using an email address rather than Facebook or Twitter, as registering with the latter two automatically creates follower relationships on Medium between your connections on those networks.*

These endpoints will perform actions on production data on `medium.com`. **Please test with care.**