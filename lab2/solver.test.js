let solver = require('./solver.js');

describe('Умножение матриц', () => {
    test('Умножение матриц 1', () => {
        let matrix1 = [
                [1, 0, 2, -1],
                [-2, 0, -4, 2],
                [1, 0, 2, -1],
                [3, 0, 6, -3]
            ],
            matrix2 = [
                [2, 1, 3, -1],
                [-4, -2, -6, 2],
                [2, 1, 3, -1],
                [6, 3, 9, -3]
            ],
            result = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        expect(solver.matrixMultiplication(matrix1, matrix2)).toEqual(result);
    })
    test('Умножение матриц 2', () => {
        let matrix1 = [
                [3, 4, 2, 5],
                [0, -1, 3, 2],
                [1, 2, 3, 0],
            ],
            matrix2 = [
                [1, 2, 3],
                [-3, 5, 4],
                [6, 2, 1],
                [1, -1, 0]
            ],
            result = [
                [8, 25, 27],
                [23, -1, -1],
                [13, 18, 14]
            ]
        expect(solver.matrixMultiplication(matrix1, matrix2)).toEqual(result);
    })
    test('Умножение матриц 3', () => {
        let matrix1 = [
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            matrix2 = [
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
            ];
        expect(solver.matrixMultiplication(matrix1, matrix2)).toBeFalsy();
    })
})
test('Полное сравенение объектов', () => {
    expect(solver.equals({}, {'a': 1})).toBeFalsy();
    expect(solver.equals({'a': 1}, {'a': 1})).toBeTruthy();
    expect(solver.equals([], [])).toBeTruthy();
    expect(solver.equals(['1', '2', '3'], [1, 2, 3])).toBeFalsy();
})

test('Матрицы смежности', () => {
    let adjacencyMatrix = [
            [0, 0, 1, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0]
        ],
        result = [
            [
                [0, 0, 1, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 1, 2],
                [0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 1],
                [0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ]
        ]
    expect(solver.getAllAInDegree(adjacencyMatrix)).toEqual(result);
})