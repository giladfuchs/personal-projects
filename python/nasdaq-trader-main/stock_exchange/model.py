import random
from typing import Dict

from stock_exchange.serializers import PredictObj


class Model:
    def predict(self, calced_data: Dict)->PredictObj:
        is_buy = random.randint(1, 10) > 5
        sell_seconds = -1
        if is_buy:
            sell_seconds = random.randint(1, 5)
        return PredictObj(is_buy=is_buy, sell_seconds=sell_seconds)
