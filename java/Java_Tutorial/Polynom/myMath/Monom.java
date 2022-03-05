
package myMath;
/**
 * This class represents a simple "Monom" of shape a*x^b, where a is a real number and a is an integer (summed a none negative), 
 * see: https://en.wikipedia.org/wiki/Monomial 
 * The class implements function and support simple operations as: construction, value at x, derivative, add and multiply. 
 * @author Boaz
 *
 */
public class Monom implements function{
	/*
	 * Default constructor 
	 */
	public Monom() {
		this(0, 0);
	}
	/*
	 * Regular constructor 
	 */
	public Monom(double a, int b){
		this.set_coefficient(a);
		this.set_power(b);
	}
	/*
	 * Copy constructor 
	 */
	public Monom(Monom ot) {
		this(ot.get_coefficient(), ot.get_power());
	}
	/**
	 * String constructor
		We first make sure that is legal Monom and then we create a new monom.
	 * @param input
	 */
	public Monom(String input) {
		input=input.toLowerCase();


		if((input.contains("*"))   && (!input.contains("x")) ) {
			try {
				throw new Exception("The input isn't good");
			} catch (Exception e) {e.printStackTrace();	}}

		else if(  !input.contains("^") && input.contains("x")&&  input.charAt(input.length()-1)!='x' ) {
			try {
				throw new Exception("The input isn't good");
			} catch (Exception e) {e.printStackTrace();	}}
		else if((!input.contains("*"))   && (input.contains("x"))&& (input.length()>1)  && (input.charAt(0)!='x') && (input.charAt(0)!='-')) {
			try {
				throw new Exception("The input isn't good");
			} catch (Exception e) {e.printStackTrace();	}}
		
		String[] Monom_arr;
		if((input.contains("*") && input.contains("x"))  ) {
			Monom_arr= input.split("x"); 
			Monom_arr[0] = Monom_arr[0].substring(0,Monom_arr[0].length()-1); 
			this._coefficient = Double.parseDouble(Monom_arr[0]);
			if(Monom_arr.length>1) {
				Monom_arr[0] = Monom_arr[1].substring(1,Monom_arr[1].length()); 

				if(Monom_arr[0].charAt(0) == '-') { 
					try {
						throw new Exception("This Illegel to put Negtive number in the power");
					} catch (Exception e) {e.printStackTrace();	}}

				else 
					this._power = Integer.parseInt(Monom_arr[0]); 
			}
			else this._power=1;
		}
		else if((!input.contains("*") && input.contains("x"))  ) {
			this._coefficient=1;
			if(input.contains("^")) {
				Monom_arr= input.split("x"); 
				Monom_arr[1] = Monom_arr[1].substring(1,Monom_arr[1].length());
				if(Monom_arr[1].charAt(0) == '-') { 
					try {
						throw new Exception("This Illegel to put Negtive number in the power ");
					} catch (Exception e) {e.printStackTrace();	}}

				else 
					this._power = Integer.parseInt(Monom_arr[1]); 
			}
			else
				this._power=1;
		}
		else if((!input.contains("*") && ! input.contains("x"))  ) {
			this._coefficient = Integer.parseInt(input); 
			this._power=0;
		}

	}
	/**
	 * This Function it's to multiply another Monom with our Monom.
	 */
	public Monom multiply(Monom m1) {
		return new Monom(this._coefficient*m1.get_coefficient(),
				this._power+m1.get_power());

	}
	/**
	 * This Function it's to derivative our Monom.
	 */
	public void derivative() {
		// TODO Auto-generated method stub
		this._coefficient*=this._power;
		if (this._power == 0) {
			this._coefficient =0;
		}
		else {
		this.set_power(--this._power);
		}
	}


	/**
	 * Getters && Setters
	 * @return
	 */
	public int get_power() {
		// TODO Auto-generated method stub
		return this._power;
	}
	public double get_coefficient() {
		// TODO Auto-generated method stub
		return this._coefficient;
	}
	public void set_coefficient(double a){
		this._coefficient = a;
	}
	/**
	 * Make sure we will not set negtive power.
	 * @param p
	 */
	public void set_power(int p) {
		if(p <= -1) { 
			try {
				throw new Exception("This Illegel to divide to Negtive number");
			} catch (Exception e) {e.printStackTrace();	}}
		this._power = p;
	}

	private double _coefficient; // 
	private int _power;
	/**
	 *  This Function it's to 
		active our Monom with variable x
		 and in the end we get the value for it.
	 */
	@Override
	public double f(double x) {
		// TODO Auto-generated method stub
		return this._coefficient*(Math.pow(x,this._power));
	} 
	/**
	 * This Function it's to print the Monom
	 */
	@Override
	public String toString() {
		return _coefficient + "* X^ " + _power + "  ";
	}
}
