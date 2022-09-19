from typing import List

from pydantic import BaseModel


class Res(BaseModel):
    current_gain: int


class Symbol(BaseModel):
    price: int


class SellObj(BaseModel):
    symbol: str
    sell_seconds: int


class PredictObj(BaseModel):
    sell_seconds: int
    is_buy: bool


class TradeBySymbolObj(BaseModel):
    symbol: str
    aggregated_quotes: List[Symbol]
