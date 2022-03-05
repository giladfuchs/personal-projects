from flask_restful import Resource, reqparse
from models.user import UserModel
from werkzeug.security import generate_password_hash


class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )

    def post(self):
        data = UserRegister.parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {"message": "A user with that username already exists"}, 400
        password = generate_password_hash(data['password'], method='sha256')
        user = UserModel(data['username'], password)
        user.save_to_db()
        return {"message": "User created successfully."}, 201
