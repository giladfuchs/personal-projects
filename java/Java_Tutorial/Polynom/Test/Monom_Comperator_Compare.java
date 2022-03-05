package Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import myMath.Monom;
import myMath.Monom_Comperator;

class Monom_Comperator_Compare {
	/**
	 * Monom_Comperator class Test
	 * Test to check the Compare function working well.
	 */
	@Test
	void test() {
		int po=(int)(Math.random()*50),
		po1=(int)(Math.random()*50);
		
		Monom m=new Monom(1,po);
		Monom m1=new Monom(1,po1);
		Monom_Comperator cmp=new Monom_Comperator();
		int ans=cmp.compare(m, m1);
		assertEquals(m.get_power()-m1.get_power(), ans);

		
	}

}
