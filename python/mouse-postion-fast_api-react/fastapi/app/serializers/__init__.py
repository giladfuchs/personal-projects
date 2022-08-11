from typing import List

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class User(BaseModel):
    access_token: str
    username: str

class UserAuth(BaseModel):
    username: str
    password: str

class AuthRes(BaseModel):
    success: bool


class Coords(BaseModel):
    x: int
    y: int


class UserRequest(BaseModel):
    coords: Coords
    name: str


class UserRes(BaseModel):
    username: str
    x: int
    y: int
class UserResponse(BaseModel):
    coords_list: List[UserRes]
