# Vidly


* # Packages

## Joi
validate body of the request according to appropriate schema 

## Joi-ObjectId
validate the IDs in body of the request according to standards of the objectId

## bcrypt
hash the user password before saving on the database using salt and rounds

## jwt
generate JSON Web Token to authorize the APIs (sign, verify) which sign with userID & isAdmin


* # Models

**USER**
----
  * name: [String]
  * email: [String]
  * password: [String]
  * isAdmin: [Boolean - Null]
  
**CUSTOMER**
----
  * name: [String]
  * phone: [String]
  * isGold: [Boolean - Null]

**GENRE**
----
  * name: [String]

**MOVIE**
----
  * title: [String]
  * genre: { GENRE }
  * numberInStock: [Number]
  * dailyRentalRate: [Number]
  * description: [String - Null]
  * cast: [String - Null]
  * image: [String - Null]
  * url: [String - Null]
  * date: [String - Null]
  * rate: [String - Null]

**RENTAL**
----
  * customer: { CUSTOMER }
  * movie: { MOVIE }
  * dateOut: [Date - default]
  * dateReturned: [Date - Null]
  * rentalFee: [Number - Null]


* # RESTful APIs

**Register a new user**
----
  create a new user

* **URL**

  /api/users

* **Method:**
  
   `POST`
  
*  **URL Params**

   **Required:**
 
   `name=[string]`
   `email=[string]`
   `password=[string]`

   **Optional:**
 
   `isAdmin=[boolean]`

* **Data Params**

  * Content-Type= application/json

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id: ,
                   name: ,
                   email: ,
                   token : JWT }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "error" - "User arleady Registered !!" }`


**Get all users**
----

* **URL**

  /api/users

* **Method:**
  
   `GET`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[{ _id : ,
                    name: ,
                    email: ,
                    password: ,
                    isAdmin: }]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error : "Access denied." }`


**Get a user**
----

* **URL**

  /api/users/:id

* **Method:**
  
   `GET`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    name: ,
                    email: ,
                    password: ,
                    isAdmin: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
   * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid ID" - "User not found !!" }`
    
    
**Delete a user**
----

* **URL**

  /api/users/:id

* **Method:**
  
   `DELETE`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    name: ,
                    email: ,
                    password: ,
                    isAdmin: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
  
  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error : Access denied" }`
    
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid ID" - "User not found !!" }`
    
    
**Authenticate a user**
----
  Login a user

* **URL**

  /api/auth

* **Method:**
  
   `POST`
  
*  **URL Params**

   **Required:**
 
   `email=[string]`
   `password=[string]`
 
* **Data Params**

  * Content-Type= application/json

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id: ,
                   name: ,
                   email: ,
                   token : JWT }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "error" - "User not found !!" -  "Invalid email or password !!" }`
    
    
**Add a new customer**
----

* **URL**

  /api/customers

* **Method:**
  
   `POST`
  
*  **URL Params**

   **Required:**
 
   `name=[string]`
   `phone=[string]`

   **Optional:**
 
   `isGold=[boolean]`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    name: ,
                    phone: ,
                    isGold: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "error" - "Invalid token !!" }`
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`


**Get all customers**
----

* **URL**

  /api/customers

* **Method:**
  
   `GET`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[{ _id : ,
                    name: ,
                    phone: ,
                    isGold: }]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`


**Get a customer**
----

* **URL**

  /api/customers/:id

* **Method:**
  
   `GET`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    name: ,
                    phone: ,
                    isGold: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
   * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid ID" - "Customer not found !!" }`
    
    
**Delete a customer**
----

* **URL**

  /api/customers/:id

* **Method:**
  
   `DELETE`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    name: ,
                    phone: ,
                    isGold: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
  
  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error : Access denied" }`
    
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid ID" - "Customer not found !!" }`
    
    
 **Add a new genre**
----

* **URL**

  /api/genres

* **Method:**
  
   `POST`
  
*  **URL Params**

   **Required:**
 
   `name=[string]`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    name: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "error" - "Invalid token !!" }`
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error : "Access denied." }`

**Get all genres**
----

* **URL**

  /api/genres

* **Method:**
  
   `GET`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[{ _id : ,
                    name: }]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`


**Get a genre**
----

* **URL**

  /api/genres/:id

* **Method:**
  
   `GET`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    name: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
   * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid ID" - "Genre not found !!" }`
    
    
**Delete a genre**
----

* **URL**

  /api/genres/:id

* **Method:**
  
   `DELETE`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    name: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
  
  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error : Access denied" }`
    
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid ID" - "Genre not found !!" }`
    
  
**Add a new movie**
----

* **URL**

  /api/movies

* **Method:**
  
   `POST`
  
