#ifndef CARD_H
#define CARD_H
#include<string>
#include<iostream>
#include <random>
#include <time.h>
using namespace std;
enum class color { NAC, R, G, B, Y }; //enumartion of colors. NAC - is not avaiable color
enum class sign { NAS, N1, N2, N3, N4, N5, N6, N7, N8, N9, PLUS, STOP, CD, TAKI }; //enumartion of signs. NAS - is not avaiable sign
class Card {
	private:
	color clr;
	sign s;
	static int counter;
public:
	
	Card(color clr = color::NAC, sign s = sign::NAS) : clr{clr}, s{s} {++counter;}; //default construtor and init list constructor
	Card(const Card& card) : clr{card.clr}, s{card.s} {}; //copy constructor
	Card& operator=(const Card& card) {clr = card.clr; s = card.s; return *this;}; //operator=
	bool is_legal(const Card& other_card) const; //check if other card is legal on this card. if same color or sign retrun true, else return false.
	sign get_sign() const { return s; }
	color get_color() const { return clr; }
	friend std::ostream& operator << (std::ostream &os, const Card &c); //operator << for Card. print the sign, colored.
	static Card generate_card(); //return random card
};

#endif






