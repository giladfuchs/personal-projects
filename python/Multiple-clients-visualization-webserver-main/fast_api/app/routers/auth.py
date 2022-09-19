from fastapi import APIRouter, Depends

from app.controllers.auth import AuthService, jwt_required

from app.serializers import (
    UserAuth, Token
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(form_data: UserAuth):
    service = AuthService()
    return await service.authenticate_user(form_data.username, form_data.password)


@router.get("/token", dependencies=[Depends(jwt_required)], response_model=Token)
async def token_auth(user: Token = Depends(jwt_required)):
    return user
