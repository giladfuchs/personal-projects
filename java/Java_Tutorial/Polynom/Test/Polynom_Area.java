package Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import myMath.Polynom;

class Polynom_Area {

		/**
		 * Polynom class Test
		 * Test to check the Area function's working well.
		 */
		@Test
		void test() {
			Polynom p=new Polynom("7*x^3 + 5*x^2 + 2*x^4");
			double area=p.area(4, -2, 0.0089);
			assertEquals(58046.28796917149,area);
	}

}
