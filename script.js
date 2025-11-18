// alert('hellow');
let header = document.querySelector('.header-container');
let easyBtn = document.querySelector('.easyBtn');
let hardBtn = document.querySelector('.hardBtn');
let colorCodeQTSText = document.querySelector('.color-qts-code');
let bottomContainer = document.querySelector('.bottom-container');
let feedbackText = document.querySelector('#feedbackText');
let newColor = document.querySelector('.new-color');
let mainContainer = document.querySelector('.main-container');
let scoreText = document.querySelector('#scoreid');

let numbBox = 6;
let correctColor;
let numberofAttept = 0;
let scoreResult = '';

function colorGenerator() {
    let rr = Math.floor(Math.random() * 255);
    let gg = Math.floor(Math.random() * 255);
    let bb = Math.floor(Math.random() * 255);

    return `rgb(${rr}, ${gg}, ${bb})`;
}


function colorArrGenerator(number) {
    let randomColorArr = [];
    for (let i = 0; i < number; i++) {
        randomColorArr.push(colorGenerator());
    }
    return randomColorArr;
}

function getScore(num, mode) {
    if (mode === 'hard') {
        scoreResult = num <= 2 ? "Excelent!" : num > 2 && num <= 4 ? "Very Good!" : num == 5 ? "Good Try!" : "Try Again!";
    }
    else {
        scoreResult = num === 1 ? "Excelent!" : num === 2 ? "Very Good!" : "Try Again!";
    }
    scoreText.innerHTML = scoreResult === "Excelent!" ? "&#11088; &#11088; &#11088;" : scoreResult === "Very Good!" ? "&#11088; &#11088;" : scoreResult === "Good Try!" ? "&#11088;" : "&#128529; &#128529; &#128529;";
}


function validatingColor(selectedColor, correctColor, target) {
    console.log(++numberofAttept);
    if (selectedColor === correctColor) {
        document.querySelectorAll('.color-opt-box').forEach((e) => {
            e.style.backgroundColor = correctColor;
            e.style.opacity = 1;
            header.style.backgroundColor = correctColor;
            e.classList.add("no-click");
        });
        getScore(numberofAttept, easyBtn.classList == 'easyBtn selected' ? 'easy' : 'hard');
        feedbackText.textContent = scoreResult;
        numberofAttept = 0;
    }
    else {
        document.querySelectorAll('.color-opt-box').forEach((e) => {
            target.target.style.opacity = 0;
        });
        feedbackText.textContent = 'Try Again!';
    }
}

function colorGame(num) {
    console.log('function invoke')
    let colors = colorArrGenerator(num);
    console.log(colors);
    correctColor = colors[Math.floor(Math.random() * num)];
    console.log(correctColor);
    colorCodeQTSText.textContent = correctColor;
    colors.forEach((e) => {
        let colorOptDiv = document.createElement('div');
        bottomContainer.appendChild(colorOptDiv);
        colorOptDiv.className = 'color-opt-box';
        colorOptDiv.style.display = 'block';
        colorOptDiv.style.backgroundColor = e;

        colorOptDiv.addEventListener('click', (e) => {
            let clickColor = e.target.style.backgroundColor;
            validatingColor(clickColor, correctColor, e);
        })
    })
}

colorGame(numbBox);

function setUpGame(mode) {
    scoreText.innerHTML = "";
    header.style.backgroundColor = 'steelblue';
    easyBtn.classList.toggle('selected', mode === 'easy');
    hardBtn.classList.toggle('selected', mode === 'hard');
    feedbackText.textContent = 'Result Message';
    correctColor = '';
    numbBox = mode == 'easy' ? 3 : 6;
    let color = colorArrGenerator(numbBox);
    // console.log(color);
    let colorBox = document.querySelectorAll('.color-opt-box');
    colorBox.forEach((box, i) => {
        if (i < numbBox) {
            box.style.display = 'block';
            box.style.backgroundColor = color[i];
            box.style.opacity = 1;
            box.classList.remove("no-click");
        }
        else {
            box.style.display = 'none';
        }
    });
    correctColor = color[Math.floor(Math.random() * numbBox)];
    // console.log(correctColor);
    colorCodeQTSText.textContent = correctColor;
}


easyBtn.addEventListener('click', () => {
    setUpGame('easy');
});



hardBtn.addEventListener('click', () => {
    setUpGame('hard');
});


newColor.addEventListener('click', () => {
    let mode = '';
    mode = easyBtn.classList == 'easyBtn selected' ? 'easy' : 'hard';
    setUpGame(mode);
});


