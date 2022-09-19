from datetime import datetime, timedelta

from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from app.config import config as conf
from app.controllers.errors import ErrorService
from app.serializers import Token, User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def jwt_required(token: str = Depends(oauth2_scheme)) -> str:
    user = AuthService.validate_token(token)
    return user


class AuthService(ErrorService):

    @classmethod
    async def authenticate_user(cls, username: str, password: str) -> Token:

        if password != conf.FIX_PASSWORD:
            raise cls.error_authenticate()

        return cls.create_token(username)

    @classmethod
    def validate_token(cls, token: str) -> User:
        try:
            payload = jwt.decode(token, conf.JWT_SECRET, algorithms=[conf.JWT_ALGORITHM])
            username = payload.get("username")
            return User(access_token=token, username=username)

        except (JWTError, Exception):
            raise cls.error_authenticate()

    @classmethod
    def create_token(cls, username: str) -> Token:
        now = datetime.utcnow()
        payload = {
            "iat": now,
            "nbf": now,
            "exp": now + timedelta(seconds=int(conf.JWT_EXP)),
            "username": username,
        }
        token = jwt.encode(payload, conf.JWT_SECRET, algorithm=conf.JWT_ALGORITHM)
        return Token(access_token=token, username=username)
