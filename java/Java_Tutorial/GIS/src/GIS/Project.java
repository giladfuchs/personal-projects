package GIS;
import java.util.HashSet;
import java.util.Iterator;

import File_format.csv2kml;
/**
 * This class implements GIS_Project functions.
 */
public class Project extends HashSet<GIS_layer> implements GIS_project {
	/**
	 * Varible && Constructor
	 */
	private Data db ;
	public Project() {

	}

	public Project(Data data) {
		this.db=data;
	}

	public Data getDb() {
		return db;
	}
	public void setDb(Data db) {
		this.db = db;
	}

	@Override
	public Meta_data get_Meta_data() {
		// TODO Auto-generated method stub
		return this.db ;
	}
	public String toString()
	{
		Iterator<GIS_layer> it = this.iterator();
		String toString = "{\n"; 
		while(it.hasNext())
		{
			toString += it.next().toString() + "\n";
		}
		toString += "}\n";
		return toString;
	}
}