*  **URL Params**

   **Required:**
 
   `title=[string]`
   `genreId=[string]`
   `numberInStock=[number]`
   `dailyRentalRate=[number]`

   **Optional:**
 
   `description=[string]`
   `cast=[string]`
   `image=[string]`
   `url=[string]`
   `date=[string]`
   `rate=[string]`


* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    title: ,
                    genre: { _id: ,
                             name: ,
                           },
                    numberInStock: ,
                    dailyRentalRate: ,
                    description: ,
                    cast: ,
                    image: ,
                    url: ,
                    date: ,
                    rate: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "error" - "Invalid token !!" - "Invalid Genre !!" }`
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error : "Access denied." }`

**Get all movies**
----

* **URL**

  /api/movies

* **Method:**
  
   `GET`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[{ _id : ,
                    title: ,
                    genre: { _id: ,
                             name: ,
                           },
                    numberInStock: ,
                    dailyRentalRate: ,
                    description: ,
                    cast: ,
                    image: ,
                    url: ,
                    date: ,
                    rate: }]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`


**Get a movie**
----

* **URL**

  /api/movies/:id

* **Method:**
  
   `GET`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    title: ,
                    genre: { _id: ,
                             name: ,
                           },
                    numberInStock: ,
                    dailyRentalRate: ,
                    description: ,
                    cast: ,
                    image: ,
                    url: ,
                    date: ,
                    rate: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
   * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid ID" - "Movie not found !!" }`
    
    
**Delete a movie**
----

* **URL**

  /api/movies/:id

* **Method:**
  
   `DELETE`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    title: ,
                    genre: { _id: ,
                             name: ,
                           },
                    numberInStock: ,
                    dailyRentalRate: ,
                    description: ,
                    cast: ,
                    image: ,
                    url: ,
                    date: ,
                    rate: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
  
  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error : Access denied" }`
    
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid ID" - "Movie not found !!" }`
    
    
 **Make a rental**
----

* **URL**

  /api/rentals

* **Method:**
  
   `POST`
  
*  **URL Params**

   **Required:**
 
   `customerId=[string]`
   `movieId=[string]`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    customer: { _id: ,
                                name: ,
                                phone: ,
                                isGold: ,
                              },
                    movie: { _id : ,
                            title: ,
                            genre: { _id: ,
                                     name: ,
                                   },
                            numberInStock: ,
                            dailyRentalRate: ,
                            description: ,
                            cast: ,
                            image: ,
                            url: ,
                            date: ,
                            rate: }  }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "error" - "Invalid token !!" - "Invalid Movie !!" -  "Invalid Customer !!" }`
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`

**Return a rental**
----

* **URL**

  /api/returns

* **Method:**
  
   `POST`
  
*  **URL Params**

   **Required:**
 
   `customerId=[string]`
   `movieId=[string]`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : ,
                    customer: { _id: ,
                                name: ,
                                phone: ,
                                isGold: ,
                              },
                    movie: { _id : ,
                            title: ,
                            genre: { _id: ,
                                     name: ,
                                   },
                            numberInStock: ,
                            dailyRentalRate: ,
                            description: ,
                            cast: ,
                            image: ,
                            url: ,
                            date: ,
                            rate: },
                     dateOut: ,
                     dateReturned: , 
                     rentalFee: }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "error" - "Invalid token !!" - "rental arleady returned !!" }`
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "rental not found !!" }`


**Get all rentals**
----

* **URL**

  /api/rentals

* **Method:**
  
   `GET`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[{ _id : ,
                    customer: { _id: ,
                                name: ,
                                phone: ,
                                isGold: ,
                              },
                    movie: { _id : ,
                            title: ,
                            genre: { _id: ,
                                     name: ,
                                   },
                            numberInStock: ,
                            dailyRentalRate: ,
                            description: ,
                            cast: ,
                            image: ,
                            url: ,
                            date: ,
                            rate: },
                    dateOut: }]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error : "Access denied." }`

**Get a user rentals**
----

* **URL**

  /api/rentals/:id

* **Method:**
  
   `GET`

* **Data Params**

  * Content-Type= application/json
  * x-auth-token= JWT

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[ { _id : ,
                    customer: { _id: ,
                                name: ,
                                phone: ,
                                isGold: ,
                              },
                    movie: { _id : ,
                            title: ,
                            genre: { _id: ,
                                     name: ,
                                   },
                            numberInStock: ,
                            dailyRentalRate: ,
                            description: ,
                            cast: ,
                            image: ,
                            url: ,
                            date: ,
                            rate: },
                    dateOut: } ]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Token" }`
    
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Access denied. No token provided !!" }`
    
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid ID" - "Rental not found !!" }`
    
   * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error : "Access denied." }`
    
