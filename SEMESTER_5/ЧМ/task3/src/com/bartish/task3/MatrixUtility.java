package com.bartish.task3;

public class MatrixUtility {

    public static double[] minus(double[] matrixA, double[] matrixB) {
        double[] result = new double[matrixA.length];
        for (int i = 0; i < matrixA.length; i++) {
            result[i] = matrixA[i] - matrixB[i];
        }
        return result;
    }

    public static double[] multiplyMatrix(double[][] matrix, double[] vectorF) {
        int rows = vectorF.length;
        int columns = matrix[0].length;

        double[] result = new double[rows];
        for (int row = 0; row < rows; row++) {
            double sum = 0;
            for (int column = 0; column < columns; column++) {
                sum += matrix[row][column] * vectorF[column];
            }
            result[row] = sum;
        }
        return result;
    }

    public static double MatrixNorm(double[] matrix) {
        double max = 0.0;
        for (int i = 0; i < 2; i++) {
            if (Math.abs(matrix[i]) > max) {
                max = Math.abs(matrix[i]);
            }
        }
        return max;
    }

    public static double determinant(double[][] matrix) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    public static double[][] inverse(double[][] matrix) {
        double[][] inverse = new double[matrix.length][matrix.length];

        double det = 1.0 / determinant(matrix);
        inverse[0][0] = matrix[1][1] * det;
        inverse[1][1] = matrix[0][0] * det;
        inverse[1][0] = matrix[1][0] * det * -1;
        inverse[0][1] = matrix[0][1] * det * -1;
        return inverse;
    }

    public static void display(double[][] matrix) {
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++)
                System.out.printf("%.6f ", matrix[i][j]);
            System.out.println();
        }
    }

    public static double MatrixNorm(double[][] matrix) {
        double min = 0.0, sum;
        for (int i = 0; i < 2; i++) {
            sum = 0.0;
            for (int j = 0; j < 2; j++) {
                sum += Math.abs(matrix[i][j]);
            }
            if (sum < min) {
                min = sum;
            }
        }
        return min;
    }

    public static boolean compare(double[][] matrix) {
        double M = MatrixNorm(inverse(matrix));
        double delta = Math.abs(ModifiedNewton.curX(new double[]{1.25, 0}));
        double L =  Math.abs( Math.cos(1.25-0.6));
        if(M * M * L * delta <= 0.5){
            return true;
        }
        else {
            System.out.println("Failed test");
            return false;
        }
    }
}
