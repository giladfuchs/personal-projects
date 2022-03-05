package myMath;

import java.util.Comparator;

public class Monom_Comperator implements Comparator<Monom> {
	/**
	 * Using Comparator interface to compare between the power of the monom.
	 */
	@Override
	public int compare(Monom arg0, Monom arg1) {
		// TODO Auto-generated method stub
		return arg0.get_power() - arg1.get_power();
	}
}
