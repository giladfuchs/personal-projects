package myMath;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.function.Predicate;

import myMath.Monom;
/**
 * This class represents a Polynom with add, multiply functionality, it also should support the following:
 * 1. Riemann's Integral: https://en.wikipedia.org/wiki/Riemann_integral
 * 2. Finding a numerical value between two values (currently support root only f(x)=0).
 * 3. Derivative
 * 
 * @author Boaz
 *
 */
public class Polynom implements Polynom_able{
	/**
	 * Using Hashmap to store all the Monom.
	 */
	private HashMap<Integer, Monom> MapMonom = new HashMap<Integer, Monom>();

	/**
	 * Iterator for the Hashmap .
	 */
	private Set set ;
	private Iterator iterator ;
	private Iterator iteratorOther ;
	private Map.Entry ShowMap ;
	/**
	 * Other varible to use in the function.
	 */
	private Monom m,otherM;
	private int i_temp; 
	private double Total;
	/*
	 * Default constructor 
	 */
	public Polynom() {	}
	/**
	 * String constructor
	this Constructor get string and split it
	 to monom and then store it in the map.
	 * @param input
	 */
	public Polynom(String input)  {
		String[] Monom_arr = input.split(" "); 
		if(Monom_arr.length%2 != 1) { 
			try {
				throw new Exception("The input isn't good");
			} catch (Exception e) {e.printStackTrace();	}}

		m=new Monom(Monom_arr[0]);
		this.MapMonom.put(m.get_power(), m);
		i_temp = 1;
		while ( i_temp < Monom_arr.length) {
			m=new Monom(Monom_arr[i_temp]+Monom_arr[i_temp+1]);
			this.MapMonom.put(m.get_power(), m);
			i_temp+=2;
		}
	}
	/**
	 * Map getter
	 * @return
	 */
	public HashMap<Integer, Monom> getMapMonom() {
		return MapMonom;
	}
	/**
	 * This Function it's to print the polynom
	 */
	@Override
	public String toString() {
		String print="";
		this.iterator=this.iteretor();  
		while(iterator.hasNext()) {
			ShowMap = (Map.Entry)iterator.next();
			m= (Monom) ShowMap.getValue();
			print=print+m.toString()+" + ";
		}
		print=print.substring(0, print.length()-2);
		return print;
	}
	/**
	 *  This Function it's to 
		active our Polynom with variable x
		 and in the end we get the value for it.
	 */
	@Override
	public double f(double x) {
		// TODO Auto-generated method stub
		double Total=0;
		this.iterator=this.iteretor();  
		while(iterator.hasNext()) {
			ShowMap = (Map.Entry)iterator.next();
			m= (Monom) ShowMap.getValue();
			Total+=m.f(x);
		}
		return Total;
	}
	/**
	 * This Function it's to add another Polynom to our Polynom
		we make sure we don't have duplicate power by using hashmap
		to store it.
	 */
	@Override
	public void add(Polynom_able p1) {
		this.iterator=p1.iteretor();  
		while(iterator.hasNext()) {
			ShowMap = (Map.Entry)iterator.next();
			m= (Monom) ShowMap.getValue();
			this.add(m);
		}
	}
	/**
	 * This Function it's to add another monom to our Polynom
		we make sure we don't have duplicate power by using hashmap
		to store it.
	 */
	@Override
	public void add(Monom m1) {
		if(MapMonom.get(m1.get_power())!=null)
			MapMonom.get(m1.get_power()).set_coefficient(MapMonom.get(m1.get_power()).get_coefficient()+m1.get_coefficient());
		else
			this.MapMonom.put(m1.get_power(), m1);
	}
	/**
	 * This Function it's to subtract another Polynom from our Polynom,
	 * so I take to Poloynom and multiply it with -1 and then send it to the Function add.
	 */
	@Override
	public void substract(Polynom_able p1) {
		this.iterator=p1.iteretor();  
		while(iterator.hasNext()) {
			ShowMap = (Map.Entry)iterator.next();
			m= (Monom) ShowMap.getValue();
			m.set_coefficient(-1 * m.get_coefficient());
			this.add(m);
		}
	}
	/**
	 * This Function it's to multiply another Polynom with our Polynom,
	 */
	@Override
	public void multiply(Polynom_able p1) {
		ArrayList<Monom> Multy = new ArrayList<Monom>();
		this.iterator=p1.iteretor();  
		this.iteratorOther=this.iteretor(); 

		while(iteratorOther.hasNext()) {
			ShowMap = (Map.Entry)iteratorOther.next();
			m= (Monom) ShowMap.getValue();
			while(this.iterator.hasNext()) {
				ShowMap = (Map.Entry)iterator.next();
				otherM= (Monom) ShowMap.getValue();
				Multy.add(otherM.multiply(m));

			}
			this.iterator=p1.iteretor();  
		}
		List_To_Map(Multy);
	}
	/**
	 * Assistant Function
	 * This Function it's to take all the Monom in list and transfer it to to map.
	 */
	private void List_To_Map(ArrayList<Monom> List) {
		this.MapMonom.clear();
		for (Monom mn:List) 
			this.add(mn);
	}
	/**
	 * This Function it's to check if two monom are equal
		so we check if the size of the polynom are equal
		and we check too if all the monom have the same coefficient and power.
	 */
	@Override
	public boolean equals(Polynom_able p1) {
		Total=0;
		this.iterator=p1.iteretor();  
		while(iterator.hasNext() ) {
			ShowMap = (Map.Entry)iterator.next();
			m= (Monom) ShowMap.getValue();
			Total++;
			if(MapMonom.get(m.get_power())==null || MapMonom.get(m.get_power()).get_coefficient() != m.get_coefficient())
				return false;	
		}
		if(Total != this.MapMonom.size())
			return false;
		return true;
	}
	/**
	 * This Function it's to check if all the coefficient are equal to zero.
	 */
	@Override
	public boolean isZero() {
		this.iterator=this.iteretor();  
		while(iterator.hasNext()) {
			ShowMap = (Map.Entry)iterator.next();
			m= (Monom) ShowMap.getValue();
			if(m.get_coefficient() != 0)
				return false;
		}
		return true;
	}
	/**
	 * This Function it's to find the root by the formula.
	 */
	@Override
	public double root(double x0, double x1, double eps) {
		if(0<this.f(x0)*this.f(x1)) {
			try {
				throw new Exception("IT'S ILLEGAL THAT 0<f(x1)*f(x0)");
			} catch (Exception e) {e.printStackTrace();	}}
		else if(Math.abs(x0-x1)<eps)
			return ((x0+x1)/2);
		else	if(this.f(x0)==0)
			return x0;
		else	if(this.f(x1)==0)
			return x1;

		double mid=(x0+x1)/2;
		if(0<=this.f(x0)*this.f(mid))
			return root(mid,x1,eps);
		else
			return root(x0,mid,eps);
	}
	/**
	 * This Function it's to do deep copy the Polynom.
	 */
	@Override
	public Polynom_able copy() {
		Polynom pl=new Polynom();
		this.iterator=this.iteretor(); 

		while(iterator.hasNext()) {
			ShowMap = (Map.Entry)iterator.next();
			m= (Monom) ShowMap.getValue();
			pl.MapMonom.put(m.get_power(), new Monom(m));
		}

		return pl;
	}
	/**
	 * This Function it's to derivative the Polynom.
	 */
	@Override
	public Polynom_able derivative() {
		Polynom pl=(Polynom) this.copy();
		pl.iterator=pl.iteretor(); 
		while(pl.iterator.hasNext()) {
			pl.ShowMap = (Map.Entry)pl.iterator.next();
			pl.m= (Monom) pl.ShowMap.getValue();
			pl.m.derivative();
		}
		return pl;
	}
	/**
	 * This Function it's to find the area by the formula of Riemann's Integra.
	 */
	@Override
	public double area(double x0, double x1, double eps) {
		Total = 0;	
		int i_temp = (int)(Math.abs((x1 - x0)/eps));
		for (int i = 0; i < i_temp; i++) {
			if(this.f(x0)>0)
				Total += this.f(x0) * eps;
			x0 += eps;
		}
		return Total;
	}
	/**
	 * This Function it's to get iteretor for the first element in the map.
	 */
	@Override
	public Iterator<Monom> iteretor() {
		this.set= this.MapMonom.entrySet();
		return this.set.iterator();
	}
}
