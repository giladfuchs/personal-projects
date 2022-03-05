#include "Game.h"

Game :: Game(){
    int  NumOfCards;
   string name;
    cout<<"how many players"<<endl;
    cin>>NumOfPlayers;
    cout<<"how cards"<<endl;
    cin>>NumOfCards;

    
    
    for(int i=0;i < NumOfPlayers;++i){
         cout<<" player name num ";
         cout<<i+1<<endl;
    cin>>name;
    Players.push_back(Player(name,NumOfCards));
    }
    current_card=Card::generate_card();
}


void Game ::start(){
    vector<Player>::iterator ptr; 

   
    while(Players.size()==NumOfPlayers){
         for (ptr = Players.begin(); ptr < Players.end(); ptr++) {
           Player p= *ptr;
           p.play;
         }
    }
}