package com.bartish.task3;

import java.util.Scanner;

public class ModifiedNewton {
    public static void main(String[] args) {
        double eps;
        System.out.println("""
                System:
                sin(x-0.6)-y=1.6
                3x-cos(y)=0.9
                """);
        do {
            System.out.println("Enter eps:");
            Scanner scanner = new Scanner(System.in);
            eps = scanner.nextDouble();
        } while (eps > 1 || eps < 0);
        int iter = 0;
        double[] x = {1.25, 0.0};
        double[][] A = new double[2][2];
        A[0][0] = derX1(x[0]);
        A[0][1] = derY1();
        A[1][0] = derX2();
        A[1][1] = derY2(x[1]);
        System.out.println("matrix А");
        if (MatrixUtility.MatrixNorm(A) > 1) {
            System.out.println("Matrix does not match");
            return;
        }
        if (MatrixUtility.determinant(A) == 0) {
            System.out.println("Matrix is degenerate");
            return;
        }
        MatrixUtility.display(A);
        double[][] inverseA = MatrixUtility.inverse(A);
        System.out.println("Inverse matrix");
        MatrixUtility.display(inverseA);
        double[] prevX, curX = x;
        if (!MatrixUtility.compare(A)) {
            return;
        }
        do {
            iter++;
            prevX = curX;
            double[] F = {curX(prevX), curY(prevX)};
            double[] vector = MatrixUtility.multiplyMatrix(inverseA, F);
            curX = MatrixUtility.minus(prevX, vector);
        } while (MatrixUtility.MatrixNorm(MatrixUtility.minus(curX, prevX)) > eps);

        System.out.println("Result meanings:\n" + "x: " + curX[0] + " y: " + curX[1]);
        System.out.println("number of iterations: " + iter);
    }

    public static double curX(double[] x) {
        return Math.sin(x[0] - 0.6) - x[1] - 1.6;
    }

    public static double curY(double[] x) {
        return 3 * x[0] - Math.cos(x[1]) - 0.9;
    }

    public static double derX1(double x) {
        return Math.cos(x - 0.6);
    }

    public static double derY1() {
        return -1.0;
    }

    public static double derX2() {
        return 3.0;
    }

    public static double derY2(double y) {
        return Math.sin(y);
    }

}
