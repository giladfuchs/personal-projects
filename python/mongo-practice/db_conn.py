
import pymongo
from pydantic import BaseModel

DB_NAME = "sample"
MONGODB_URL = "mongodb://localhost:27017/"


def name_query(func):
    def inner(*args, name, **kwargs):
        query = {"name": name}
        func(*args, query=query, **kwargs)

    return inner


def validate(func):
    def inner(*args, obj, **kwargs):
        obj = args[0].class_serializer(**obj).dict()
        func(*args, obj=obj, **kwargs)

    return inner


class DataBase:
    myclient = pymongo.MongoClient(MONGODB_URL)

    mydb = myclient[DB_NAME]
    collection_name = None
    class_serializer = None

    @classmethod
    def find(cls):
        res = cls.mydb[cls.collection_name].find()

        res = list(res)

        return res

    @classmethod
    @validate
    def insert_one(cls, obj):
        res = cls.mydb[cls.collection_name].insert_one(obj)
        return res

    @classmethod
    @name_query
    def update_salary(cls, query, salary, ):
        to_set = {"$set": {"salary": salary}}
        res = cls.mydb[cls.collection_name].update_salary(query, to_set)
        return res

    @classmethod
    @name_query
    def delete_one(cls, query):
        res = cls.mydb[cls.collection_name].delete_one(query)
        return res

    @classmethod
    def aggregate(cls, pipeline):
        res = list(cls.mydb[cls.collection_name].aggregate(pipeline))
        return res

