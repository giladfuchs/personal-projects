#ifndef GAME_H
#define GAME_H
#include "Player.h"
#include "Card.h"
class Game {
private:
vector<Player> Players;
Card current_card;
int NumOfPlayers;
	//private members and functions
public:
	//public members and functions
	void start();
	Game();
};
#endif




