const settings = document.getElementById('settings');
const gameContainer = document.getElementById('game-container');
const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('color-picker');
const tools = document.getElementById('tools');
const redInput = document.getElementById('red');
const greenInput = document.getElementById('green');
const blueInput = document.getElementById('blue');
const colorPreview = document.getElementById('color-preview');
let rows, cols;
let selectedColor = { red: 0, green: 0, blue: 0 };
let eraserEnabled = false;

function startGame() {
    rows = parseInt(document.getElementById('rows').value);
    cols = parseInt(document.getElementById('cols').value);

    const message = document.getElementById('message');
    message.textContent = '开始涂格子吧！';
    
    // 清空画布
    canvas.innerHTML = '';

    // 创建格子
    createGrid(rows, cols);

    // 设置颜色选择器
    createColorPicker();

    // 显示游戏容器
    settings.style.display = 'none';
    gameContainer.style.display = 'flex';
}

function createGrid(rows, cols) {
    canvas.style.gridTemplateRows = `repeat(${rows}, 40px)`;
    canvas.style.gridTemplateColumns = `repeat(${cols}, 40px)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', paintCell);
            canvas.appendChild(cell);
        }
    }
}

function resetRGB() {
    redInput.value = '0';
    greenInput.value = '0';
    blueInput.value = '0';
    updateColorPreview();
}

function createColorPicker() {
    colorPicker.addEventListener('input', updateColor);
}

function updateColorPreview() {
    const previewColor = `rgb(${parseInt(redInput.value)}, ${parseInt(greenInput.value)}, ${parseInt(blueInput.value)})`;
    colorPreview.style.backgroundColor = previewColor;
}

function updateColor() {
    selectedColor = {
        red: parseInt(redInput.value),
        green: parseInt(greenInput.value),
        blue: parseInt(blueInput.value)
    };

    if (eraserEnabled) {
        eraserEnabled = false;
        document.getElementById('eraser').classList.remove('active');
    }
}

function paintCell() {
    if (eraserEnabled) {
        this.style.backgroundColor = '';
    } else {
        this.style.backgroundColor = `rgb(${selectedColor.red}, ${selectedColor.green}, ${selectedColor.blue})`;
    }
}

function clearCanvas() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    });

    if (eraserEnabled) {
        eraserEnabled = false;
        document.getElementById('eraser').classList.remove('active');
    }
}

function enableEraser() {
    eraserEnabled = true;
    document.getElementById('eraser').classList.add('active');
}

// 在脚本的顶部或其他地方定义一个返回开始界面的函数
function returnToStart() {
    // 隐藏游戏容器，显示设置界面
    settings.style.display = 'flex';
    gameContainer.style.display = 'none';
}

// 初始化
updateColor();
