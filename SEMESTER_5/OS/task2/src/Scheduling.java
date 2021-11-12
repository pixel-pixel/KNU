import java.io.*;
import java.util.*;

public class Scheduling {

    private final static String filePath = "scheduling.conf";
    private static int processNum = 5;
    private static int meanDev = 1000;
    private static int standardDev = 100;
    private static int runtime = 1000;
    private static int blockingTime = 20;
    private static final ArrayList<Process> processArr = new ArrayList<>();
    private static Results result = new Results("null", "null", 0);
    private static final String resultsFile = "Summary-Results";

    private static void Init(File file) {
        File f = file;
        String line;
        int cputime;
        int ioblocking;
        double X;

        try {
            DataInputStream in = new DataInputStream(new FileInputStream(f));
            while ((line = in.readLine()) != null) {
                if (line.startsWith("numprocess")) {
                    StringTokenizer st = new StringTokenizer(line);
                    st.nextToken();
                    processNum = Common.s2i(st.nextToken());
                } else if (line.startsWith("meandev")) {
                    StringTokenizer st = new StringTokenizer(line);
                    st.nextToken();
                    meanDev = Common.s2i(st.nextToken());
                } else if (line.startsWith("standdev")) {
                    StringTokenizer st = new StringTokenizer(line);
                    st.nextToken();
                    standardDev = Common.s2i(st.nextToken());
                } else if (line.startsWith("blockingTime")) {
                    StringTokenizer st = new StringTokenizer(line);
                    st.nextToken();
                    blockingTime = Common.s2i(st.nextToken());
                } else if (line.startsWith("process")) {
                    StringTokenizer st = new StringTokenizer(line);
                    st.nextToken();
                    ioblocking = Common.s2i(st.nextToken());
                    X = Common.R1();
                    while (X == -1.0) {
                        X = Common.R1();
                    }
                    X = X * standardDev;
                    cputime = (int) X + meanDev;
                    processArr.add(new Process(cputime, ioblocking, 0, 0, 0, blockingTime, false, -1));
                }
                if (line.startsWith("runtime")) {
                    StringTokenizer st = new StringTokenizer(line);
                    st.nextToken();
                    runtime = Common.s2i(st.nextToken());
                }
            }
            in.close();
        } catch (IOException e) {}
    }

    public static void main(String[] args) throws Exception {
        File f = new File(filePath);
        if (!f.exists()) throw new Exception("Scheduling: error, file '" + f.getName() + "' does not exist.");
        else if (!f.canRead()) throw new Exception("Scheduling: error, read of " + f.getName() + " failed.");

        System.out.println("Working...");
        Init(f);

        for (int i = 0; processArr.size() < processNum; i++) {
            double X = Common.R1();
            while (X == -1.0) {
                X = Common.R1();
            }
            X = X * standardDev;
            int cputime = (int) X + meanDev;
            processArr.add(new Process(cputime, i * 100, 0, 0, 0, blockingTime, false, -1));
        }
        System.out.println("kek");
        result = SchedulingAlgorithm.Run(runtime, processArr, result);
        try {
            PrintStream out = new PrintStream(new FileOutputStream(resultsFile));
            out.println("Scheduling Type: " + result.schedulingType);
            out.println("Scheduling Name: " + result.schedulingName);
            out.println("Simulation Run Time: " + result.compuTime);
            out.println("Mean: " + meanDev);
            out.println("Standard Deviation: " + standardDev);
            out.println("Process #\tCPU Time\tIO Blocking\tCPU Completed\tCPU Blocked");
            for (int i = 0; i < processArr.size(); i++) {
                Process process = processArr.get(i);
                out.print(i);

                if (i < 100) out.print("\t\t");
                else out.print("\t");

                out.print(process.cputime);
                if (process.cputime < 100) {
                    out.print(" (ms)\t\t");
                } else {
                    out.print(" (ms)\t");
                }
                out.print(process.ioblocking);
                if (process.ioblocking < 100) {
                    out.print(" (ms)\t\t");
                } else {
                    out.print(" (ms)\t");
                }
                out.print(process.cpudone);
                if (process.cpudone < 100) {
                    out.print(" (ms)\t\t");
                } else {
                    out.print(" (ms)\t");
                }
                out.println(process.numblocked + " times");
            }
            out.close();
        } catch (IOException e) {}
        System.out.println("Completed.");
    }
}

