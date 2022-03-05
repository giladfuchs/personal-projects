package File_format;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;

import javax.swing.plaf.synth.SynthStyle;

import org.boehn.kmlframework.kml.Document;
import org.boehn.kmlframework.kml.Kml;
import org.boehn.kmlframework.kml.KmlException;
import org.boehn.kmlframework.kml.Placemark;
import org.boehn.kmlframework.kml.TimePrimitive;
import org.boehn.kmlframework.kml.TimeStamp;

import GIS.Element;
import GIS.GIS_element;
import GIS.Element;
import GIS.GIS_layer;
import GIS.GIS_project;
/**
 * This class create a kml file using by org.boehn.kmlframework_20090718.jar
 *We can write more descripcion but we don't request so I use only the timestamp feature.
 */
public class csv2kml 
{
	public static void Layer_To_KML(String outputPath,GIS_layer  h_layer) throws KmlException, IOException {
		Kml kml = new Kml();							//create a new KML Document
		Document document = new Document();				//add a document to the kml
		kml.setFeature(document);
		 Iterator<GIS_element> it = h_layer.iterator(); 
		

		while(it.hasNext()) {
					//create a Place mark for each WiFi point.
			 Element e=(Element) it.next();
			Placemark ifi = new Placemark(e.getMac());
			ifi.setLocation(e.getGeom().x(),e.getGeom().y());
			String time = e.getData_regular().getFirstSeen();			//ifi.setId(record.get("Time"));
			if(time.length()<19){						//check if the time string is in format
				continue;
			}
			time = time.substring(0, 10)+"T"+time.substring(11, 19)+"-00:01";
			TimePrimitive timeAtPoint = new TimeStamp(time);
			ifi.setTimePrimitive(timeAtPoint);
			document.addFeature(ifi);		//add the place mark to the Document
			
	
		}

		outputPath += "\\DATA.kml";			//generate the kml file
		kml.createKml(outputPath);
	}

	public void Project_to_kml(String outputPath,GIS_project  pr) throws KmlException, IOException {
		 
		 Kml kml = new Kml();							//create a new KML Document
			Document document = new Document();				//add a document to the kml
			kml.setFeature(document);
		 Iterator<GIS_layer> it_pr = pr.iterator(); 
		 while(it_pr.hasNext()) {
			 GIS_layer la=(GIS_layer) it_pr;
		
		 
		
			 Iterator<GIS_element> it = la.iterator(); 
		
			while(it.hasNext()) {
						//create a Place mark for each WiFi point.
				 Element e=(Element) 	it.next();
				Placemark ifi = new Placemark(e.getMac());
				ifi.setLocation(e.getGeom().x(),e.getGeom().y());
				String time = e.getData_regular().getFirstSeen();			//ifi.setId(record.get("Time"));
				if(time.length()<19){						//check if the time string is in format
					continue;
				}
				time = time.substring(0, 10)+"T"+time.substring(11, 19)+"-00:01";
				TimePrimitive timeAtPoint = new TimeStamp(time);
				ifi.setTimePrimitive(timeAtPoint);
				document.addFeature(ifi);		//add the place mark to the Document
			
		
			}
			it_pr.next();
		 }
			outputPath += "\\MultyDATA.kml";			//generate the kml file
			kml.createKml(outputPath);
		 
}
}




