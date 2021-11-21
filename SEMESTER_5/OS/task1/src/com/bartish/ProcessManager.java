package com.bartish;

import java.io.File;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

public final class ProcessManager {
    private ProcessManager() {}

    public static Process runSync(Class klass, String... args) throws IOException, InterruptedException {
        var process = run(klass, args);
        process.waitFor();
        return process;
    }

    public static Process run(Class klass, String... args) throws IOException {
        var builder = create(klass, args);
//        return builder.start();
        return builder.inheritIO().start(); // to watch logs
    }

    public static ProcessBuilder create(Class klass, String... args) {
        var javaHome = System.getProperty("java.home");
        var javaBin = javaHome + File.separator + "bin" + File.separator + "java";
        var classpath = System.getProperty("java.class.path");
        var className = klass.getName();

        var command = new LinkedList<String>();
        command.add(javaBin);
        command.add("-cp");
        command.add(classpath);
        command.add(className);
        if (args != null) command.addAll(List.of(args));

        return new ProcessBuilder(command);
    }
}