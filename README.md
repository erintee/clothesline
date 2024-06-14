![](./readme-images/readme-logo.png)


## Overview
ClothesLine is a platform that allows users to connect with friends and community by sharing clothing and accessories.

### Why Clothesline?
The shift toward more compact, high-density housing models, as well as trends in sustainability and waste-reduction, have impacted how consumers are able to buy and store their wardrobes. Many people are shifting toward either paring down their wardrobes, and thus their fashion choices, or sourcing extra storage in order to maintain their larger wardrobe. ClothesLine allows users to have smaller individual wardrobes while continuing to have access to a variety of styles via their larger clothing network.

### Who is this made for?
ClothesLine is made for friends, families, and small communities who want to build a connected, trusting space to share clothing with each other. Users who are looking to minimize their purchasing or downsize their closet will benefit from the endless possibilities that come from sharing different styles with others.

### Features

<p style="text-align: center">
  <img src="./readme-images/dashboard.png" width="45%" style="margin: 0 0.5rem"/>
  <img src="./readme-images/requests.png" width="45%" style="margin: 0 0.5rem"/> 
</p>

<p style="text-align: center">
  <img src="./readme-images/friends.png" width="45%" style="margin: 0 0.5rem" />
  <img src="./readme-images/my-closet.png" width="45%" style="margin: 0 0.5rem" /> 
</p>

<p style="text-align: center">
  <img src="./readme-images/explore.png" width="45%" style="margin: 0 0.5rem" /> 
  <img src="./readme-images/request-details.png" width="45%" style="margin: 0 0.5rem" />
</p>

## Installation

### Client:
1. All dependencies will be included in the package.json file. To get started, run:
```
npm install
```

2. The BASE_URL has been set to port 8080 in the utils.js file. If needed, change this.

3. Once dependecies have been installed, start up the application by running:
```
npm start
```
4. You will be able to register as a new user and access basic functions, including your personal closet and item upload. However, as functionality for adding friends has not been implemented, you will need to log in as an existing user in order to sample full functionality.
**Note:** While seeded user passwords are stored in plain text, new users' passwords are encrypted upon registration.

### Server:

1. Ensure to have Node.js installed.

