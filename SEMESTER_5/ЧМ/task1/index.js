const
    EPS = 0.0001,
    MAX_ITERATION = 10000000,
    LAMBDA = 0.1,
    f = x => x * x * Math.log10(x) - 1,
    df = x => x + 2 * x * Math.log10(x)


function newtonMethod(x) {
    console.log(`Newton Method started(x = ${x})...`)
    let i = 0, prevX = x + 1

    while (i++ < MAX_ITERATION && Math.abs(prevX - x) >= EPS) {
        prevX = x
        x = x - f(x) / df(x)
        console.log(`x = ${x}`)
    }
    console.log('Newton Method ended')
    return x
}

function simpleIterationMethod(x) {
    console.log(`Simple Iteration Method started(x = ${x})...`)
    let i = 0, prevX = x + 1

    while (i++ < MAX_ITERATION && Math.abs(prevX - x) >= EPS) {
        prevX = x
        x = x - f(x) * LAMBDA
        console.log(`x = ${x}`)
    }
    console.log('Simple Iteration Method ended')
    return x
}

console.log(newtonMethod(5))
console.log(simpleIterationMethod(5))