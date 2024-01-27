import logging
import sys

class LogMeta(type):
    LOG_LEVELS = ['debug', 'info', 'warning', 'error', 'critical']

    def __getattr__(cls, level):
        level = level.lower()
        if level in cls.LOG_LEVELS:
            return lambda self, message: getattr(self.logger, level)(message)
        else:
            raise AttributeError(f"'{cls.__name__}' object has no attribute '{level}'")

class CustomConsoleHandler(logging.StreamHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))

    def emit(self, record):
        try:
            msg = self.format(record)
            print(msg, file=sys.stderr if record.levelno >= logging.WARNING else sys.stdout)
        except Exception:
            self.handleError(record)

class Logger(metaclass=LogMeta):
    def __init__(self, filename, log_format=None):
        self.filename = filename
        self.log_format = log_format

        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.DEBUG)

        formatter = logging.Formatter(self.log_format or '%(asctime)s - %(levelname)s - %(message)s')

        # Log to file
        file_handler = logging.FileHandler(filename)
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(formatter)
        self.logger.addHandler(file_handler)

        # Log to custom console handler
        console_handler = CustomConsoleHandler(sys.stdout)
        console_handler.setLevel(logging.DEBUG)
        self.logger.addHandler(console_handler)

        # Add methods for logging levels
        for level in LogMeta.LOG_LEVELS:
            setattr(self, level, getattr(self.logger, level))

# Example usage:
if __name__ == "__main__":
    logger = Logger("example.log", log_format='%(asctime)s - %(levelname)s - %(message)s').logger
    logger.warning('This is a warning message')
    logger.error('This is an error message')
    logger.info('debug ')

    logger.error('This is an error message')
    logger.debug('debug ')