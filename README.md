# Vidly

## Packages

## Joi
validate body of the request according to appropriate schema 

## Joi-ObjectId
validate the IDs in body of the request according to standards of the objectId

## bcrypt
hash the user password before saving on the database using salt and rounds

## jwt
generate JSON Web Token to authorize the APIs (sign, verify) which sign with userID & isAdmin


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

  Content-Type= application/json

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ token : JWT }`
 
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

  Content-Type= application/json
  x-auth-token= JWT

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


**Get a user**
----

* **URL**

  /api/users/:id

* **Method:**
  
   `GET`

* **Data Params**

  Content-Type= application/json
  x-auth-token= JWT

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

  Content-Type= application/json
  x-auth-token= JWT

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
    
    
