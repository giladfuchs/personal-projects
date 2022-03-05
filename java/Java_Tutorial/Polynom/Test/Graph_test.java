package myMath;

public class Graph_test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Polynom n = new Polynom("0.2*x^4 - 1.5*x^3 + 3.0*x^2 - x - 5");
		
		Graph frame = new Graph(n,-2,6,0.01);
		frame.find(n,-2,6,0.1);
		System.out.println(frame.area(n, -2, 6));
		frame.setVisible(true);

	}

}
