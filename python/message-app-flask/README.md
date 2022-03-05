# Messaging system

A simple rest API backend system that is responsible for handling
messages between users.

## auth
- Sign-Up user
```
API endpoint: POST https://message-app-flask.herokuapp.com/register
```
body parameters:
```
{
    "username":"herolo",
    "password":"secret"
}
```

sample response
```
{
   "message": "User created successfully."
}
```

- Sign-in user
```
API endpoint: POST https://message-app-flask.herokuapp.com/auth
```
body parameters:
```
{
    "username":"herolo",
    "password":"secret"
}
```

sample response
```
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjU1Nzc4NjUsImlhdCI6MTYyNTU3NzU2NSwibmJmIjoxNjI1NTc3NTY1LCJpZGVudGl0eSI6Mn0.S9tabjzusdBiQ7i2hPPFq9hVBwJpFbRAoP79GD8hzlo"
}
```

## message
all this request require token in the header for AuthN\Z users. 
```
Authorization: JWT [token]
```
- Write message

```
API endpoint: POST https://message-app-flask.herokuapp.com/message
```
body parameters:
```
{
    "receiver":3,
    "subject":"hello",
    "message":"how you doing?"
}
```
note if the reciver not in the system you will get error.

sample response
```
{
    "message": {
        "id": 3,
        "read_msg": false,
        "sender": 4,
        "receiver": 3,
        "subject": "hello",
        "message": "how you doing?",
        "creation_date": "06-07-2021 12:08"
    }
}
```

- Get all messages for a specific user
- Get all unread messages for a specific user
```
API endpoint: GET https://message-app-flask.herokuapp.com/message

API endpoint: GET https://message-app-flask.herokuapp.com/unreadmessages
```
sample response
```
{
    "messages": [
        {
            "id": 3,
            "read_msg": false,
            "sender": 4,
            "receiver": 3,
            "subject": "hello",
            "message": "how you doing?",
            "creation_date": "06-07-2021 12:08"
        }
    ]
}

```


- Read message (return one message)

```
API endpoint: GET https://message-app-flask.herokuapp.com/message/<int:id>
```
sample response
```
{
    "message": {
        "id": 3,
        "read_msg": false,
        "sender": 2,
        "receiver": 1,
        "subject": "hello",
        "message": "how you doing?",
        "creation_date": "06-07-2021 13:20"
    }
}
```
- Delete message (as owner or as receiver)
```
API endpoint: DELETE https://message-app-flask.herokuapp.com/message/<int:id>
```
sample response
```
{
    "messages": "item deleted."
}

```
note: if you will write id with no message pair you will get a proper error.
