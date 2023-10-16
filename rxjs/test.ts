function sumSquare(size: number) {
    let sum = 0;
    for (let i = 0; i < Math.max(100, size); i++) {
        sum += i * i
    }
    return sum
}

function cubeOneOfThird(no: number) {
    return no*no*no*(1/3)
}

let no=200;
console.log(sumSquare(no))
console.log(cubeOneOfThird(no))