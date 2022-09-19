# Interview

1. Your mission is to print model results based on the stock exchange symbol quotes and the calculation you apply on them. <br/><br/>
 1.1 nasdaq.py(Already Implemented) - The script responsible for connecting to stock exchange and handle the received symbol quotes <br/><br/>
 1.2 trader.py(Need to implement handle_symbol_quote):
     when you receive 10 seconds, starting from {current_time_seconds} % 10 = 0 from each of the provided symbols(AMZN,FB for example)
     you need to call the func calc in order to receive a calculation for the aggregated symbol ticks(you need to have at least two ticks).
     After you receive the calculated data you need to call the model(model.py) to make a prediction based on the calc data.
     The results of the model are: is to buy the symbol now and if the decision was to buy so how much seconds to wait until you sell.
     buy/sell functions are in trader.py

    1.3 please notice that most of the functions are implemented but you need to call them.
    You should implement func handle_symbol_quote in trader.py and the main function in __init__.py
    when you test all your implementation, please execute it at least 5 min to see it's stable.
    Another important thing is that you should make model prediction as fast as you can, the prediction shouldn't
    take more than 0.5 sec after the last received quote
    supply your solution to your git repo and send the link to michael@emporus.com

2. wrap you logic with rest API so it will return the current gain which in trader.py. This api should be called in the middle of your trader execution
3. create unit tests with mocks to trader.py
4. wrap all current method params with dataclasses with proper validations and add type hints where needed.
5. create decorator to print the time it took the method above to execute
6. The most important thing is performance. You can't wait for the model to predict sincetrade execution need to be as close as possible to the latest quote time.
7. The symbols for the test will be AMZN, FB
8. verify your data structures(Better to used dataclasses)
9. Provide your solution to your git repo and send the link to
10. Provide installation and execution instructions. 
