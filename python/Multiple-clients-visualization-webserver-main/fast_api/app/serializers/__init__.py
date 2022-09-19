from typing import List

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    username: str

class User(Token):
    pass
class UserAuth(BaseModel):
    username: str
    password: str


class UserRequest(BaseModel):
    x: int
    y: int

class UserRes(BaseModel):
    username: str
    x: int
    y: int
class UserResponse(BaseModel):
    coords_list: List[UserRes]
