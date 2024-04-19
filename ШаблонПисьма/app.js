// Главные элементы редактора
let letter = document.getElementById("letter");
let settings = document.getElementById("settings");
let mainTable = document.getElementById("mainTable");

// Элементы настройки фотографий
let updateImageBlock = document.getElementById('updateImageBlock');
let updateImageInput = document.getElementById('updateImageInput');
let displayImage = document.getElementById('displayImage');

// Элементы настройки Fill текста
let updateTextOpacityInput = document.getElementById("updateTextOpacityInput");
let updateTextColor = document.getElementById("updateTextColor");
let updateTextColorTag = document.getElementById("updateTextColorTag");
let updateTextBlock = document.getElementById("updateTextBlock");

// Элементы настройки Шрифта
let fontSizeInput = document.getElementById("fontSizeInput");
let fontWeightInput = document.getElementById("fontWeightInput");
let fontFamilyInput = document.getElementById("fontFamilyInput");

// Элементы настройки Fill блока
let updateBackgroundColor = document.getElementById("updateBackgroundColor");
let updateBackgroundTag = document.getElementById("updateBackgroundTag");
let updateBackgroundColorBlock = document.getElementById("updateBackgroundColorBlock");

// Элементы настройки Weight текста
let fontWeightBold = document.getElementById("fontWeightBold");
let fontWeightItalic = document.getElementById("fontWeightItalic");
let fontWeightLined = document.getElementById("fontWeightLined");

// Вспомогательные переменные для редактирования текста 
let mainInputText = document.getElementById("mainInputText");
let currentObject;
let currentTypeTemplate; // новое
let editingText = false;
let editingImage = false;
let editingBlock = false;

// Новое! Элементы для левой части редактора
let choseMenu = document.getElementById("choseMenu");
let headerTypeTemplateBlock = document.getElementById("headerTypeTemplateBlock");
let templatesBlockBuff = document.getElementById("templatesBlockBuff");
let moveMode = false;

