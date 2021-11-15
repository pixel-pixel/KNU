import java.util.ArrayList;
import java.util.List;
import java.io.*;
import java.util.Vector;

public class SchedulingAlgorithm {

  public static Results Run(int runtime, Vector<Process> processArr, Results result) {
    int comptime = 0;
    int currentProcess = 0;
    int previousProcess = 0;
    int size = processArr.size();
    int completed = 0;
    boolean repeat = false;

    String resultsFile = "Summary-Processes";

    result.schedulingType = "Preemptive";
    result.schedulingName = "Shortest remaining time first";
    try {
      PrintStream out = new PrintStream(new FileOutputStream(resultsFile));

      currentProcess = getNextProcess(processArr);
      Process process = processArr.get(currentProcess);

      out.println("Process: " + currentProcess + " registered... (" + process.cputime + " " + process.ioblocking + " " + process.cpudone + ")");
      while (comptime < runtime) {
        if (process.cpudone == process.cputime) {
          completed++;
          out.println("Process: " + currentProcess + " completed... (" + process.cputime + " " + process.ioblocking + " " + process.cpudone + ")");
          if (completed == size) {
            result.compuTime = comptime;
            out.close();
            return result;
          }
          if(completed == size - 1) {
            for(int i = 0; i < processArr.size(); i++){
              if(processArr.get(i).cpudone < processArr.get(i).cputime){
                currentProcess = i;
                if(processArr.get(i).isBlocked){
                  processArr.get(i).isBlocked = false;
                }
              }
            }
            process = processArr.get(currentProcess);
            out.println("Process: " + currentProcess + " registered... (" + process.cputime + " " + process.ioblocking + " " + process.cpudone + ")");

          } else {
            currentProcess = getNextProcess(processArr);
            process = processArr.get(currentProcess);
            out.println("Process: " + currentProcess + " registered... (" + process.cputime + " " + process.ioblocking + " " + process.cpudone + ")");
          }
        }

        if (process.ioblocking <= process.ionext) {
          if(!allProcessInaccessible(processArr, currentProcess)) {
            out.println("Process: " + currentProcess + " I/O blocked... ("
                    + process.cputime + " " + process.ioblocking + " " + process.cpudone + ")");
            process.ionext = 0;
            process.numblocked++;
            process.isBlocked = true;
            process.absoluteUnblockingTime = comptime + process.blockingTime;
            currentProcess = getNextProcess(processArr);
            process = processArr.get(currentProcess);
            out.println("Process: " + currentProcess + " registered... (" + process.cputime + " " + process.ioblocking + " " + process.cpudone + ")");
          }
        }

        for(int i = 0; i < processArr.size(); i++){
          if(processArr.get(i).absoluteUnblockingTime == comptime){
            processArr.get(i).isBlocked = false;
            processArr.get(i).ionext = 0;
            processArr.get(i).absoluteUnblockingTime = -1;
            repeat = true;
          }
        }

        if(repeat && completed!= size){
          previousProcess = currentProcess;
          currentProcess = getNextProcess(processArr);
          if(previousProcess!=currentProcess){
            out.println("Process: " + previousProcess + " interrupted by scheduler... (" + process.cputime + " " + process.ioblocking + " " + process.cpudone + ")");
          }
          process = processArr.get(currentProcess);
          out.println("Process: " + currentProcess + " registered... (" + process.cputime + " " + process.ioblocking + " " + process.cpudone + ")");
        }

        process.cpudone++;       
        if (process.ioblocking > 0) {
          process.ionext++;
        }
        comptime++;
        repeat = false;
      }
      out.close();
    } catch (IOException e) { /* Handle exceptions */ }
    result.compuTime = comptime;
    return result;
  }

  private static int getNextProcess(List<Process> processVector){
      int minProcessIndex = 0;
      Process process = processVector.get(minProcessIndex);
      while (process.isBlocked || process.cpudone >= process.cputime){
        minProcessIndex++;
        process = processVector.get(minProcessIndex);
      }

      int remainingTime = process.cputime - process.cpudone;

      for (int i = 0; i < processVector.size(); i++){
        if(i == minProcessIndex){
          continue;
        }
        process = processVector.get(i);
        if(process.cpudone < process.cputime){
          if(process.cputime - process.cpudone < remainingTime && !process.isBlocked){
            minProcessIndex = i;
            remainingTime = process.cputime - process.cpudone;
          }
        }
      }
      return minProcessIndex;
  }

  private static boolean allProcessInaccessible(List<Process> processVector, int currentProcess){
    boolean allBlocked = true;
    for (int i = 0; i < processVector.size(); i++) {
      if(!processVector.get(i).isBlocked && processVector.get(i).cpudone < processVector.get(i).cputime){
        if(i == currentProcess){
          continue;
        }
        allBlocked = false;
      }
    }
    return allBlocked;
  }
}
