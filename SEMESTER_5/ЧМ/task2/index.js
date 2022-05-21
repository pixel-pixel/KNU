

let
  MAX_ITERATION = 10000000,
  A = [
        [3, 1, 0, 0],
        [2, 3, 1, 0],
        [0, 2, 3, 1],
        [0, 0, 2, 3],
    ],
    B = [1, 2, 3, 4]

function progonkaMethod(a, b, x = []) {
    const len = b.length

    function tridiagonalSolve(a, c, b, d, x) {
        let m
        for (let i = 1; i < len; i++) {
            m = a[i]/c[i-1];
            c[i] = c[i] - m*b[i-1];
            d[i] = d[i] - m*d[i-1];
        }

        x[len-1] = d[len-1]/c[len-1];

        for (let i = len - 2; i >= 0; i--)
            x[i]=(d[i]-b[i]*x[i+1])/c[i];

        return x
    }

    const diagonalA = [], diagonalB = [], diagonalC = []
    a.forEach((_, i) => {
        diagonalA.push(i > 0 ? a[i - 1][i] : 0)
        diagonalB.push(a[i][i])
        if (i !== a.length-1) diagonalC.push(a[i + 1][i])
    })

    return tridiagonalSolve(diagonalA, diagonalB, diagonalC, b, x)
}

console.log("enter EPSILON:")
console.log(progonkaMethod(A, B))
