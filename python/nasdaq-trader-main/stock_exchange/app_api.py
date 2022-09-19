from fastapi import FastAPI
from fastapi_pagination import add_pagination
from stock_exchange.serializers import Res

def create_app(main) -> FastAPI:
    app = FastAPI()

    @app.get("/current_gain", response_model=Res)
    async def get_current_gain():
        return Res(current_gain=main.trader.current_gain)

    add_pagination(app)

    return app
