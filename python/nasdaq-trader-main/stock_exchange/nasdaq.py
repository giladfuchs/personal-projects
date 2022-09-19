import random
import time
import datetime as dt
from typing import List


class StockExchangeProvider:
    is_connected: bool = False

    def __init__(self):
        self.symbols = []

    def connect(self, user, password) -> bool:
        if user == 'ploni' and password == 'Aa123456':
            self.is_connected = True
            return True
        return False

    def configure_quotes_stream(self, symbols: List[str], callback):
        """
        :param symbols: list of symbols
        :param callback: the func should be with the following signature: func(quote)-> void
        :return:
        """
        self.callback = callback
        self.symbols = symbols

    # implemented. after calling this func you start receiving data and send to callback
    def start(self):
        if not any(self.symbols):
            raise Exception('no symbols were supplied')
        if self.callback is None:
            raise Exception('no callback was supplied')
        if self.is_connected:
            while True:
                for sym in self.symbols:
                    sym_appears_prob = random.randint(1, 10)
                    if sym_appears_prob > 6:
                        break
                    self.callback({time: dt.datetime.now(), 'symbol': sym, 'price': random.randint(1, 100)})
                    time.sleep(0.10)
                connect_failure_prob = random.randint(1, 10)
                if connect_failure_prob > 7:
                    self.is_connected = False
                    self.callback = None
                    raise Exception('connection error')
        raise Exception('not connected to stock exchange')
