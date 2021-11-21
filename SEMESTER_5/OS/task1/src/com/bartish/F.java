package com.bartish;

import java.io.IOException;

public class F {
    public static void main(String[] args) throws IOException {
        log("start work");

        var pipe_name = args[0];
        var reader = PipeManager.reader(pipe_name);
        log("create reader");

        var line = reader.readLine();
        var x = Float.parseFloat(line);
        log("has X");

        var f_res = x + 1;
        log("calculate new value");

        var writer = PipeManager.writer(pipe_name);
        log("create writer");

        writer.write(f_res+"");
        writer.flush();
        log("send result");

        log("has ended work");
    }

    static void log(String text) {
        System.out.println("[F func]: " + text);
    }
}
