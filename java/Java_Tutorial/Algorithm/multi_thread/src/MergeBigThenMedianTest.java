import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;

class MergeBigThenMedianTest {
/**
 * In this test I'm using both of the algorithm and then compere if they equal.
 * while they are equals the test is pass
 */
	@Test
	void test() {
		
		int size=100000;
		int[]a = new int [size];
		int[]b = new int [size];
		for(int i=0; i<a.length; i++){
			a[i] = (int)(Math.random()*size);
			b[i] = (int)(Math.random()*size);
		}
		Arrays.sort(a);
		Arrays.sort(b);
		//time for bigThanMedianAlgo
	
		int[] thread =MergeBigThenMedian.bigThanMedianAlgo(a, b);

		int[] regular =MergeBigThenMedian.bigThanMedianMerge(a,b);
		boolean flag= areEqual(regular, thread);
		
		assertEquals(true, flag);

	}
	//https://www.geeksforgeeks.org/check-if-two-arrays-are-equal-or-not/
	/**
	 * check if tow arrays are equal
	 * @param arr1
	 * @param arr2
	 * @return
	 */
	 public static boolean areEqual(int arr1[], int arr2[]) 
	    { 
	        int n = arr1.length; 
	        int m = arr2.length; 
	  
	        // If lengths of arrays are not equal 
	        if (n != m) 
	            return false; 
	  
	        // Store arr1[] elements and their counts in 
	        // hash map 
	        Map<Integer, Integer> map = new HashMap<Integer, Integer>(); 
	        int count = 0; 
	        for (int i = 0; i < n; i++) { 
	            if (map.get(arr1[i]) == null) 
	                map.put(arr1[i], 1); 
	            else { 
	                count = map.get(arr1[i]); 
	                count++; 
	                map.put(arr1[i], count); 
	            } 
	        } 
	  
	        // Traverse arr2[] elements and check if all 
	        // elements of arr2[] are present same number 
	        // of times or not. 
	        for (int i = 0; i < n; i++) { 
	            // If there is an element in arr2[], but 
	            // not in arr1[] 
	            if (!map.containsKey(arr2[i])) 
	                return false; 
	  
	            // If an element of arr2[] appears more 
	            // times than it appears in arr1[] 
	            if (map.get(arr2[i]) == 0) 
	                return false; 
	  
	            count = map.get(arr2[i]); 
	            --count; 
	            map.put(arr2[i], count); 
	        } 
	  
	        return true; 
	    } 
	  
}
