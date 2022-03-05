import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public  class game {
	 /**
	  * a varible for the game
	  */
	static  List<Integer> listgame=new ArrayList<>()   , listPlayerA=new ArrayList<>()  , listPlayerB  =new ArrayList<>()  ;
	static int totalA=0 , totalB=0;
static void	init(){
	int size=10;
	totalA=0; totalB=0;
			listgame=new ArrayList<>()  ;
			  listPlayerA =new ArrayList<>()  ;
			 listPlayerB =new ArrayList<>()  ;
		for (int i = 0; i <size; i++) {
			int temp= (int)(Math.random()*200);
			listgame.add(temp);
		}
		
	}
/**
 *  do the turn
 * @param side
 * @param player
 */
static void play(type side,type player) {
	int temp;
	/**
	 * check from where to remorve in the list
	 */
	if(side == type.left) {
		 temp = listgame.get(0);
		listgame.remove(0);
	}
	else {
		 temp = listgame.get(listgame.size()-1);
			listgame.remove(listgame.size()-1);
	}
	
	/**
	 * check to which player add the point
	 */
	if(player == type.A) {
		totalA+=temp;
		listPlayerA.add(temp);
	}
	else {
		{
			totalB+=temp;
			listPlayerB.add(temp);
		}
	}
	
}
/**
 * A compution for the computer to win cause he know algo 1 course :)
 */
public static void compPlat() {
	
		
		int left=0, right=0;
		for (int i = 0; i < listgame.size()/2; i++) {
			left += listgame.get(2*i);
			right += listgame.get(2*i+1);
		}
		if (left >right) 
			play(type.left,type.A);
		else
			play(type.right,type.A);

	
	
}
}
