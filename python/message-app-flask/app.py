from flask import Flask
from flask_restful import Api
from flask_jwt import JWT
import os
from security import authenticate, identity
from resources.user import UserRegister
from resources.message import Message, unreadmessages, CreateMessage

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = os.environ.get('jwt')

app.register_blueprint(unreadmessages)

api = Api(app)


jwt = JWT(app, authenticate, identity)  # /auth

api.add_resource(Message, '/message/<int:id>')
api.add_resource(CreateMessage, '/message')
api.add_resource(UserRegister, '/register')

if __name__ == '__main__':
    app.run()

