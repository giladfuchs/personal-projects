#ifndef PLAYER_H
#define PLAYER_H
#include "Card.h"
class Player {
private:
	string name;
	int num_of_cards;
	
	//vector of cards
	//private members

public:
	//public members
	Player(string ,int ) ;
	bool play(Card&);
	vector<Card> card_list;
};
#endif



