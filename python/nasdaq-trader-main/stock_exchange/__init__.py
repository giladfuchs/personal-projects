import sys
import threading
from datetime import datetime
from time import sleep
import uvicorn

from stock_exchange.app_api import create_app
from stock_exchange.nasdaq import StockExchangeProvider
from stock_exchange.trader import Trader


class Main:
    def __init__(self, symbols = ["AMZN", "FB", "aa","bb"],should_run_stock=True, should_run_trader=True):
        self.trader = Trader(symbols)
        self.stock_exchange = StockExchangeProvider()
        self.should_run_stock = should_run_stock
        self.should_run_trader = should_run_trader
        for target in [self.run_trader, self.run_stock_exchange]:
            threading.Thread(target=target).start()

    def run_stock_exchange(self) -> None:
        while self.should_run_stock:
            try:
                self.stock_exchange.connect("ploni", "Aa123456")
                self.stock_exchange.configure_quotes_stream(self.trader.symbols, self.trader.handle_symbol_quote)
                self.stock_exchange.start()
            except Exception as ex:
                pass

    def run_trader(self) -> None:
        while self.should_run_trader:
            now = datetime.now()
            modulo = now.second % 10
            if modulo == 0:
                self.trader.trade()
                sleep(1)
            else:
                sleep(10 - modulo - 1)

    def stop_main(self, time_to_wait=0) -> None:

        sleep(time_to_wait)
        self.should_run_stock = False
        self.should_run_trader = False
        sys.exit()


def run_app():
    main = Main()
    app = create_app(main)
    threading.Thread(target=main.stop_main,
                     kwargs=dict(time_to_wait=333)).start()

    uvicorn.run(app, host="0.0.0.0", port=5001)


if __name__ == '__main__':
    run_app()
