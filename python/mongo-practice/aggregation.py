
from pydantic import BaseModel
from faker import Faker
from datetime import datetime
import random


from db_conn import DataBase

fake = Faker()


def generate_random_data():
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2023, 12, 31)

    timestamp = fake.date_time_between_dates(start_date, end_date, tzinfo=None)

    name = fake.random_element(elements=('Anne', 'Eric', 'James', 'Patricia', 'Paul'))
    amount = int(round(random.uniform(10.0, 500.0), 2))
    category = fake.random_element(elements=('Shopping', 'Groceries', 'Entertainment', 'Dining', 'Utilities'))

    data = {
        "name": name,
        "amount": amount,
        "timestamp": timestamp.isoformat() + "Z",
        "category": category
    }

    return data


def generate_data():
    for _ in range(122212):
        obj = generate_random_data()
        TransactionsDBModel.insert_one(obj=obj)


class TransactionsSerializer(BaseModel):
    name: str
    category: str
    timestamp: datetime
    amount: int


class TransactionsDBModel(DataBase):
    collection_name = "Transactions"
    class_serializer = TransactionsSerializer

    @classmethod
    def total_transactions_per_user(cls):
        pipeline = [
            {"$group": {"_id": "$name", "total_amount": {"$sum": "$amount"}}},
        ]

        result = cls.aggregate(pipeline)

        return result

    # Task 2: Find Top N Categories by Total Spending
    @classmethod
    def top_categories_by_spending(cls):
        pipeline = [
            {"$group": {"_id": "$category", "total_amount": {"$sum": "$amount"}}},
            {"$sort": {"total_amount": -1}},
            {"$project": {"category": "$_id", "total_amount": 1, "_id": 0}}
        ]

        result = cls.aggregate(pipeline)
        return result

    # Task 3: Calculate Monthly Spending Trends
    @classmethod
    def monthly_spending_trends(cls):
        pipeline = [
            {"$group": {"_id": {"$month": "$timestamp"}, "total_amount": {"$sum": "$amount"}}},
            {"$project": {"month": "$_id", "total_amount": 1, "_id": 0}}
        ]

        result = cls.aggregate(pipeline)
        return result


if __name__ == '__main__':
    TransactionsDBModel.total_transactions_per_user()
    TransactionsDBModel.top_categories_by_spending()
    TransactionsDBModel.monthly_spending_trends()
