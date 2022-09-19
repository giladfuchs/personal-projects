
from pydantic import BaseSettings
import socket


class Settings(BaseSettings):
    SERVER_NAME: str ='fast_api'
    FIX_PASSWORD: str = 'fix'
    JWT_ALGORITHM: str = "HS256"
    JWT_SECRET: str = 'JWT_ALGORITHM-SECRET'
    JWT_EXP: int = 3600
    HOST: str = "0.0.0.0"
    SERVER_PORT: int = 5000
    REDIS_HOST: str = "0.0.0.0" if socket.gethostname() in ("lenovo", "add your comp for dedug" ) else "redis"
    REDIS_PORT: int = 6379
    REDIS_IDLE_TIMEOUT: int = 0

config = Settings()

