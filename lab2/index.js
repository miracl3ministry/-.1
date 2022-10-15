"use strict";
import Solver from './solver.js';

/*
* Реализация лабораторной работы №2
* Осторожно дальше идет немного говнокода
* */

class HtmlInterface {
    // Класс для создания интерфейса на html и получения входных данных
    static instance;

    constructor() {
        if (HtmlInterface.instance) { // Проверяем существует ли данный класс в одном экземпляре
            return HtmlInterface.instance;
        }
        this.verticesCount = 0;
        this.edges = [];
        this.adjacencyMatrix = [];
        this.incidenceMatrix = [];

        this.Graph = Dracula.Graph;
        this.Renderer = Dracula.Renderer.Raphael;
        this.Layout = Dracula.Layout.Spring;
        this.g = new this.Graph();

        this.render = (r, n) => { // For custom elements
            // let label = r.text(0, 30, n.label).attr({ opacity: 0 });
            let set = r
                .set()
                .push(r.rect(n.point[0] - 30, n.point[1] - 13, 62, 86).attr({
                    fill: "#fa8",
                    "stroke-width": 2,
                    r: "9px"
                }))
                .push(r.text(n.point[0], n.point[1] + 30, n.label).attr({"font-size": "20px"}));
            console.log("set:", set);
            return set;
        };

        this.drawFirstScreen();
    }

    drawFirstScreen() {
        this.g.addEdge("1", "2");
        this.g.addEdge("1", "3");
        this.g.addEdge("3", "4");
        this.g.addEdge("3", "5");
        this.g.addEdge("4", "2");
        this.g.addEdge("5", "1");
        this.g.addEdge("5", "2");

        this.layouter = new this.Layout(this.g);
        this.layouter.layout();

        let width = document.getElementById("div").clientWidth;
        let height = 500;

        this.renderer = new this.Renderer("#div", this.g, width, height);
        this.renderer.draw();
    };

    // Вызывается при нажатии на кнопку "очистить"
    checkUpAndStart() {
        // Костыль, нету this
        if (htmlInterface.incidenceMatrix.length !== 0) {
            htmlInterface.verticesCount = htmlInterface.incidenceMatrix.length;
            htmlInterface.drawAdjacencyMatrix();
            htmlInterface.drawIncidenceMatrix();
        } else {
            htmlInterface.drawAdjacencyMatrix();
        }
    };

    addButtonListeners() {
        // Инпут с количеством вершин и создание инпутов для матрицы
        document.getElementById("verticesCount").addEventListener("change", (e) => {
            let count = e.target.valueAsNumber;
            this.verticesCount = count;
            if (count > 0 && count <= 20) {
                // создает пустой двумерный массив для матрицы смежностей
                this.adjacencyMatrix = [];
                for (let i = 0; i < count; i++) {
                    let row = [];
                    for (let j = 0; j < count; j++) row.push(0);
                    this.adjacencyMatrix.push(row);
                }
                // создает форму ввода матрицы
                e.target.style.outline = "none";
                this.createInputsForAdjacencyMatrix(count);
            } else {
                e.target.style.outline = "1px solid red";
            }
        });
        // Clear button
        document.getElementById("clear_btn").addEventListener("click", this.clear);
        // Draw vertices button
        document.getElementById("drawVertices_btn").addEventListener("click", this.checkUpAndStart);
        // For tests
        document.getElementById("output").addEventListener("click", this.output);
        document.getElementById("inputFromAlert").addEventListener("click", this.inputFromAlert);
    };

    drawGraphsIn(htmlElement) { // document.getElementById("div")
        this.layouter = new this.Layout(this.g);
        this.layouter.layout();

        let width = htmlElement.clientWidth;
        let height = 500;

        this.renderer = new this.Renderer(htmlElement, this.g, width, height);
        this.renderer.draw();
    };

    // Рисует сильно связанный подграф, в этой лабе не надо
    draw2() {
        console.log('draw2 func')
    };

