package Test;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;

import File_format.Csv_to_DB;
import GIS.Element;
import GIS.GIS_layer;

class ReadCsv_Test_onlyWigile {
	/**
	 * check if it's read property the csv 
	 * This test write a path to dirpath.
	 * Option A: without wigelewifi file and check if it'snt read anything.
	 * Option b:with  wigelewifi file and check if it's read it.
	 */
	@Test
	void test() throws Exception {
		String dirPath = "cc";
	
         
		/**
		 *  read files from directory and write to file
		 */
		
		File file = new File(dirPath);
		
		 GIS_layer g=(GIS_layer)Csv_to_DB.readCsv(file);
		boolean b = true;
		if(g.size()==0)
			b=false;
		assertEquals(true, b);

	}

}
