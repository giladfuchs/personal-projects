import java.util.Arrays;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MergeBigThenMedian {

	/**
	 * https://stackoverflow.com/questions/34580668/multithreaded-merge-sort-adding-additional-threads
	 * I got help from here.
	 * In this function I get tow arrays and merge them to one with elmetnt only bigger than the middle.
	 * I'm using ThreadPool for each cell in the new array.
	 * @param a
	 * @param b
	 * @return
	 */
	public static   int[] bigThanMedianAlgo( int []a, int[] b )  {
		long start = System.currentTimeMillis();

		int numThreads =a.length;
		int [] ans = new int [ numThreads];
		// A thread pool
		ExecutorService executors = Executors.newFixedThreadPool(numThreads);

		// it split the work
		for (int i = 0; i <= (numThreads - 1); i++) {
			final	int temp=i;
			// sending the work to calculate
			executors.execute(() -> ans[temp] = Math.max(a[temp], b[numThreads-temp-1]));
		}

		// shutdown the thread pool.
		executors.shutdown();
		// this is waiting until work is done
		while(!executors.isTerminated());
		long time = System.currentTimeMillis()- start;
		System.out.println("Using thread take: " + (time ) + "  in ms");
		return ans;
	}
	/**
	 * In this function I get tow arrays and merge them to one with elmetnt only bigger than the middle.
	 * @param a
	 * @param b
	 * @return
	 */

	public static int[] bigThanMedianMerge(int[]a, int[] b){
		long start = System.currentTimeMillis();
		int size=a.length;
		int [] ans = new int [size];
		int k =size-1, j= size-1;
		for (int i = 0; i < size; i++) {
			ans[i] =(a[k]> b[j] ? a[k--] :b[j--]);
		}
		long time = System.currentTimeMillis()- start;
		System.out.println("Without Using thread take: " + (time ) + "  in ms");
		return ans;
	}
	public static void main(String[] args) {
		int size=1000;
		int[]a = new int [size];
		int[]b = new int [size];
		for(int i=0; i<a.length; i++){
			a[i] = (int)(Math.random()*size);
			b[i] = (int)(Math.random()*size);
		}
		Arrays.sort(a);
		Arrays.sort(b);
		//time for bigThanMedianAlgo
	
		int[] thread = bigThanMedianAlgo(a, b);

		int[] regular = bigThanMedianMerge(a,b);


		
	}
}
