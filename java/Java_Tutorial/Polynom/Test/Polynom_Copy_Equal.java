package Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import myMath.Polynom;

class Polynom_Copy_Equal {
		/**
		 * Polynom class Test
		 * Test to check the Copy and Equal function's working well.
		   We create a Polynom and then make a deep copy to another Polynom.
		   Check if if they are equal and check the adrees in the Memory.
		 */
		@Test
		void test() {
			Polynom p=new Polynom("7*x^3 + 5*x^2 + 2*x^4");
			Polynom p1=(Polynom) p.copy();
			assertEquals(true,p.equals(p1)  && p1!=p);
	}

}
