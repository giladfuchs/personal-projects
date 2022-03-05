package myMath;

import java.awt.Color;
import java.util.ArrayList;

import javax.swing.JFrame;
import de.erichseifert.gral.data.DataTable;
import de.erichseifert.gral.plots.XYPlot;
import de.erichseifert.gral.plots.lines.DefaultLineRenderer2D;
import de.erichseifert.gral.plots.lines.LineRenderer;
import de.erichseifert.gral.plots.points.PointRenderer;
import de.erichseifert.gral.ui.InteractivePanel;

public class Graph<LinePlotTest> extends JFrame {
	DataTable data;
	XYPlot plot;
	public Graph() {
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setSize(600, 400);

		data = new DataTable(Double.class, Double.class);
		for (double x = -5.0; x <= 5.0; x+=0.9) {
			double y = 5.0*Math.sin(x);
			data.add(x, y);
		}
		plot = new XYPlot(data);
		getContentPane().add(new InteractivePanel(plot));
		LineRenderer lines = new DefaultLineRenderer2D();
		plot.setLineRenderers(data, lines);
		Color color = new Color(0.0f, 0.3f, 1.0f);
		plot.getPointRenderers(data).get(0).setColor(color);
		plot.getLineRenderers(data).get(0).setColor(color);
	}
	public Graph(Polynom p , double p1 , double p2 , double eps) {
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setSize(600, 400);

		DataTable data = new DataTable(Double.class, Double.class);
		for (double x = p1; x <= p2; x+=eps) {
			double y = p.f(x);
			data.add(x, y);
		}

		plot = new XYPlot(data);
		getContentPane().add(new InteractivePanel(plot));
		LineRenderer lines = new DefaultLineRenderer2D();
		plot.setLineRenderers(data, lines);
		Color color = new Color(0.0f, 0.3f, 1.0f);
		plot.getPointRenderers(data).get(0).setColor(color);
		plot.getLineRenderers(data).get(0).setColor(color);

	}
	
	/**
	 * This Function it's to find the area by the formula of Riemann's Integr.
	 */
	public  double area(Polynom p , double p1 , double p2 ) {
		double eps=0.01;
		double sum=0;
		double piece=Math.abs((p2-p1)/eps);
		for(int i=0;i<piece;++i)
		{
			if(p.f(p1)<0)
				sum=sum+p.f(p1)*eps;
			p1+=eps;
		}

		return Math.abs(sum);

	}
	
	/**
	 * This Function it's to find the Extreme Points.
	 */
	public  void find(Polynom p , double p1 , double p2 , double eps) {
		DataTable data_find = new DataTable(Double.class, Double.class);
		Polynom dv = (Polynom) p.derivative();
		ArrayList<Min_Max> min_max = new ArrayList<Min_Max>(); 
		for(double x=p1 ;x <= p2; x+=eps) {
			double t=dv.f(x+eps) * dv.f(x-eps) ;
			if(t<0) {
				min_max.add(new Min_Max(x, p.f(x)));
			}
		}
		for(int i=0 ; i< min_max.size() ; i++) {
			System.out.println(min_max.get(i).toString());
			data_find.add(min_max.get(i).getX(),min_max.get(i).getY());
		}

		plot.add(data_find);
		getContentPane().add(new InteractivePanel(plot));
		LineRenderer lines = new DefaultLineRenderer2D();
		plot.setLineRenderers(data_find, lines);
		Color   color = new Color(0.70f, 0.31f, 0.27f);
		plot.getPointRenderers(data_find).get(0).setColor(color);
		plot.getLineRenderers(data_find).get(0).setColor(color);
	}
	
}
