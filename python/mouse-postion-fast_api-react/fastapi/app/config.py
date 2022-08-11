import os
import pathlib
from distutils.util import strtobool
from typing import Set

from pydantic import BaseSettings

from dotenv import load_dotenv
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# load_dotenv(os.path.join(BASE_DIR, ".env"))


class Settings(BaseSettings):
    SERVER_NAME: str ='fast_api'
    FIX_PASSWORD: str = 'fix'
    JWT_ALGORITHM: str = "HS256"
    JWT_SECRET: str = 'JWT_ALGORITHM-SECRET'
    JWT_EXP: int = 3600
    REDIS_HOST = "0.0.0.0"
    REDIS_PORT = 6379

config = Settings()

