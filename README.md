# e-commerce-server

# kanban-server

**Base URL**

http://localhost:3000 ||
https://e-commerce-cms-viki.herokuapp.com

# #USERS

----
***Regsiter***
---
  Register new user.

  * **URL**

        /register

* **Method:**

        `POST`
  
*  **URL Params**

        None

* **Data Params**

    **Required:**
    ````
        {
            email: req.body.email,
            password: req.body.password,
        }
    ````

* **Success Response:**

    **Code:** 200 <br />
    Content:
    ```
    {name: "John Doe", email: "macdup@gmail.com"}
    ```


* **Error Response:**

    **Code:** 500 <br />
    Content:
    ```
    {
        "message" : "SequelizeValidationError",
        "errDev": {}
    }
    ```




***Login***
---
Login to user

* **URL**

        /login

* **Method:**

        `POST`

*  **URL Params**

        None

* **Data Params**

    **Required:**
    ````
        {
        email: req.body.email,
        password: req.body.password
        }
    ````

* **Success Response:**

    **Code:** 200 <br />
    Content: 
    ```
    {
        ""access_token"": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6Ik51bnVuZyIsImVtYWlsIjoibnVudW5nLndhbmdzYXB1dHJpQGdtYWlsLmNvbSIsInR5cGUiOiJub3JtYWwiLCJpYXQiOjE2MjU0NTU2NTR9.OCXAxUJ5A8nKMu9ctoN1AnsrvWgJMo0jXkz9xOisyXM"
    }
    ```


* **Error Response:**

    **Code:** 401 <br />
        Content: 
        ```
        {
            "message" : "Email / Password Salah",
            "errDev": {}
        }
        ```

    OR

      **Code:** 500 <br />

----
# #PRODUCTS

----
***Get products***
----
  Returns all products.

* **URL**

        /products

* **Method:**

        `GET`
  
*  **URL Params**

        None

* **Data Params**

        None

* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````

* **Success Response:**

    **Code:** 200 <br />
    Content: 
    ```json
    [
      {
          "id": 1,
          "name": "Hello",
          "image_url": "https://www.satubaju.com/img/editor/img_iscums/763/2666763_l.jpg",
          "price": 100,
          "stock": 1,
          "createdAt": "2021-08-05T03:48:49.307Z",
          "updatedAt": "2021-08-05T03:48:49.307Z"
      },
      {
          "id": 2,
          "name": "Baju Telor",
          "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/8/5043771/5043771_60f84ed2-8db5-4232-b23f-dd5a8f51b55e_720_720.jpg",
          "price": 100000,
          "stock": 5,
          "createdAt": "2021-08-05T03:49:13.855Z",
          "updatedAt": "2021-08-05T03:49:13.855Z"
      }
    ]
    ```


* **Error Response:**

    **Code:** 500 <br />

----
***Find single product***
----
  Returns all products.

* **URL**

        /products

* **Method:**

        `GET`
  
*  **URL Params**

        `id=[integer]`

* **Data Params**

        None

* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````

* **Success Response:**

    **Code:** 200 <br />
    Content: 
    ```json
   {
      "id": 1,
      "name": "Hello",
      "image_url": "https://www.satubaju.com/img/editor/img_iscums/763/2666763_l.jpg",
      "price": 100,
      "stock": 1,
      "createdAt": "2021-08-05T03:48:49.307Z",
      "updatedAt": "2021-08-05T03:48:49.307Z"
    }
    ```


* **Error Response:**

    **Code:** 500 <br />



----
***Add Product***
----

Add new Product.

* **URL**

        /products

* **Method:**

        `POST`
  
*  **URL Params**

        None

* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````

* **Data Params**

    **Required:**
    ````
        {
            "name": req.body.name,
            "image_url": req.body.image_url,
            "price": req.body.price,
            "stock": req.body.stock
        }
    ````

* **Success Response:**

    **Code:** 201 <br />
    Content: 
    ```json
    {
      "id": 6,
      "name": "Baju Halilintar",
      "image_url": "https://dynamic.zacdn.com/RlxbJ6S1nnoG3s5yA_oUyhjfAfo=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/giordano-4595-3563732-1.jpg",
      "price": 50000,
      "stock": 2,
      "updatedAt": "2021-08-11T17:36:50.484Z",
      "createdAt": "2021-08-11T17:36:50.484Z"
    }
    ```


* **Error Response:**

    **Code:** 400 <br />
    Content:
    ```
        {
            "message" : "SequelizeValidationError",
            "errDev": {}
        }
    ``` 

    OR

    **Code:** 500 <br />



----
***Replace Product (entire)***
----
Replace 1 Product (all fields).

* **URL**

        /products/:id

* **Method:**

        `PUT`
  
*  **URL Params** <br/>

    **Required:**
 
        `id=[integer]`
    
* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````
  

* **Data Params**<br/>

    ```json
    {
      "name": "Baju Tidur",
      "image_url": "https://dynamic.zacdn.com/RlxbJ6S1nnoG3s5yA_oUyhjfAfo=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/giordano-4595-3563732-1.jpg",
      "price": 10000,
      "stock": 4
    }
    ```

