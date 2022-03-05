package Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import myMath.Monom;

class Monom_Derivative {
/**
 * Monom class Test
 * Test to check the derivative function working well
 */
	@Test
	void test() {
		int po=(int)(Math.random()*50);
		double co=(Math.random()*50);
		Monom m=new Monom(co,po);
		m.derivative();
		boolean flag =false;
		if(m.get_coefficient()==co*po  &&  m.get_power()==--po)
			flag=true;
		assertEquals(true, flag);
	}

}
