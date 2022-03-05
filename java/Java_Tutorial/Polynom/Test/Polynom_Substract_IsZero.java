package Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import myMath.Monom;
import myMath.Polynom;

class Polynom_Substract_IsZero {

		/**
		 * Polynom class Test
		 * Test to check the Substract and IsZero function's working well.
		   We create a Polynom and then substract himself and
		   Check if all the coefficient are zero.
		 */
		@Test
		void test() {
			Polynom p=new Polynom("7*x^3 + 5*x^2 + 2*x^4");
			Polynom p1=new Polynom("7*x^3 + 5*x^2 + 2*x^4");
			p.substract(p1);
			assertEquals(true,p.isZero());
	}

}
