#include "Player.h"

Player::Player(string name,int cards) 
        : num_of_cards(cards), name(name){
   for(int i=0;i < cards;++i)
         card_list.push_back(Card::generate_card());
    
        }


 bool Player::play(Card& cur){
     cout<<"current: ";
     cout<<cur;
     cout<<"\n your turn";
     cout<<name<<endl;
      vector<Card>::iterator ptr; 
         for (ptr = card_list.begin(); ptr < card_list.end(); ptr++) {
           Card c= *ptr;
           cout<<c;
           cout<<"     ";
           
         }


 }