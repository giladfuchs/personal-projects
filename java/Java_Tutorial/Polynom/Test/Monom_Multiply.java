package Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import myMath.Monom;

class Monom_Multiply {
	/**
	 * Monom class Test
	 * Test to check the multiply function working well
	 */
	@Test
	void test() {
		int po=(int)(Math.random()*50);
		double co=(Math.random()*50);
		Monom m=new Monom(co,po);
		m=m.multiply(m);
		boolean flag =false;
		if(m.get_coefficient()==Math.pow(co,2)  &&  m.get_power()==2*po)
			flag=true;
		assertEquals(true, flag);
	}

}