    // Очищает графы и div
    clear() {
        // Костыль, из кнопок нет this
        document.getElementById("div").innerText = "";
        htmlInterface.g = new htmlInterface.Graph();
    };

    // Обновляет матрицу смежностей
    updateAdjacencyMatrix(e) {
        if (e.target.valueAsNumber > 0) e.target.valueAsNumber = 1;
        else e.target.valueAsNumber = 0;
        // Костыль, this хз куда показывает
        htmlInterface.adjacencyMatrix[e.target.dataset.i][e.target.dataset.j] = e.target.valueAsNumber;
        document.querySelector('.adjacencyMatrixOut').innerText = htmlInterface.arrayToString(htmlInterface.adjacencyMatrix);

        htmlInterface.checkUpAndStart();
        htmlInterface.createInputsForIncidenceMatrix();
    };

    // Создает массив со всеми гранями
    createInputsForIncidenceMatrix() {
        let edges = [],
            edgesStringArr = [];
        let adjacencyMatrix = this.adjacencyMatrix;
        this.edges.forEach((e) => {
            edges.push([e.from, e.to]);
            edgesStringArr.push([e.from, e.to].toString());
        });
        // добавляем инпуты для матрицы инцидентности и заполняем их
        let table = document.createElement("table");
        let tableHeader = document.createElement("tr");
        let th = document.createElement("th");
        this.incidenceMatrix = [];
        th.innerText = "i\\j";
        tableHeader.append(th);
        table.append(tableHeader);
        for (let j = 0; j < edges.length; j++) {
            let Jth = document.createElement("th");
            Jth.innerText = j + 1;
            tableHeader.append(Jth);
        }
        for (let i = 0; i < this.verticesCount; i++) {
            let tr = document.createElement("tr");
            let Ith = document.createElement("th");
            Ith.innerText = i + 1;
            tr.append(Ith);
            let incidenceMatrixRow = [];
            for (let j = 0; j < edges.length; j++) {
                let td = document.createElement("td");
                let input = document.createElement("input");
                if (edges[j][0] === i) {
                    input.classList.add("incidenceMatrix__input");
                    input.type = "number";
                    input.min = -1;
                    input.max = 1;
                    input.step = 2;
                    input.value = 1;
                    input.dataset.i = i;
                    input.dataset.j = j;
                    incidenceMatrixRow.push(1);
                } else if (edges[j][1] === i) {
                    input.classList.add("incidenceMatrix__input");
                    input.type = "number";
                    input.min = -1;
                    input.max = 1;
                    input.step = 2;
                    input.value = -1;
                    input.dataset.i = i;
                    input.dataset.j = j;
                    incidenceMatrixRow.push(-1);
                } else {
                    input.type = "number";
                    input.min = -1;
                    input.max = 1;
                    input.value = 0;
                    input.disabled = true;
                    incidenceMatrixRow.push(0);
                }
                input.addEventListener("change", this.updateIncidenceMatrix);
                td.append(input);
                tr.append(td);
            }
            this.incidenceMatrix.push(incidenceMatrixRow);
            table.append(tr);
        }
        document.getElementById("incidenceMatrix__inputs").innerText = "";
        document.getElementById("incidenceMatrix__inputs").append(table);
    };

    // Обновляет матрицу инцидентности
    updateIncidenceMatrix(e) {
        let elChangeValue = document.querySelectorAll(`.incidenceMatrix__input[data-j="${e.target.dataset.j}"]`);
        if (elChangeValue.length !== 2) throw new Error(".incidenceMatrix__input error");
        if (elChangeValue[0] === e.target) {
            if (e.target.valueAsNumber > 0) e.target.valueAsNumber = 1;
            else e.target.valueAsNumber = -1;
            let num = e.target.valueAsNumber;
            elChangeValue[1].valueAsNumber = num * -1;
            htmlInterface.incidenceMatrix[e.target.dataset.i][e.target.dataset.j] = num;
            htmlInterface.incidenceMatrix[elChangeValue[1].dataset.i][elChangeValue[1].dataset.j] = num * -1;
        } else {
            if (e.target.valueAsNumber > 0) e.target.valueAsNumber = 1;
            else e.target.valueAsNumber = -1;
            let num = e.target.valueAsNumber;
            elChangeValue[0].valueAsNumber = num * -1;
            htmlInterface.incidenceMatrix[e.target.dataset.i][e.target.dataset.j] = num;
            htmlInterface.incidenceMatrix[elChangeValue[0].dataset.i][elChangeValue[0].dataset.j] = -1;
        }

        document.querySelector(".incidenceMatrixOut").innerText = this.arrayToString(this.incidenceMatrix);
        htmlInterface.drawIncidenceMatrix();
    };

