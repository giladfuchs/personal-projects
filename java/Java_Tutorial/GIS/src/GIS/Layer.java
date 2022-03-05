package GIS;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;


/**
 * This class implements GIS_Layer functions.
 */
public class Layer extends HashSet<GIS_element> implements GIS_layer {
	
    /**
	 * Varible && Constructor
	 */
	Data db ;
	public Layer( Data db) {
		super();
		this.db = db;
	}

	public Layer() {
		// TODO Auto-generated constructor stub
	}
    
	@Override
	public Meta_data get_Meta_data() {
		return  db;
	}
	
	public String toString()
	{
		Iterator<GIS_element> it = this.iterator();
		String toString = "[\n"; 
		while(it.hasNext())
		{
			toString += it.next().toString() + "\n";
		}
		toString += "]";
		return toString;
	}

}