from typing import List

import redis
from app.config import config as conf
from app.serializers import UserRes, UserRequest, User


class CoordsDB():
    r = redis.StrictRedis(host=conf.REDIS_HOST, port=conf.REDIS_PORT, decode_responses=True)

    @classmethod
    def get_and_update_coords(cls, user_data: UserRequest, user: User) -> List[UserRes]:
        user_res = UserRes(username=user.username, x=user_data.coords.x, y=user_data.coords.y)
        cls.r.hmset(user.access_token, user_res.dict())

        coords_list = []
        for key in cls.r.scan_iter("*"):
            idle = cls.r.object("idletime", key)
            if idle > 1:
                cls.r.delete(key)
            else:
                coords_list.append(cls.r.hgetall(key))

        return coords_list

