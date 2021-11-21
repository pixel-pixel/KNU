package com.bartish;

import java.io.*;

public class PipeManager {
    static final String PATH = System.getProperty("user.dir") + "/";
    static final String MKFIFO = "mkfifo";
    static final String RM = "rm";

    public static File create(String pipe_name) throws IOException, InterruptedException {
        var pipe_path = PATH + pipe_name;
        var file = new File(pipe_path);
        if (file.exists()) file.delete();

        var builder = new ProcessBuilder(MKFIFO, pipe_path);
        var process = builder.inheritIO().start();
        process.waitFor();

        return new File(pipe_path);
    }

    public static void remove(String pipe_name) {
        try {
            var pipe_path = PATH + pipe_name;
            var builder = new ProcessBuilder(RM, pipe_path);
            var process = builder.inheritIO().start();
            process.waitFor();
        } catch (IOException | InterruptedException e) {}
    }

    public static BufferedReader reader(String pipe_name) throws FileNotFoundException {
        var pipe_path = PATH + pipe_name;
        var fr = new FileReader(pipe_path);
        return new BufferedReader(fr);
    }

    public static BufferedWriter writer(String pipe_name) throws IOException {
        var pipe_path = PATH + pipe_name;
        var fr = new FileWriter(pipe_path);
        return new BufferedWriter(fr);
    }
}