* **Success Response:**

    **Code:** 201 <br />
    Content: 
    ```json
    {
        "Product": {
            "id": 1,
            "title": "Baju Tidur",
            "image_url": "Jangan kebanyakan tidak sehat",
            "price": 10000,
            "stock": 4,
            "createdAt": "2021-06-21T05:23:01.303Z",
            "updatedAt": "2021-06-21T08:36:25.189Z"
        }
    }
    ```


* **Error Response:**
      **Code:** 400<br />   
    Content: 
        ```json
            {
                "message": "Validation Error",
                "errDev": {}
            } 
        ```

      **Code:** 404<br />
    Content: 
        ```json
        {
            "message": "Product not Found",
            "errDev": {}
        }   
        ```
    
      **Code:** 500 <br />


----
***Update Product category***
----
Update 1 Product (stock).

* **URL**

        /products/:id

* **Method:**

        `PATCH`
  
*  **URL Params** <br/>

    **Required:**
 
        `id=[integer]`
    

* **Data Params**<br/>

    ```json
    {
        "stock": 50
    }
    ```

* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````
  

* **Success Response:**

    **Code:** 201 <br />
    Content: 
    ```json
    {
        "Product": {
            "id": 1,
            "title": "Baju Tidur",
            "image_url": "Jangan kebanyakan tidak sehat",
            "price": 10000,
            "stock": 50,
            "createdAt": "2021-06-21T05:23:01.303Z",
            "updatedAt": "2021-06-21T08:36:25.189Z"
        }
    }
    ```


* **Error Response:**
    **Code:** 400<br />   
    Content: 
        ```json
        {
            "message": "Validation Error",
            "errDev": {}
        } 
        ```

    **Code:** 404<br />
    Content: 
        ```json
        {
            "message": "Product not Found",
            "errDev": {}
        }   
        ```
    
    **Code:** 500 <br />

----
***Delete Product***
----
Delete 1 Product.

* **URL**

        /products/:id

* **Method:**

        `DELETE`
  
*  **URL Params** <br/>

    **Required:**
 
        `id=[integer]`
    

* **Data Params**<br/>

   None

* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````
  

* **Success Response:**

    **Code:** 200 <br />
    Content: 
    ```json
    {
        "Product": {
            "id": 1,
            "title": "Baju Tidur",
            "image_url": "Jangan kebanyakan tidak sehat",
            "price": 10000,
            "stock": 50,
            "createdAt": "2021-06-21T05:23:01.303Z",
            "updatedAt": "2021-06-21T08:36:25.189Z"
        }
    }
    ```


* **Error Response:**
    **Code:** 404<br />
    
    Content: 
        ```json
        {
            "message": "Product not Found",
            "errDev": {}
        }   
        ```
    
      **Code:** 500 <br />


----

----
# #CART

----
***Get products***
----
  Returns all carts.

* **URL**

        /keranjang

* **Method:**

        `GET`
  
*  **URL Params**

        None

* **Data Params**

        None

* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````

* **Success Response:**

    **Code:** 200 <br />
    Content: 
    ```json
    [
      {
        "id": 21,
        "UserId": 1,
        "ProductId": 1,
        "quantity": 1,
        "createdAt": "2021-08-10T17:45:56.191Z",
        "updatedAt": "2021-08-10T19:37:08.774Z",
        "Product": {
            "id": 1,
            "name": "Hello",
            "image_url": "https://www.satubaju.com/img/editor/img_iscums/763/2666763_l.jpg",
            "price": 100,
            "stock": 1,
            "createdAt": "2021-08-05T03:48:49.307Z",
            "updatedAt": "2021-08-05T03:48:49.307Z"
        }
      },
      {
        "id": 20,
        "UserId": 1,
        "ProductId": 2,
        "quantity": 5,
        "createdAt": "2021-08-10T17:45:54.247Z",
        "updatedAt": "2021-08-11T16:59:29.706Z",
        "Product": {
            "id": 2,
            "name": "Baju Telor",
            "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/8/5043771/5043771_60f84ed2-8db5-4232-b23f-dd5a8f51b55e_720_720.jpg",
            "price": 100000,
            "stock": 5,
            "createdAt": "2021-08-05T03:49:13.855Z",
            "updatedAt": "2021-08-05T03:49:13.855Z"
        }
      },
      {
        "id": 19,
        "UserId": 1,
        "ProductId": 3,
        "quantity": 1,
        "createdAt": "2021-08-10T17:45:51.840Z",
        "updatedAt": "2021-08-10T19:37:06.438Z",
        "Product": {
            "id": 3,
            "name": "Baju Batman",
            "image_url": "https://sc01.alicdn.com/kf/HTB11qVmicyYBuNkSnfoq6AWgVXad/220502705/HTB11qVmicyYBuNkSnfoq6AWgVXad.jpg_.webp",
            "price": 50000,
            "stock": 50,
            "createdAt": "2021-08-07T17:36:13.312Z",
            "updatedAt": "2021-08-07T17:36:13.312Z"
        }
       }
  ]
    ```


