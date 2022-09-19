from typing import List

import redis
from app.config import config as conf
from app.controllers.errors import ErrorService
from app.serializers import UserRes, UserRequest, User


class CoordsDB(ErrorService):
    r = redis.StrictRedis(host=conf.REDIS_HOST, port=conf.REDIS_PORT, decode_responses=True)

    @classmethod
    async def get_and_update_coords(cls, user_data: UserRequest, user: User) -> List[UserRes]:
        try:
            user_res = UserRes(username=user.username, x=user_data.x, y=user_data.y)
            cls.r.hmset(user.access_token, user_res.dict())

            coords_list: List[UserRes] = []
            for key in cls.r.scan_iter("*"):
                idle = cls.r.object("idletime", key)
                if idle > conf.REDIS_IDLE_TIMEOUT:
                    cls.r.delete(key)
                elif key != user.access_token:
                    res_to_add: UserRes = cls.r.hgetall(key)
                    coords_list.append(res_to_add)

            coords_list.sort(key=lambda x: x.get('username'))
            return coords_list
        except Exception as ex:
            raise cls.error_400(details=ex)

