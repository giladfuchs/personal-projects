
from fastapi import APIRouter, Depends

from app.controllers.auth import jwt_required
from app.controllers.coords_db import CoordsDB
from app.serializers import (UserRequest, UserResponse, User, UserRes)

router = APIRouter(prefix="/update", tags=["update coordinate"])





@router.post("", response_model=UserResponse)
async def get_coords_and_return_list_of_all_user(user_data: UserRequest, user: User = Depends(jwt_required)):
    coords_list = CoordsDB.get_and_update_coords(user_data=user_data, user=user)
    return {'coords_list': coords_list}