* **Error Response:**

    **Code:** 500 <br />

----
***Find single product***
----
  Returns all carts with its products.

* **URL**

        /keranjang

* **Method:**

        `GET`
  
*  **URL Params**

        `id=[integer]`

* **Data Params**

        None

* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````

* **Success Response:**

    **Code:** 200 <br />
    Content: 
    ```json
   {
      "id": 1,
      "name": "Hello",
      "image_url": "https://www.satubaju.com/img/editor/img_iscums/763/2666763_l.jpg",
      "price": 100,
      "stock": 1,
      "createdAt": "2021-08-05T03:48:49.307Z",
      "updatedAt": "2021-08-05T03:48:49.307Z"
    }
    ```


* **Error Response:**

    **Code:** 500 <br />



----
***Increase Product inside Cart***
----

Add quantity for a product inside cart by ONE.

* **URL**

        /keranjang/:itemId

* **Method:**

        `POST`
  
*  **URL Params**

        `itemId=[integer]`

* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````

* **Data Params**

    None

* **Success Response:**

    **Code:** 201 <br />
    Content: 
    ```json
    [
      [
          [
              {
                  "id": 23,
                  "UserId": 1,
                  "ProductId": 5,
                  "quantity": 2,
                  "createdAt": "2021-08-10T17:45:59.837Z",
                  "updatedAt": "2021-08-11T17:57:34.704Z"
              }
          ],
          1
      ],
      2
    ]
    ```


* **Error Response:**

    **Code:** 500 <br />

----
***Decrease Product inside Cart***
----

Remove quantity for a product inside cart by ONE.

* **URL**

        /keranjang/:itemId

* **Method:**

        `DELETE`
  
*  **URL Params**

        `itemId=[integer]`

* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````

* **Data Params**

    None

* **Success Response:**

    **Code:** 201 <br />
    Content: 
    ```json
    [
      [
          [
              {
                  "id": 23,
                  "UserId": 1,
                  "ProductId": 5,
                  "quantity": 1,
                  "createdAt": "2021-08-10T17:45:59.837Z",
                  "updatedAt": "2021-08-11T17:57:34.704Z"
              }
          ],
          1
      ],
      2
    ]
    ```


* **Error Response:**


    **Code:** 500 <br />



----
***Update Product inside Cart***
----
Replace 1 Product informations inside cart (all fields).

* **URL**

        /keranjang/:cartId

* **Method:**

        `PUT`
  
*  **URL Params** <br/>

    **Required:**
 
        `cartId=[integer]`
    
* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````
  

* **Data Params**<br/>

    ```json
    {
      "ProductId": 1,
      "quantity": 10000
    }
    ```

* **Success Response:**

    **Code:** 201 <br />
    Content: 
    ```json
    [
      [
          [
              {
                  "id": "req.params.cartId",
                  "UserId": 1,
                  "ProductId": 1,
                  "quantity": 10000,
                  "createdAt": "2021-08-10T17:45:59.837Z",
                  "updatedAt": "2021-08-11T17:57:34.704Z"
              }
          ],
          1
      ],
      2
    ]
    ```


* **Error Response:**
      **Code:** 400<br />   
    Content: 
        ```json
            {
                "message": "Validation Error",
                "errDev": {}
            } 
        ```

      **Code:** 404<br />
    Content: 
        ```json
        {
            "message": "Product not Found",
            "errDev": {}
        }   
        ```
    
      **Code:** 500 <br />


----
***Delete Cart belongs to User***
----
Delete User's Cart completely.

* **URL**

        /keranjang

* **Method:**

        `DELETE`
  
*  **URL Params** <br/>

    None

* **Data Params**<br/>

   None

* **Headers**

    **Required:**
    ```` json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno"
    }
    ````
  

* **Success Response:**

    **Code:** 200 <br />
    Content: 
    ```json
    [
      {
        "id": 21,
        "UserId": 1,
        "ProductId": 1,
        "quantity": 1,
        "createdAt": "2021-08-10T17:45:56.191Z",
        "updatedAt": "2021-08-10T19:37:08.774Z"
      },
      {
        "id": 20,
        "UserId": 1,
        "ProductId": 2,
        "quantity": 5,
        "createdAt": "2021-08-10T17:45:54.247Z",
        "updatedAt": "2021-08-11T16:59:29.706Z"
      },
      {
        "id": 19,
        "UserId": 1,
        "ProductId": 3,
        "quantity": 1,
        "createdAt": "2021-08-10T17:45:51.840Z",
        "updatedAt": "2021-08-10T19:37:06.438Z"
       }
  ]
    ```


* **Error Response:**
    **Code:** 404<br />
    
    Content: 
        ```json
        {
            "message": "Cart not Found",
            "errDev": {}
        }   
        ```
    
      **Code:** 500 <br />


----