let removeTemplate = document.getElementById("removeTemplateBlock");
let dragTemplate = document.getElementById("dragTemplateBlock");
let mainTemplates = document.getElementById("main");


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(rgbString) {
    console.log(rgbString);
    let [r, g, b] = rgbString.match(/\d+/g).map(Number);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function stopEditText() {
    editingText = false;

    if (!mainInputText.value) {
        currentObject.textContent = "...";
    }
    else {
        currentObject.textContent = mainInputText.value;
    }
    currentObject.classList.remove("dissable");
    updateTextBlock.classList.add("dissable");
    mainInputText.remove();
}

function stopEditImage() {
    editingImage = false;
    currentObject.style.outline = '';

    updateImageBlock.classList.add("dissable");
}

function stopEditBlock() {
    editingBlock = false;
    currentObject.style.outline = '';

    updateBackgroundColorBlock.classList.add("dissable");
}

letter.addEventListener('click', e => {
    let object = e.target;
    
    if ((object.tagName === "SPAN" || object.tagName === "P") && !object.classList.contains("mainInputText") && letter.contains(object)) {
        if (editingText) {
            stopEditText();
        }

        // Чтобы появился блок редактирования текста
        updateTextBlock.classList.remove("dissable");

        currentObject = object;

        // Настраиваем input
        mainInputText.value = object.textContent;
        mainInputText.classList = "";

        currentObject.classList.forEach(element => {
            mainInputText.classList.add(element);
        });

        mainInputText.classList.add("mainInputText");
        mainInputText.setAttribute("style", "color:black");
        mainInputText.style.fontSize = currentObject.style.fontSize;

        if (object.parentElement.tagName === "A") {
            object.parentElement.before(mainInputText);
        }
        else {
            object.before(mainInputText);
        }
        
        mainInputText.focus();
        currentObject.classList.add("dissable");

        // Настраиваем смену цвета
        if (currentObject.style.color) {
            updateTextColor.value = rgbToHex(currentObject.style.color);
        }
        else {
            updateTextColor.value = "#000000";
        }
        
        updateTextColorTag.value = updateTextColor.value;
        if (currentObject.style.opacity === "") {
            currentObject.style.opacity = 1;
        }
        updateTextOpacityInput.value = currentObject.style.opacity;
        updateTextOpacityInput.value = currentObject.style.opacity * 100 + "%";
        mainInputText.style.opacity = currentObject.style.opacity;

        
        // Настраиваем семью шрифта
        if (currentObject.style.fontFamily === "") {
            currentObject.style.fontFamily = "Arial, Helvetica, sans-serif";
        }
        fontFamilyInput.value = currentObject.style.fontFamily;
        mainInputText.style.fontFamily = currentObject.style.fontFamily;

        // Настраиваем размер шрифта
        fontSizeInput.value = currentObject.style.fontSize;
        
        //  Настраиваем жирность текста
        if (currentObject.style.fontWeight == "bold") {
            fontWeightBold.checked = true;
            mainInputText.style.fontWeight = "bold";
        }
        else {
            fontWeightBold.checked = false;
            mainInputText.style.fontWeight = "normal";
        }

        //  Настраиваем курсив текста
        if (currentObject.style.fontStyle == "italic") {
            fontWeightItalic.checked = true;
            mainInputText.style.fontStyle = "italic";
        }
        else {
            fontWeightItalic.checked = false;
            mainInputText.style.fontStyle = "normal";
        }

        //  Настраиваем подчеркивание текста
        if (currentObject.style.textDecoration == "underline") {
            fontWeightLined.checked = true;
            mainInputText.style.textDecoration = "underline";
        }
        else {
            fontWeightLined.checked = false;
            mainInputText.style.textDecoration = "none";
        }

        //  Настраиваем межстрочное растояние

        

        editingText = true;

    }
    else if (object.tagName === "IMG" && letter.contains(object)) {
        currentObject = object;
        editingImage = true;

        updateImageBlock.classList.remove("dissable");
        let bufBorder = currentObject.style.border;
        currentObject.style.outline = "4px solid orange";
        displayImage.src = currentObject.src;

        updateImageInput.addEventListener('change', (e)=>{
            let currFiles = e.target.files;
            if(currFiles.length > 0){
                let src = URL.createObjectURL(currFiles[0]);
                currentObject.src = src;
                displayImage.src = src;
            }
        });
    }
    else if (object.tagName === "TD" && mainTable.contains(object)) {
        editingBlock = true;

        currentObject = object;
        currentObject.style.outline = "4px solid orange";

        updateBackgroundColorBlock.classList.remove("dissable");

        if (currentObject.getAttribute("bgcolor")) {
            if (currentObject.getAttribute("bgcolor")[0] === "#") {
                updateBackgroundColor.value = currentObject.getAttribute("bgcolor");
            }
            else {
                updateBackgroundColor.value = rgbToHex(currentObject.getAttribute("bgcolor"));
            }
        }
        else {
            updateBackgroundColor.value = "#ffffff";
        }
        updateBackgroundColorTag.value = updateBackgroundColor.value;
    }
});

document.addEventListener("click", e => {
    if (editingText && !settings.contains(e.target) && e.target !== mainInputText) {
        stopEditText(); 
    }
    else if (editingImage && !settings.contains(e.target) && e.target !== currentObject) {
        stopEditImage();
    }
    else if (editingBlock && !settings.contains(e.target) && e.target !== currentObject) {
        stopEditBlock();
    }
        
    // новое
    if (!choseMenu.classList.contains("dissable") && !templatesBlockBuff.contains(e.target) && !choseMenu.contains(e.target)) {
        choseMenu.classList.add("dissable");
    }
}, {capture: true});


mainInputText.addEventListener('keydown', e => {
    if (editingText && e.key === 'Enter') {
        stopEditText();
    }
});

// Фиксировать изменения

mainInputText.addEventListener("change", e => {
    if (editingText) {
        stopEditText();
    }
});


fontSizeInput.addEventListener("change", e => {
    currentObject.style.fontSize = fontSizeInput.value;
    mainInputText.style.fontSize = fontSizeInput.value;
});

fontFamilyInput.addEventListener("change", e => {
    currentObject.style.fontFamily = fontFamilyInput.value;
    mainInputText.style.fontFamily = fontFamilyInput.value;
});

updateTextColor.addEventListener("change", e => {
    currentObject.style.color = updateTextColor.value;
    updateTextColorTag.value = updateTextColor.value;
    mainInputText.style.color = updateTextColor.value;
});

updateTextColor.addEventListener("change", e => {
    currentObject.style.color = updateTextColor.value;
    updateTextColorTag.value = updateTextColor.value;
    mainInputText.style.color = updateTextColor.value;
});

fontWeightBold.addEventListener('change', e => {
    if (fontWeightBold.checked) {
        currentObject.style.fontWeight = "bold";
        fontWeightBold.parentElement.style.backgroundColor = "#adadad";
        mainInputText.style.fontWeight = "bold";
    }
    else {
        currentObject.style.fontWeight = "normal";
        fontWeightBold.parentElement.style.backgroundColor = "#D9D9D9";
        mainInputText.style.fontWeight = "normal";
    }
});

fontWeightItalic.addEventListener('change', e => {
    if (fontWeightItalic.checked) {
        currentObject.style.fontStyle = "italic";
        fontWeightItalic.parentElement.style.backgroundColor = "#adadad";
        mainInputText.style.fontStyle = "italic";
    }
    else {
        currentObject.style.fontStyle = "normal";
        fontWeightItalic.parentElement.style.backgroundColor = "#D9D9D9";
        mainInputText.style.fontStyle = "normal";
    }
});

fontWeightLined.addEventListener('change', e => {
    if (fontWeightLined.checked) {
        currentObject.style.textDecoration = "underline";
        fontWeightLined.parentElement.style.backgroundColor = "#adadad";
        mainInputText.style.textDecoration = "underline";
    }
    else {
        currentObject.style.textDecoration = "none";
        fontWeightLined.parentElement.style.backgroundColor = "#D9D9D9";
        mainInputText.style.textDecoration = "none";
    }
});

updateTextColorTag.addEventListener('change', e => {
    if (updateTextColorTag.value[0] === '#') {
        currentObject.style.color = updateTextColorTag.value;
        updateTextColor.value = updateTextColorTag.value;
        mainInputText.style.color = updateTextColorTag.value;
    }
});

updateTextOpacityInput.addEventListener('change', e => {
    currentObject.style.opacity = updateTextOpacityInput.value;
    mainInputText.style.opacity = updateTextOpacityInput.value;
});

updateBackgroundColor.addEventListener("change", e => {
    currentObject.setAttribute("bgcolor", updateBackgroundColor.value);
    updateBackgroundColorTag.value = updateBackgroundColor.value;
});

updateBackgroundColorTag.addEventListener('change', e => {
    if (updateTextColorTag.value[0] === '#') {
        currentObject.bgcolor = updateBackgroundColorTag.value;
        updateBackgroundColor.value = updateBackgroundColorTag.value;
    }
});

// Новое

templatesBlockBuff.addEventListener('click', e => {
    if (currentTypeTemplate === e.target.closest(".typeTemplateBlock")) {
        choseMenu.classList.toggle("dissable");
    }
    else {
        currentTypeTemplate = e.target.closest(".typeTemplateBlock");
        choseMenu.classList.remove("dissable");
    }
});

dragTemplate.addEventListener("click", e => {
    let dragElements = mainTemplates.querySelectorAll(".template");

    if (moveMode) {
        moveMode = false;
        e.target.classList.remove("pressed");

        for (let i = 0; i < dragElements.length; i++) {
            dragElements[i].draggable = false;
        }

        mainTemplates.removeEventListener(`dragover`, handlerMoveTemplate);
    }
    else {
        moveMode = true;
        e.target.classList.add("pressed");

        for (let i = 0; i < dragElements.length; i++) {
            dragElements[i].draggable = true;
        }

        mainTemplates.addEventListener(`dragover`, handlerMoveTemplate);
    }
});

mainTemplates.addEventListener(`dragstart`, e => {
    let object = e.target.closest(".template");

    if (object.draggable === true) {
        object.classList.add(`selected`);
    }
    
});
  
mainTemplates.addEventListener(`dragend`, e => {
    let object = e.target.closest(".template");

    object.classList.remove(`selected`);
});
  
let getNextElement = (cursorPosition, currentElement) => {
    let currentElementCoord = currentElement.getBoundingClientRect();
    let currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
    
    let nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;
    
    return nextElement;
};
  
function handlerMoveTemplate(e) {
    e.preventDefault();
    
    let activeElement = mainTemplates.querySelector(`.selected`);
    let currentElement = e.target.closest(".template");

    let isMoveable = activeElement !== currentElement; // && currentElement.classList.contains(`template`);
      
    if (!isMoveable) {
        return;
    }
    
    let nextElement = getNextElement(e.clientY, currentElement);

    if (!nextElement) {
        nextElement = mainTemplates.lastChild;
        nextElement.after(activeElement);
    }
    else {
        nextElement.before(activeElement);
    }
}
