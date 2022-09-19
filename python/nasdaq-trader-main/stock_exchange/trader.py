import random
import threading

import time
from typing import List, Dict

from stock_exchange.decorators import timeit
from stock_exchange.model import Model
from stock_exchange.serializers import Symbol, SellObj, PredictObj, TradeBySymbolObj


class Trader(Model):
    current_gain = 0

    def __init__(self, symbols: List[str]):
        self.quotes = {}
        self.symbols = symbols
        self.init_quotes()

    def init_quotes(self):
        self.quotes: Dict[List[Symbol]] = {_: [] for _ in self.symbols}

    def calc(self, aggregated_quotes):
        if len(aggregated_quotes) >= 2:
            time.sleep(0.5)
            return {'std': 2542, 'max': 24, 'min': 2}
        else:
            raise Exception('aggregated quotes must have only 10 elements')

    def sell(self, symbol):
        sell_price = random.randint(1, 100)
        self.current_gain += sell_price
        print(f'The symbol: {symbol} was sold')

    def buy(self, symbol):
        buy_price = random.randint(1, 100)
        self.current_gain -= buy_price
        print(f'The symbol: {symbol} was bought')

    def handle_symbol_quote(self, symbol_quote: dict) -> None:
        try:

            symbol = symbol_quote.get('symbol')
            if symbol in self.quotes.keys():
                self.quotes[symbol].append(Symbol(price=symbol_quote.get('price')))
            else:
                raise Exception(f'symbol not trade {symbol}')
        except Exception as ex:
            print(f'problem with symbol_quote: {str(symbol_quote)}, ex: {str(ex)}')

    #
    #         """
    #  Receive quote from stock exchange, aggregate 10 seconds of quotes from provided symbols.
    #  If we have more than 2 quotes and exactly 10 seconds of the symbol we can call 'calc'
    #  to get the calculated data for model prediction -> call predict -> print if the symbol should be bought.
    #  You receive quote each millisecond.
    #  quote is made of : time, symbol, price
    # return:"""
    def sell_wait(self, sell_obj: SellObj) -> None:
        time.sleep(sell_obj.sell_seconds)
        self.sell(symbol=sell_obj.symbol)

    def trade_by_symbol(self, trade_by_symbol_obj: TradeBySymbolObj) -> None:
        try:
            calc_data = self.calc(aggregated_quotes=trade_by_symbol_obj.aggregated_quotes)
            predict_obj: PredictObj = self.predict(calced_data=calc_data)
            print(f"is_buy: {predict_obj.is_buy}, symbol {trade_by_symbol_obj.symbol}")
            if predict_obj.is_buy:
                self.buy(symbol=trade_by_symbol_obj.symbol)
                threading.Thread(target=self.sell_wait,
                                 kwargs=dict(sell_obj=SellObj(symbol=trade_by_symbol_obj.symbol,
                                                              sell_seconds=predict_obj.sell_seconds))).start()
        except Exception as ex:
            print(f'problem in work on symobl {trade_by_symbol_obj.symbol}. ex: {str(ex)}')

    @timeit
    def trade(self):
        threads: List[threading.Thread] = [threading.Thread(target=self.trade_by_symbol,
                                                            kwargs=dict(trade_by_symbol_obj=TradeBySymbolObj(symbol=symbol,
                                                                        aggregated_quotes=aggregated_quotes))) for
                                           symbol, aggregated_quotes in self.quotes.items()]
        for t in threads:
            t.start()
        for t in threads:
            t.join()

        self.init_quotes()
