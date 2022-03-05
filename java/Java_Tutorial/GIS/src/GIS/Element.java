package GIS;

import Coords.MyCoords;
import Geom.Point3D;

public class Element implements GIS_element {
/**
 * this class represnt a row in the csv files
 */
	private Point3D point;
	private Data data;
	private String Mac;


	/**
	 * Constructor
	 * @param point
	 * @param data
	 */
	public Element(Point3D point , Data data,String mac) {
		this.point = point;
		this.data = data;
		this.Mac=mac;
	}

	/**
	 * Getters && Setters
	 * @param point
	 */
	public String getMac() {
		return Mac;
	}

	public void setMac(String mac) {
		Mac = mac;
	}
	public void setpoint(Geom.Point3D point) {
		this.point = point;
	}

	public void setData(Data data) {
		this.data = data;
	}
	public Data getData_regular() {
		return data;
	}
	@Override
	public Geom.Point3D getGeom() {
		return point;
	}

	@Override
	public Meta_data getData() {
		return (Meta_data)data;
	}

	/**
	 *need to work
	 */
	@Override
	public void translate(Point3D vec) {


	}
	public String toString() {
		return Mac +" , "+point.toString() + "," + data.toString();
	}
}