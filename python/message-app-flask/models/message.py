from db import db
from datetime import datetime



class MessageModel(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    receiver = db.Column(db.Integer, nullable=True)
    subject = db.Column(db.String(80), nullable=True)
    message = db.Column(db.String(280), nullable=True)
    creation_date = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    read_msg = db.Column(db.Boolean, default=False)
    sender_delete = db.Column(db.Boolean, default=False)
    receiver_delete = db.Column(db.Boolean, default=False)

    user = db.relationship('UserModel', back_populates="message")




    def __init__(self, sender: int, receiver: int, message: str, subject: str):
        self.sender = sender
        self.receiver = receiver
        self.subject = subject
        self.message = message

    def json(self):
        return {
            'id': self.id,
            'read_msg': self.read_msg,
            'sender': self.sender,
            'receiver': self.receiver,
            'subject': self.subject,
            'message': self.message,
            'creation_date': self.creation_date.strftime("%d-%m-%Y %H:%M")}

    @classmethod
    def find_by_id(cls, id: int):
        return cls.query.filter_by(id=id).first()

    def save_to_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            pass

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
