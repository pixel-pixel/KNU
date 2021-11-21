package com.bartish;

import os.lab1.compfuncs.basic.IntOps;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class G {
    public static void main(String[] args) throws IOException, ExecutionException, InterruptedException {
        log("start work");

        var pipe_name = args[0];
        var reader = PipeManager.reader(pipe_name);
        log("create reader");

        var line = reader.readLine();
        var x = Integer.parseInt(line);
        log("has X");

        var res = IntOps.trialG(x).get();
        log("calculate new value");

        var writer = PipeManager.writer(pipe_name);
        log("create writer");

        writer.write(res+"");
        writer.close();
        log("send result");

        log("has ended work");
    }

    static void log(String text) {
        System.out.println("[G func]: " + text);
    }
}
