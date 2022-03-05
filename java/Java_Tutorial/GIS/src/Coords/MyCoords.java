package Coords;

import Geom.Point3D;

public class MyCoords implements coords_converter{
	private static final double Earth = 6371000 , PI=Math.PI/180;
	private double x,y,z,LonNorm;
	/** computes a new point which is the gps point transformed by a 3D vector (in meters)*/
	@Override
	public Point3D add(Point3D gps, Point3D local_vector_in_meter) {
		this.LonNorm = Math.cos((gps.x()*Math.PI)/180);
		this.x = gps.x()+Math.toDegrees(Math.asin(local_vector_in_meter.x()/Earth));
		this.y = gps.y()+Math.toDegrees(Math.asin(local_vector_in_meter.y()/(Earth*this.LonNorm)));
		this.z = gps.z()+local_vector_in_meter.z();

		return new Point3D(this.x,this.y,this.z);

	}
	/** computes the 3D distance (in meters) between the two gps like points */
	@Override
	public double distance3d(Point3D gps0, Point3D gps1) {
		/*Using the function vector3D to convert and then calculate the distance by the formula*/
		Point3D Vector_temp = new Point3D(this.vector3D(gps0, gps1));
		return Math.sqrt(Vector_temp.x()*Vector_temp.x()+Vector_temp.y()*Vector_temp.y());
	}
	/** computes the 3D vector (in meters) between two gps like points */
	@Override
	public Point3D vector3D(Point3D gps0, Point3D gps1) {
		/*Convert the points to Lat & Lon and then with the PI to Radian*/
		this.LonNorm=Math.cos(gps0.x()*PI);

		this.x =(gps1.x()-gps0.x())*PI;

		this.y=(gps1.y()-gps0.y())*PI;

		this.z=gps1.z()-gps0.z();

		/*Convert the Radian to Meter with Earth*/
		this.x=Math.sin(this.x)*Earth;

		this.y=Math.sin(this.y)*this.LonNorm*Earth;
		return new Point3D(this.x, this.y, this.z);
	}
	/** computes the polar representation of the 3D vector be gps0-->gps1 
	 * Note: this method should return an azimuth (aka yaw), elevation (pitch), and distance*/
	@Override
	public double[] azimuth_elevation_dist(Point3D gps0, Point3D gps1) {
		double [] azimuth=new double[3];
		azimuth[2] = distance3d(gps1, gps0);
		azimuth[0] = gps1.north_angle(gps0);
		azimuth[1] = Math.toDegrees(Math.asin((gps0.z()-gps1.z())/(azimuth[2])));
		
		return azimuth;
	}
	/*
	 *  * return true iff this point is a valid lat, lon , lat 
	 *  coordinate: [-180,+180],[-90,+90],[-450, +inf]
	 */
	@Override
	public boolean isValid_GPS_Point(Point3D p) {
		if (p.x()<180 ||  p.x()>-180 || p.y()<-90 || p.y()>90 || p.z()<-450 )
			return false;
		return true;
	
	}

}
