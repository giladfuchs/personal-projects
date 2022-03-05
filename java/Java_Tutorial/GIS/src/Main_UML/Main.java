package Main_UML;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashSet;

import Algorithms.MultyCSV;
import File_format.Csv_to_DB;
import File_format.csv2kml;
import GIS.Data;
import GIS.Element;
import GIS.GIS_element;
import GIS.GIS_layer;
import GIS.GIS_project;

public class Main {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		File file = new File("");

		GIS_layer la= (GIS_layer)Csv_to_DB.readCsv(file);
		
		GIS_project pr=MultyCSV.readFolder("ff");
		csv2kml.Layer_To_KML("fsd", la);
		int mode=0;
		String path="";
		while(mode>0){
			mode=MyConsole.readInt("to read csv file press  1\nto read csv from folder press 2\nto export kml press 3\nto exit press 0\n");
			switch(mode) {
			
			case 1 :
				path=MyConsole.readString("write the path to the file\n");
				File file1 = new File(path);
				la=Csv_to_DB.readCsv(file1);
				break;
			case 2 :
				path=MyConsole.readString("write the path to the folder\n");
				pr=MultyCSV.readFolder(path);
				break; 

			case 3 :
				path=MyConsole.readString("write the path to export kml file\n");
				csv2kml.Layer_To_KML(path, la);
				break;

			}

		}
	}

}
