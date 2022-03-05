/**
 * 
 */
package Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import myMath.Monom;
import myMath.Polynom;


class Polynom_Add {
	/**
	 * Polynom class Test
	 * Test to check the add function working well and
	 * Put Monom with the same power without dulicate.
	 */
	@Test
	void test() {
		int po=(int)(Math.random()*50);
		double co=(Math.random()*50);
		Monom m=new Monom(co,po);
		co=(Math.random()*50);
		Monom m1=new Monom(co,po);
		Polynom p=new Polynom();
		p.add(m1);
		p.add(m);
		boolean flag =false;
		if(	p.getMapMonom().size()==1 )
			flag=true;
		assertEquals(true, flag);
	}

}
