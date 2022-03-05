package File_format;

import java.awt.List;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

import GIS.Data;
import GIS.Element;
import GIS.GIS_element;
import GIS.GIS_layer;
import GIS.Layer;
import GIS.Meta_data;
import Geom.Point3D;
/** 
 *  This class reads .csv files created by Wigile-Wifi using commons-csv-1.5.jar .
 */
public class Csv_to_DB {
	

	public static GIS_layer readCsv(File filePath) throws Exception{
		FileReader in;
		GIS_layer layer_ans=null;
		try {			
			in = new FileReader(filePath);
			BufferedReader br =new BufferedReader(in);
			String line= br.readLine();
			if(! line.contains("WigleWifi-1.4")) 
				throw new Exception("this isn't WigleWifi-1.4 file");
			
			String value=null;
			int start = line.indexOf("model=");
			if(start>=0){
				start+="model=".length();
				int end = line.indexOf(",",start);
				if(end>0){
					value= line.substring(start, end);
				}
			}
			Iterable<CSVRecord> records = CSVFormat.RFC4180.withFirstRecordAsHeader().parse(br);	
			layer_ans=new Layer(new Data(value));
			for (CSVRecord record : records) {
				Point3D p=new Point3D(Double.parseDouble(record.get("CurrentLatitude")),
						Double.parseDouble(record.get("CurrentLongitude")), Double.parseDouble(record.get("AltitudeMeters")));
				
				layer_ans.add(new Element(p, new Data( record.get("FirstSeen"),value),  record.get("SSID")));
			}
			
			br.close();
		} catch (FileNotFoundException e) {
			throw new Exception("Error reading file\n" + e);
		} catch (IOException ex) {
			throw new Exception("Error reading file\n" + ex);
		}
		return layer_ans;

	}

}
