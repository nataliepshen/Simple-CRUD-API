# Simple-CRUD-API

Installing the application
1. check node version node -v (should be >= 16.x)
2. git clone
3. git checkout development
4. cd simple-crud-api
5. npm install

Running the application
1. npm run start:dev - to run in development mode
    url - localhost:3000/api/users
2. npm run start:prod - to run in production mode
    url - localhost:3000/api/users

Used technologies:
    - nodemon
    - dotenv 
    - typescript
    - ts-node
    - eslint and its plugins
    - prettier
    - uuid
    - @types/*

Using the application

1. GET 
    localhost:3000/api/users
-------------------------------------------------------------------------------------------------
    - Server should answer with status code 200 and all users records. If you don't have any users, server should return empty array.
    ----------
    GET | localhost:3000/api/users
    ----------
    200 OK | 23 ms | 165 B
    ----------
    []

    - If you have some users, server should return array with users.
    GET | localhost:3000/api/users
    200 OK | 7 ms | 270 B
    [
        {
            "id": "bcb17018-dc75-4cb1-958f-81a8df669a58",
            "username": "Natalie",
            "age": 40,
            "hobbies": [
                "downhill skiing"
            ]
        }
    ]

2. POST
    localhost:3000/api/users

    - You have to send the request using JSON by setting the Content-Type to application/json. Your request body should contain the following fields:
        - username as string
        - age as number
        - hobbies as array of strings or empty array
    Server should return status code 201 and JSON with new user.
    POST | localhost:3000/api/users
    Body | JSON
    Json Content:
    {
        "username": "Natalie",
        "age": 40,
        "hobbies": ["downhill skiing"]
    }
    Response:
    201 Created | 5 ms | 273 B
    {
        "id": "2846dc23-5df4-4f33-b286-40eda3d4b407",
        "username": "Natalie",
        "age": 40,
        "hobbies": [
            "downhill skiing"
        ]
    }

    - If you don't send the required fields, server should return status code 400 and JSON with error message.
    400 Bad Request | 10 ms | 209 B
    {
        "message": "Missing required fields"
    }

3. GET
    localhost:3000/api/users/:id

    - Server should answer with status code 200 and record with id === userId if it exists
    GET | localhost:3000/api/users/2846dc23-5df4-4f33-b286-40eda3d4b407
    200 OK | 5 ms | 270 B
    {
        "id": "2846dc23-5df4-4f33-b286-40eda3d4b407",
        "username": "Natalie",
        "age": 40,
        "hobbies": [
            "downhill skiing"
        ]
    }

    - If userid is invalid, server should answer with status code 400 and corresponding message 
    GET | localhost:3000/api/users/5426654
    400 Bad Request | 6 ms | 201 B
    {
        "message": "Invalid user id"
    }

    - If record with id === userId doesn't exist, server should answer with status code 404 and corresponding message
    GET | localhost:3000/api/users/2846dc23-5df4-4f33-b286-40eda3d4b405
    404 Not Found | 4 ms | 198 B
    {
        "message": "User Not Found"
    }

4. PUT 
    localhost:3000/api/users/:id
    - You have to send the request using JSON by setting the Content-Type to application/json. Your request body should contain all required fields:
        - username as string
        - age as number
        - hobbies as array of strings or empty array
    Server should answer with status code 200 and updated record
    PUT | localhost:3000/api/users/2846dc23-5df4-4f33-b286-40eda3d4b407
    Body | JSON
    Json Content:
    {
        "username": "Natalie",
        "age": 40,
        "hobbies": ["coding"]
    }
    Response:
    200 OK | 9 ms | 259 B
    {
        "id": "2846dc23-5df4-4f33-b286-40eda3d4b407",
        "username": "Natalie",
        "age": 40,
        "hobbies": [
            "coding"
        ]
    }

    - If userid is invalid, server should answer with status code 400 and corresponding message 
    PUT | localhost:3000/api/users/5426654
    400 Bad Request | 6 ms | 201 B
    {
        "message": "Invalid user id"
    }

    - If record with id === userId doesn't exist, server should answer with status code 404 and corresponding message
    PUT | localhost:3000/api/users/2846dc23-5df4-4f33-b286-40eda3d4b405
    404 Not Found | 4 ms | 198 B
    {
        "message": "User Not Found"
    }

5. DELETE
    localhost:3000/api/users/:id

    - Server should answer with status code 204 if the record is found and deleted
    DELETE | localhost:3000/api/users/2846dc23-5df4-4f33-b286-40eda3d4b407
    204 No Content | 8 ms | 143 B

    - If userid is invalid, server should answer with status code 400 and corresponding message 
    PUT | localhost:3000/api/users/5426654
    400 Bad Request | 6 ms | 201 B
    {
        "message": "Invalid user id"
    }

    - If record with id === userId doesn't exist, server should answer with status code 404 and corresponding message
    PUT | localhost:3000/api/users/2846dc23-5df4-4f33-b286-40eda3d4b405
    404 Not Found | 4 ms | 198 B
    {
        "message": "User Not Found"
    }

Other Errors

1. If you have sent a request to non-existing endpoints (e.g. some-non/existing/resource), server should answer with status code 404 and corresponding message
    GET | localhost:3000/some-non/existing/resource
    404 Not Found | 6 ms | 216 B
    {
        "message": "The requested URL does not exist"
    }

2. If errors on the server side occur during the processing of a request, server should answer with status code 500 and corresponding message
    500 Internal Server Error | 21 ms | 230 B
    {
        "message": "Something went wrong on the server"
    }