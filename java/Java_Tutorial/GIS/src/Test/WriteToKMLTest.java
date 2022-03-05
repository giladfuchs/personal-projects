package Test;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.boehn.kmlframework.kml.KmlException;
import org.junit.jupiter.api.Test;

import File_format.csv2kml;
import Geom.Point3D;
import GIS.Data;
import GIS.Element;
import GIS.GIS_layer;
import GIS.Layer;
class WriteToKMLTest {
	/**
	 * This test create a Layer with one Element object.
	 * then send it to createKMLFile function and check if it create a kml file
	 */
	@Test
	void test() throws KmlException, IOException {
		String desPath = "";//please write your path in here
			
		GIS_layer layer=new Layer();
		Point3D general=new Point3D(34.80987434,32.16767714,0);
		layer.add(new Element(general, new Data("2018-11-27 16:35:58"), "test"));
	
		csv2kml.Layer_To_KML(desPath, layer);
		File k = new File(desPath);   //"Data.kml"
		boolean check=false;
		if(k.isFile()){
			check=true;
		
		}
		assertEquals(true, check);
	}

}