2. Download the [server](http://github.com/erintee/clothesline-server).

3. All dependencies will be included in the package.json file. To get started, run:
```
npm install
```

4. Set up a new .env file and copy variables from .env.sample file.

5. Set up a local database in accordance with the DB_NAME in your .env file, then run:
```
npx knex migrate:latest
npx knex seed:run
```

6. To start up the server, run:
```
node server.js
```

## Implementation

### Tech Stack
- React
- JavaScript
- MySQL
- Express
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express
    - multer
    - bcrypt

### APIs
- No external APIs

### Sitemap
- Register
- Login
- User Dashboard
- My Closet page:
    - View uploaded items
    - Upload new items
- Explore page:
    - Browse all friends' items on one page with the option of filtering for specific styles or sizes
    - Click individual items to see details and send a borrow request
- Closet pages:
    - Browse a friend's items

### Endpoints

#### **ITEM Routes** ####

**GET /items**
- Get a list of friends' items

Parameters:
- JWT

Optional query parameters:
- type, colour, size

Response: 
```
[
    {
      "id": 8,
      "title": "Long wool dresscoat",
      "size": "L/10/30",
      "image": "wool-coat.png",
      "first_name": "Evelyn"
    },
    {
      "id": 9,
      "title": "Pleated skirt",
      "size": "XS/2/26",
      "image": "pleat-skirt.png",
      "first_name": "Zhenyi"
    },
    ...
]
```

**POST /items**
- Add an item to your closet

Parameters:
- user id
- title
- type
- colour
- size
- image

Response:
```
{
  "id": 1,
  "user_id": 25,
  "title": "Red rain jacket",
  "type": "jacket",
  "colour": "red",
  "size": "M/8/28",
  "image": "image.jpg",
}
```

**GET /items/:itemId**
- Get an item's details

Parameters:
- item id
- JWT

Response:
```
{
  "id": 8,
  "title": "Long wool dresscoat",
  "type": "outerwear",
  "colour": "brown",
  "size": "L/10/30",
  "image": "wool-coat.png",
  "user_id": 3,
  "first_name": "Evelyn"
}
```

**PUT /items/:itemId**
- Edit an item

Parameters:
- item id
- title
- type
- colour
- size
- image
- JWT

Response:
```
{
  "id": 1,
  "user_id": 25,
  "title": "Red rain jacket",
  "type": "jacket",
  "colour": "red",
  "size": "M/8/28",
  "image": "new-image.jpg",
}
```
---

#### **USER Routes** ####

**GET /users/active**
- Get active user after login

Parameters:
- JWT

Response:
```
{
  "firstName": "Jane",
  "lastName": "Sample",
  "email": "jane.sample@email.com",
  "id": 1
}
```

**GET /:userId**
- Get user's name

Parameters:
- user id
- JWT

Response:
```
{
  "first_name": "Grace",
  "last_name": "Hopper"
}
```

**GET /users/:userId/items**

- Get user's closet (list of items associated with that user id)

Parameters:
- user id
- JWT

Response:
```
[
  {
    "id": 9,
    "title": "Pleated skirt",
    "type": "skirt",
    "colour": "green",
    "size": "XS/2/26",
    "image": "pleat-skirt.png"
  },
  {
    "id": 10,
    "title": "DW Watch",
    "type": "accessory",
    "colour": "gold",
    "size": "N/A",
    "image": "dw-watch.png"
  },
    ...
]
```

**GET /search/:email**
- Search users by email address

Parameters:
- JWT

Response:
```
{
  "first_name": "Jane",
  "email": "jane.sample@email.com",
  "id": 1
}
```

---

#### **REQUEST Routes** ####

**GET /requests**
- Get all requests associated with active user

Parameters:
- JWT

Response:
```
{
    "incoming": [
      {
        "id": 4,
        "user1_id": 3,
        "request_start": "2024-05-25T07:00:00.000Z",
        "title": "Parka",
        "image": "parka.jpg",
        "first_name": "Evelyn"
      }
    ],
    "outgoing": [
      {
        "id": 13,
        "user1_id": 1,
        "request_start": "2024-05-31T07:00:00.000Z",
        "title": "Winter boots",
        "image": "boots.jpg",
        "first_name": "Misty"
      },
    ],
    "active": [],
    "history": [
      {
        "id": 3,
        "user1_id": 3,
        "title": "Black pumps",
        "image": "black-shoes.png",
        "first_name": "Evelyn"
      },
    ]
}
```

**GET /requests/:requestId**
- Get request details

Parameters:
- JWT

Response:
```
{
  "id": 13,
  "item_id": 10,
  "user1_id": 1,
  "request_start": "2024-05-31T07:00:00.000Z",
  "request_end": "2024-06-02T07:00:00.000Z",
  "status": "pending",
  "title": "DW Watch",
  "size": "N/A",
  "image": "dw-watch.png",
  "first_name": "Jane"
}
```

**POST /requests/:itemId**
- Send a request

Parameters:
- JWT
- user1, user2, request_start, request_end, message

```
{
  "id": 14,
  "user1_id": 1,
  "user2_id": 4,
  "request_start": "2024-05-31T07:00:00.000Z",
  "request_end": "2024-06-02T07:00:00.000Z",
  "status": "pending",
  "message": "Can I please borrow this next week?"
}
```

**PUT /requests/:requestId**
- Accept or decline a pending incoming request

Parameters:
- JWT
- status

Response:
```
{
  "id": 3,
  "user1_id": 3,
  "user2_id": 1,
  "item_id": 2,
  "request_start": "2024-05-25T07:00:00.000Z",
  "request_end": "2024-05-26T07:00:00.000Z",
  "status": "accepted",
  "created_at": "2024-05-15T19:05:15.000Z"
}
```

**DELETE /requests/:requestId**
- Cancel a pending outgoing request

Parameters:
- JWT

No response given

**GET /requests/:requestId/messages**
- Get all messages for an item request

Parameters:
- JWT

Response:
```
[
  {
    "user_id": 3,
    "message": "Hi! Can I borrow these for Sam's wedding?",
    "sent_at": "2024-05-15T19:05:15.000Z",
    "first_name": "Evelyn"
  },
  {
    "user_id": 1,
    "message": "No problem!",
    "sent_at": "2024-05-16T19:03:44.000Z",
    "first_name": "Jane"
  }
]
```

**POST /requests/:requestId/messages**
- Send a message in relation to an item request

Parameters:
- JWT
- message, userId

Response:
```
{
  "id": 25,
  "request_id": 3,
  "user_id": 1,
  "message": "No problem!",
  "sent_at": "2024-05-16T19:03:44.000Z"
}
```

---

**FRIENDSHIP Routes**

**GET /friendships**
- Get a list of all friends, including pending requests

Parameters:
- JWT

Response:
```
{
  "outgoing": [
    {
      "id": 17,
      "user_id": 2,
      "first_name": "Misty"
    }
  ],
  "incoming": [],
  "friends": [
    {
      "id": 3,
      "user_id": 4,
      "first_name": "Zhenyi"
    },
    {
      "id": 4,
      "user_id": 5,
      "first_name": "Grace"
    }
  ]
}
```

**POST /friendships**
- Send a friendship request

Parameters:
- JWT
- userId

Response:
```
{
  "id": 19,
  "user1_id": 1,
  "user2_id": 3,
  "status": "requested"
}
```

**PUT /friendships/:friendshipId**
- Accept or decline a friendship request

Parameters:
- JWT
- status

Response:
```
{
  "id": 17,
  "user1_id": 1,
  "user2_id": 2,
  "status": "accepted"
}
```

**DELETE /friendships/:friendshipId**
- Delete a friendship record

Parameters:
- JWT

No response given

---

**AUTH Routes**

**POST /auth/register**
- Register a new user

Parameters:
- first_name, last_name, email, password

Response:
```
{
  "id": 6,
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jdoe@email.com",
  "password": "123456"
}
```

**POST /auth/login**

- Log in a user

Parameters:
- email, password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```


### Auth

- JWT auth
    - Store JWT in localStorage, remove when a user logs out


## Next steps
- Implement editing and deleting items from closet
- Forgot password functionality