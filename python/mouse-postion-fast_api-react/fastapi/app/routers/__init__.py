from fastapi import APIRouter

from .update import router as photo_link_routes

from .auth import router as auth_router

router = APIRouter()
router.include_router(photo_link_routes)

router.include_router(auth_router)
