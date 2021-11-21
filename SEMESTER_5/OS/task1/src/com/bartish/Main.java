package com.bartish;

import java.io.*;
import java.util.Scanner;

public class Main {
    static final Class<F> F_CLASS = F.class;
    static final Class<G> G_CLASS = G.class;

    static final String F_PIPE_NAME = "f_pipe";
    static final String G_PIPE_NAME = "g_pipe";

    public static void main(String[] args) throws IOException, InterruptedException {
        PipeManager.create(F_PIPE_NAME);
        PipeManager.create(G_PIPE_NAME);
        ProcessManager.run(F_CLASS, F_PIPE_NAME);
        ProcessManager.run(G_CLASS, G_PIPE_NAME);

        var x = enterX();

        var f_writer = PipeManager.writer(F_PIPE_NAME);
        var g_writer = PipeManager.writer(G_PIPE_NAME);
        f_writer.write(x+"");
        g_writer.write(x+"");
        f_writer.close();
        g_writer.close();

        var line = "";
        var f_reader = PipeManager.reader(F_PIPE_NAME);
        var g_reader = PipeManager.reader(G_PIPE_NAME);
        var f_result = 0f;
        var g_result = 0f;

        while ((line = f_reader.readLine()) != null) {
            f_result = Float.parseFloat(line);
        }
        while ((line = g_reader.readLine()) != null) {
            g_result = Float.parseFloat(line);
        }

        PipeManager.remove(F_PIPE_NAME);
        PipeManager.remove(G_PIPE_NAME);
        result(x, f_result, g_result);
    }

    public static float enterX() {
        var scanner = new Scanner(System.in);
        var result = 0f;
        var line = "";

        while (true) {
            System.out.print("Enter X: ");
            line = scanner.nextLine();
            try {
                result = Float.parseFloat(line);
                return result;
            } catch (Exception e) {
                System.out.println("Incorrect number!");
            }
        }
    }

    public static void result(float x, float f_r, float g_r) {
        var result = f_r + g_r;
        System.out.println("Input: " + x);
        System.out.println("F result: " + f_r);
        System.out.println("G result: " + g_r);
        System.out.println("RESULT: " + result);
    }
}