    // Рисует графы из матрицы смежностей
    drawAdjacencyMatrix() {
        this.edges = [];
        let adjacencyMatrix = this.adjacencyMatrix;
        if (adjacencyMatrix) {
            this.clear();
            // цикл по adjacencyMatrix
            for (let i = 0; i < adjacencyMatrix.length; i++) {
                let edges = [];
                for (let j = 0; j < adjacencyMatrix[i].length; j++) {
                    if (adjacencyMatrix[i][j]) {
                        this.edges.push({from: i, to: j});
                        edges.push(j);
                    }
                }
                // отрисовка граней и вершин
                if (edges.length === 0) {
                    this.g.addNode((i + 1).toString());
                } else {
                    edges.forEach((e) => {
                        this.g.addEdge((i + 1).toString(), (e + 1).toString());
                    });
                }
            }
            this.drawGraphsIn(document.getElementById("div"));
        } else console.error("adjacency matrix: ", adjacencyMatrix);
    };

    // Проверка направления графа по матрице инцидентности
    drawIncidenceMatrix() {
        let incidenceMatrix = this.incidenceMatrix;
        if (incidenceMatrix.length !== 0) {
            for (let i = 0; i < this.edges.length; i++) {
                const element = this.edges[i];
                if (incidenceMatrix[element.from][i] === -1) {
                    let tmp = element.from;
                    element.from = element.to;
                    element.to = tmp;
                }
            }
        } else console.error("incidence matrix: ", incidenceMatrix);
        // рисует графы из this.edges
        this.clear();
        let style = {};
        style["directed"] = true;
        style["font-size"] = "20px";
        style["fill-opacity"] = "1";
        // style["label-style"] = "background-color: #000";
        for (let i = 0; i < this.edges.length; i++) {
            let style = {};
            style["directed"] = true;
            style["font-size"] = "20px";
            style["fill-opacity"] = "1";
            style["label"] = (i + 1).toString();
            this.g.addEdge((this.edges[i].from + 1).toString(), (this.edges[i].to + 1).toString(), {
                // directed: true,
                style: style, // баг с пропадающими стрелками после добавления стиля
            });
        }
        this.drawGraphsIn(document.getElementById("div"));
    };

    // Добавляет инпуты для матрицы смежностей
    createInputsForAdjacencyMatrix(count) {
        let table = document.createElement("table");
        let tableHeader = document.createElement("tr");
        let th = document.createElement("th");
        th.innerText = "i\\j";
        tableHeader.append(th);
        table.append(tableHeader);
        for (let i = 0; i < count; i++) {
            let tr = document.createElement("tr");
            let Ith = document.createElement("th");
            let Jth = document.createElement("th");
            Ith.innerText = i + 1;
            Jth.innerText = i + 1;
            tableHeader.append(Jth);
            tr.append(Ith);
            for (let j = 0; j < count; j++) {
                let td = document.createElement("td");
                let input = document.createElement("input");
                input.classList.add("adjacencyMatrix__input");
                input.type = "number";
                input.min = 0;
                input.max = 1;
                input.value = 0;
                input.dataset.i = i;
                input.dataset.j = j;
                input.addEventListener("change", this.updateAdjacencyMatrix);
                td.append(input);
                tr.append(td);
            }
            table.append(tr);
        }
        document.getElementById("adjacencyMatrix__inputs").innerText = "";
        document.getElementById("adjacencyMatrix__inputs").append(table);
    };

