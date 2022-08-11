from fastapi import FastAPI
from fastapi_pagination import add_pagination
from starlette.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from app.config import config as conf
from app.routers import router


def create_app(environment=None) -> FastAPI:
    """Create the application instance"""
    app = FastAPI(title=conf.SERVER_NAME)
    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(router, prefix="/api")
    @app.get("/")
    async def root():
        return RedirectResponse(url="/docs")

    add_pagination(app)
    return app
