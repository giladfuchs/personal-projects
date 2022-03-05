from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from models.message import MessageModel
from models.user import UserModel
from sqlalchemy import and_, or_
from flask import Blueprint

unreadmessages = Blueprint('unreadmessages', __name__)


# Flask==2.0.1
# Flask-JWT==0.3.2
# Flask-RESTful==0.3.9
# Flask-SQLAlchemy==2.5.1
# SQLAlchemy==1.4.20
# Werkzeug==2.0.1
@unreadmessages.route("/unreadmessages", methods=['GET'])
@jwt_required()
def getAllUnReadMessage():
    return {'messages': list(map(lambda x: x.json(), MessageModel.query.filter(
        and_(MessageModel.read_msg == False, MessageModel.receiver == current_identity.id,
             MessageModel.receiver_delete == False))))}


class CreateMessage(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('receiver',
                        type=int,
                        required=True,
                        help="plz add receiver"
                        )

    parser.add_argument('subject',
                        type=str,
                        required=True,
                        help="plz add subject"
                        )

    parser.add_argument('message',
                        type=str,
                        required=True,
                        help="plz write some content"
                        )

    @jwt_required()
    def get(self):
        return {'messages': list(map(lambda message: message.json(), MessageModel.query.filter(
            or_(and_(MessageModel.sender == current_identity.id, MessageModel.sender_delete == False), and_(
                MessageModel.receiver == current_identity.id, MessageModel.receiver_delete == False)))))}

    @jwt_required()
    def post(self):
        data = CreateMessage.parser.parse_args()
        if not UserModel.find_by_id(data.get('receiver')):
            return {"message": "there is no user to send the message"}, 400
        if current_identity.id == data.get('receiver'):
            return {"message": "you can't send message to yourself"}, 400

        message = MessageModel(current_identity.id, **data)
        try:
            message.save_to_db()
        except:
            return {"message": "An error occurred inserting the item."}, 500
        return {'message': message.json()}, 201


class Message(Resource):

    @jwt_required()
    def get(self, id):
        message = MessageModel.find_by_id(id)
        if message:
            if Message.checkAuthorization(message):

                if (message.receiver == current_identity.id and message.receiver_delete) or \
                        (message.sender == current_identity.id and message.sender_delete):
                    return Message.error404()

                if message.receiver == current_identity.id and not message.read_msg:
                    message.read_msg = True
                    message.save_to_db()

                return {'message': message.json()}
            else:
                return {'message': "you aren't allowed to read it"}

        return Message.error404()

    @jwt_required()
    def delete(self, id):
        message = MessageModel.find_by_id(id)
        if message:
            if Message.checkAuthorization(message):
                if message.receiver == current_identity.id:
                    if message.receiver_delete:
                        return Message.error404()
                    else:
                        message.receiver_delete = True
                else:
                    if message.sender_delete:
                        return Message.error404()
                    else:
                        message.sender_delete = True

                if message.sender_delete and message.receiver_delete:
                    message.delete_from_db()
                else:
                    message.save_to_db()

                return {'message': 'message deleted.'}
            else:
                return {'message': "you aren't allowed to delete it"}
        return Message.error404()

    @staticmethod
    def checkAuthorization(message: MessageModel) -> bool:
        return any(current_identity.id == user_id for user_id in [message.sender, message.receiver])

    @staticmethod
    def error404() -> tuple:
        return {'message': 'message not found.'}, 404
