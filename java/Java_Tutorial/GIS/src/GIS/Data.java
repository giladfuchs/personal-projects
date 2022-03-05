package GIS;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

import Geom.Point3D;

/**
 * This class implements Meta_Data functions.
 */
public class Data implements Meta_data {
	private String FirstSeen, Name;
	private long UTC;

	/*
	 * Constructor
	 */
	public Data(String firstSeen,String name) {
		super();
		this.Name=name;
		FirstSeen = firstSeen;
		setUTC(firstSeen);
	}

	public Data(String name) {
		String seen=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
		this.Name=name;
		this.FirstSeen=seen;
		setUTC(seen);
	}
	/**
	 * Getters && Setters
	 * @return
	 */
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getFirstSeen() {
		return FirstSeen;
	}

	public void setFirstSeen(String firstSeen) {
		FirstSeen = firstSeen;
	}
	/**
	 *Change the String to format of long to preesent the time 
	 * @param firstSeen
	 */
	public void setUTC(String firstSeen) {
		FirstSeen = firstSeen;
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US);
		format.setTimeZone(TimeZone.getTimeZone("UTC"));

		java.util.Date date = null;
		try {
			date =  format.parse(firstSeen);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.UTC = date.getTime();

	}

	@Override
	public String toString() {
		return FirstSeen + ", " + Name ;
	}

	@Override
	public long getUTC() {
		// TODO Auto-generated method stub
		return this.UTC;
	}
	/**
	 * We dont request to fill this function yet
	 */
	@Override
	public Point3D get_Orientation() {
		// TODO Auto-generated method stub
		return null;
	}

}
