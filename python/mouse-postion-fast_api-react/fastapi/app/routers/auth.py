from fastapi import APIRouter

from app.config import config as conf
from app.controllers.auth import AuthService

from app.serializers import (
    AuthRes,
    UserAuth, Token
)
router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=Token)
async def login(form_data: UserAuth):
    service = AuthService()
    return await service.authenticate_user(form_data.username, form_data.password)

