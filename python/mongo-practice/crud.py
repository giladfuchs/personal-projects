from pydantic import BaseModel

from db_conn import DataBase


class EmployeeSerializer(BaseModel):
    name: str
    position: str
    department: str
    salary: int


class AccountDBModel(DataBase):
    collection_name = "Employee"
    class_serializer = EmployeeSerializer

'''  Insertion: Write a Python function to insert a new employee document into the "employees" collection.

Query: Write a Python function to retrieve all employees in the "Engineering" department.

Update: Write a Python function to update the salary of an employee with a given name.

Deletion: Write a Python function to delete an employee with a given name.'''
def chat_gpt_task():


    employee = {"name": "AAAA Dode",
                "position": "Software Engineer",
                "department": "Engineer",
                "salary": "323"}
    AccountDBModel.insert_one(obj=employee)
    AccountDBModel.update_salary(name=employee['name'], salary=333)
    AccountDBModel.delete_one(name=employee['name'])
    res = AccountDBModel.find()
if __name__ == '__main__':

    print()

