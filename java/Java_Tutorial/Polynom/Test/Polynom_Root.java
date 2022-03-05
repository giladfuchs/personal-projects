package Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import myMath.Polynom;

class Polynom_Root {

	/**
	 * Polynom class Test
	 * Test to check the Area function's working well.
	 */
	@Test
	void test() {
		Polynom p=new Polynom("7*x^3 + 5*x^2 + 2*x^4");
		double root=p.root(4, -2, 0.0089);
		assertEquals(-1.0009765625,root);
	}

}
