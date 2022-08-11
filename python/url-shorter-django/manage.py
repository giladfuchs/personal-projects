#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import time


def main():

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'urlmanager.settings')

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    print(sys.argv)
    execute_from_command_line(sys.argv)
    # execute_from_command_line(['manage.py', 'test', '--pattern=tests.py'])
    # execute_from_command_line(['manage.py', 'migrate'])
    # execute_from_command_line(['manage.py', 'runserver'])



if __name__ == '__main__':
    main()

    while True:

        time.sleep(22)
