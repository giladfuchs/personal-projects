package Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import Algorithms.MultyCSV;

class MultyCSV_Test {
	/**
	 * test to check the recursive read of csv
	 */
	@Test
	void test() {
		
		String folderPath="data";
		try {
			MultyCSV.readFolder(folderPath);
		} catch (Exception e) {
			fail("Folder "+ folderPath +" does not exist");
		}
	}
	}

