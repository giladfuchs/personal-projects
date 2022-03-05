package Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import myMath.Monom;

class Monom_F {
	/**
	 * Monom class Test
	 * Test to check the activate function f working well
	 */
		@Test
		void test() {
			int po=(int)(Math.random()*50),x=(int)(Math.random()*100);
			double co=(Math.random()*50);
			Monom m=new Monom(co,po);
			boolean flag =false;
			if(m.f(x) == co*Math.pow(x, po));
				flag=true;
			assertEquals(true, flag);
	}

}
