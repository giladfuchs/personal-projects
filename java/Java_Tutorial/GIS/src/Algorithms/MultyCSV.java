package Algorithms;

import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.HashSet;

import File_format.Csv_to_DB;
import GIS.Data;
import GIS.Element;
import GIS.GIS_element;
import GIS.GIS_layer;
import GIS.GIS_project;
import GIS.Layer;
import GIS.Project;
/**
 * This class make a Recursive read from a folder path to get all the csv files
 *
 */
public class MultyCSV {
	public  static  GIS_project  readFolder(String folderPath) throws Exception{
		File dir = new File(folderPath+"\\newData");
		 dir.mkdir();
		
		File folder = new File(folderPath);	
		File[] listOfFiles = folder.listFiles(new FilenameFilter(){
			public boolean accept(File dir, String filename){
				return filename.endsWith(".csv"); 
			}
		} );		
		if( listOfFiles == null ){
			throw new Exception("The folder "+folderPath+" does not exist");
		}
		GIS_project project_ans=new Project(new Data(folderPath));
		GIS_layer layer_ans=null;
		for (int i = 0; i < listOfFiles.length; i++) {
			 HashSet<GIS_element>  data= new HashSet<GIS_element>();
			 layer_ans=Csv_to_DB.readCsv(listOfFiles[i]);
			 project_ans.add(layer_ans);
		}
		return project_ans;
	
	}
}