    inputFromAlert() {
        let a = prompt("Введите матрицу в формате \n[...]\n[...]\n[...]"),
            arr = [];
        a = a.replace(/[\n ]/gi, "").replace(/\r/gi, ";").split(";");
        if (!Array.isArray(a)) throw new Error("input not array");
        else {
            a.forEach((e) => {
                let b = e.split(",");
                for (let i = 0; i < b.length; i++) {
                    b[i] = Number(b[i].replace(/[^0-9]/gi, ""));
                }
                arr.push(b);
            });
        }
        htmlInterface.adjacencyMatrix = arr;
        htmlInterface.incidenceMatrix = [];
        htmlInterface.edges = [];
        htmlInterface.checkUpAndStartFromInput();
    };

    checkUpAndStartFromInput() {
        if (this.adjacencyMatrix.length !== 0) {
            this.verticesCount = this.adjacencyMatrix.length;
            document.getElementById("verticesCount").valueAsNumber = this.verticesCount;
            this.clear();
            this.updateAdjacencyMatrixFromInput();
            this.createsIncidenceMatrix();
            this.createInputsForIncidenceMatrix();
            this.drawIncidenceMatrix();
        }
    };

    // Обновляет матрицу смежностей после текстового ввода
    updateAdjacencyMatrixFromInput() {
        this.createInputsForAdjacencyMatrix(this.adjacencyMatrix.length);
        let inputs = document.getElementById("adjacencyMatrix__inputs");
        let len = this.verticesCount;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                inputs.querySelector(`[data-i="${i}"][data-j="${j}"]`).valueAsNumber = this.adjacencyMatrix[i][j];
            }
        }
        document.querySelector(".adjacencyMatrixOut").innerText = this.arrayToString(this.adjacencyMatrix);
    };

    // Создает массив матрицы инциденций
    createsIncidenceMatrix() {
        let adjacencyMatrix = this.adjacencyMatrix;
        for (let i = 0; i < adjacencyMatrix.length; i++) {
            for (let j = 0; j < adjacencyMatrix[i].length; j++) {
                if (adjacencyMatrix[i][j]) {
                    this.edges.push({from: i, to: j});
                }
            }
        }
        let edges = [], edgesStringArr = [];
        this.edges.forEach((e) => {
            edges.push([e.from, e.to]);
            edgesStringArr.push([e.from, e.to].toString());
        });
        this.incidenceMatrix = [];
        for (let i = 0; i < this.verticesCount; i++) {
            let incidenceMatrixRow = [];
            for (let j = 0; j < edges.length; j++) {
                if (edges[j][0] === i) {
                    incidenceMatrixRow.push(1);
                } else if (edges[j][1] === i) {
                    incidenceMatrixRow.push(-1);
                } else {
                    incidenceMatrixRow.push(0);
                }
            }
            this.incidenceMatrix.push(incidenceMatrixRow);
        }
    };

    output() {
        let adjacencyMatrix = htmlInterface.adjacencyMatrix;
        console.log(adjacencyMatrix);
        if (adjacencyMatrix.length > 2) {
            // Achtung, attention, внимание: все отсчеты и индексы начинаются с 0!
            let answer = Solver.solve(adjacencyMatrix);
            console.log('output', answer);

            let str = 'Матрицы смежностей А\n';
            for (let i = 0; i < answer['aInDegree'].length; i++) {
                str += `A^${i} \n${htmlInterface.arrayToString(answer['aInDegree'][i])}`
            }
            document.querySelector(".out1").innerText = str;
        }
    };

    arrayToString(arr) {
        let str = "";
        for (let i = 0; i < arr.length; i++) {
            str += "[" + arr[i].toString() + "]" + "\n";
        }
        return str;
    };

    log() {
        console.log(this);
        console.log(HtmlInterface.instance)
    }
}

let htmlInterface = new HtmlInterface();
htmlInterface.addButtonListeners()