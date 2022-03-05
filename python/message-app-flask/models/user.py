from db import db


class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=True)
    password = db.Column(db.String(100), nullable=True)

    message = db.relationship('MessageModel', lazy='dynamic', back_populates="user")

    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password

    def __str__(self):
        return "User(id='%s')" % self.id
    def save_to_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            pass

    @classmethod
    def find_by_username(cls, username: str):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, id: int):
        return cls.query.filter_by(id=id).first()
