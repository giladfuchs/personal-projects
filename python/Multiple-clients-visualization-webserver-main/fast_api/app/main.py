import uvicorn

from app.setup import create_app

app = create_app()
from app.config import config as conf



# init_db(app)

if __name__ == "__main__":
    uvicorn.run(app, host=conf.HOST, port=conf.SERVER_PORT)
