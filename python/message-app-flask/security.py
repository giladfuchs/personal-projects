from werkzeug.security import check_password_hash

from models.user import UserModel


def authenticate(username: str, password: str) -> UserModel:
    user = UserModel.find_by_username(username)
    return user if (user and check_password_hash(user.password, password)) else None


def identity(payload: dict) -> UserModel:
    user_id = payload['identity']
    return UserModel.find_by_id(user_id)
