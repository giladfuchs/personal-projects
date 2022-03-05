import logging
import sys
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG,
                    format='[%(asctime)s] {%(funcName)s:%(lineno)d} %(levelname)s - %(message)s',)
log = logging.getLogger("my-logger")
