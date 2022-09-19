import threading
from typing import Generator, Dict
import random
import time
import datetime as dt
import pytest
from fastapi.testclient import TestClient
from fastapi import status

from stock_exchange import Main, create_app


@pytest.fixture()
def main() -> Main:
    _main = Main(symbols=["AMZN", "FB"])
    threading.Thread(target=_main.stop_main,
                     kwargs=dict(time_to_wait=10)).start()
    return _main


@pytest.fixture()
def client(main: Main) -> Generator:
    app = create_app(main)
    with TestClient(app) as c:
        yield c


@pytest.fixture()
def symbol_quote() -> Dict:
    return {time: dt.datetime.now(), 'symbol': 'AMZN', 'price': random.randint(1, 100)}


def test_api(client: TestClient):
    response = client.get(f"current_gain")
    assert response.status_code == status.HTTP_200_OK
    current_gain = response.json().get("current_gain")
    assert type(current_gain) == int


def test_main(main: Main):
    main.should_run_trader = False

    curr = main.trader.current_gain
    symbol = main.trader.symbols[0]
    main.trader.sell(symbol=symbol)
    assert curr < main.trader.current_gain

    curr = main.trader.current_gain
    main.trader.buy(symbol=symbol)
    assert curr > main.trader.current_gain
    curr = main.trader.current_gain

    sell_seconds = 2
    threading.Thread(target=main.trader.sell_wait,
                     kwargs=dict(symbol=symbol, sell_seconds=sell_seconds)).start()

    assert curr == main.trader.current_gain
    time.sleep(sell_seconds + 1)
    assert curr < main.trader.current_gain


def test_trader_handle_symbol_quote(main: Main, symbol_quote: Dict):
    main.should_run_trader = False
    main.should_run_stock = False
    symbol = symbol_quote.get('symbol')
    quote_list = list(main.trader.quotes[symbol])
    main.trader.handle_symbol_quote(symbol_quote=symbol_quote)
    assert len(quote_list) + 1 == len(main.trader.quotes[symbol])

    main.trader.handle_symbol_quote(symbol_quote='aa')

    assert len(quote_list) + 1 == len(main.trader.quotes[symbol])
