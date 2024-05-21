// Главные элементы редактора
let letter = document.getElementById("letter");
let settings = document.getElementById("settings");


// Элементы настройки фотографий
let updateImageBlock = document.getElementById('updateImageBlock');
let updateImageInput = document.getElementById('updateImageInput');
let displayImage = document.getElementById('displayImage');
let displayImageOpacity = document.getElementById('displayImageOpacity');
let updateImageOpacityInput = document.getElementById('updateImageOpacityInput');
let updateImageWidthInput = document.getElementById('updateImageWidthInput');
let updateImageHeightInput = document.getElementById('updateImageHeightInput');
let path = document.getElementById('path');
let updateImagePaddingLeftInput = document.getElementById('updateImagePaddingLeftInput');
let updateImagePaddingRightInput = document.getElementById('updateImagePaddingRightInput');

// Элементы настройки Fill текста
let updateTextOpacityInput = document.getElementById("updateTextOpacityInput");
let updateTextColor = document.getElementById("updateTextColor");
let updateTextColorTag = document.getElementById("updateTextColorTag");
let updateTextBlock = document.getElementById("updateTextBlock");

// Элементы настройки Шрифта
let fontSizeInput = document.getElementById("fontSizeInput");
let fontWeightInput = document.getElementById("fontWeightInput");
let fontFamilyInput = document.getElementById("fontFamilyInput");
let lineHeightInput = document.getElementById("lineHeightInput");
let letterSpacingInput = document.getElementById("letterSpacingInput");

// Элементы настройки Fill блока
let updateBackgroundColor = document.getElementById("updateBackgroundColor");
let updateBackgroundTag = document.getElementById("updateBackgroundTag");

// Элементы настройки align блока
let updateBlockBlock = document.getElementById("updateBlockBlock");
let updateBlockPaddingTopInput = document.getElementById("updateBlockPaddingTopInput");
let updateBlockPaddingBotInput = document.getElementById("updateBlockPaddingBotInput");

// Элементы настройки Weight текста
let fontWeightBold = document.getElementById("fontWeightBold");
let fontWeightItalic = document.getElementById("fontWeightItalic");
let fontWeightLined = document.getElementById("fontWeightLined");

// Элементы настройки align текста
let alignments = document.querySelector("alignments");
let textAlignmentLeft = document.getElementById("textAlignmentLeft");
let textAlignmentCenter = document.getElementById("textAlignmentCenter");
let textAlignmentRight = document.getElementById("textAlignmentRight");

// Вспомогательные переменные для редактирования текста 
let mainInputText = document.getElementById("mainInputText");
let currentObject;
let currentTypeTemplate;
let editingText = false;
let editingImage = false;
let editingBlock = false;

let choseMenu = document.getElementById("choseMenu");

let templatesBlockBuff = document.getElementById("templatesBlockBuff");
let moveMode = false;
let mainTableBlock = document.getElementsByClassName("mainTable");
let removeTemplate = document.getElementById("removeTemplateBlock");

let textAlignmentLeftBlock = document.getElementsByClassName('textAlignmentLeftBlock')[0];
let textAlignmentCenterBlock = document.getElementsByClassName('textAlignmentCenterBlock')[0];
let textAlignmentRightBlock = document.getElementsByClassName('textAlignmentRightBlock')[0];


function rgbToHex(rgbString) {
    const [r, g, b] = rgbString.match(/\d+/g).map(Number);
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function stopEditText() {
    editingText = false;

    let a = mainInputText.value;

    if (!mainInputText.textContent) {
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

    updateBlockBlock.classList.add("dissable");
}

letter.addEventListener('click', e => {
    let object = e.target;

    let removeTemplateButtonMain = document.getElementById("removeTemplateButton");
    let dragTemplateButtonMain = document.getElementById("dragTemplateButton");

    if (removeTemplateButtonMain.classList.contains("pressed") || dragTemplateButtonMain.classList.contains("pressed")) {
        return;
    }
    
    if ((object.tagName === "SPAN" || object.tagName === "P") && !object.classList.contains("mainInputText") && letter.contains(object)) {
        if (editingText) {
            stopEditText();
        }

        // Чтобы появился блок редактирования текста
        updateTextBlock.classList.remove("dissable");

        currentObject = object;

        // Настраиваем input
        mainInputText.textContent = currentObject.textContent;
        mainInputText.value = currentObject.textContent;
        mainInputText.classList = "";

        currentObject.classList.forEach(element => {
            mainInputText.classList.add(element);
        });

        mainInputText.classList.add("mainInputText");

        let a = currentObject.offsetWidth;
        let curWidth, curHeight;

        curWidth = String(currentObject.offsetWidth + 10) + 'px';
        curHeight = String(currentObject.offsetHeight + 10) + 'px';

        mainInputText.setAttribute("style","display:block; width:" + curWidth + "; height: " + curHeight +  "; color:black");
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
            if (currentObject.style.color[0] === '#') {
                updateTextColor.value = currentObject.style.color;
            }
            else {
                updateTextColor.value = rgbToHex(currentObject.style.color);
            }
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
        if (!currentObject.style.fontSize) {
            fontSizeInput.value = "16";
        }
        else {
            fontSizeInput.value = (currentObject.style.fontSize).slice(0, -2);
        }
        

        // Настраиваем межстрочный интервал
        if (!currentObject.style.lineHeight) {
            lineHeightInput.value = '120';
        }
        else {
            lineHeightInput.value = currentObject.style.lineHeight.slice(0, -1);
        }
        

        // Настраиваем межбуквенный интервал
        if (!currentObject.style.letterSpacing) {
            letterSpacingInput.value = '0';
        }
        else {
            letterSpacingInput.value = currentObject.style.letterSpacing.slice(0, -2);
        }   
        
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

        // Настраиваем выравнивание текста
        if (currentObject.style.textAlign == "left") {
            textAlignmentLeft.checked = true;
            mainInputText.style.textAlign = "left";
        }
        else if (currentObject.style.textAlign == "center") {
            textAlignmentCenter.checked = true;
            mainInputText.style.textAlign = "center";
        }
        else if (currentObject.style.textAlign == "right") {
            textAlignmentRight.checked = true;
            mainInputText.style.textAlign = "right";
        }

        editingText = true;
    }  
    else if (object.tagName === "IMG" && letter.contains(object)) {
        currentObject = object;
        editingImage = true;

        path.classList.remove("good");
        path.classList.remove("error");

        updateImageBlock.classList.remove("dissable");
        let bufBorder = currentObject.style.border;
        currentObject.style.outline = "4px dashed #A2D933";

        updateImageOpacityInput.value = updateImageOpacityInput.value;
        if (currentObject.style.opacity === "") {
            currentObject.style.opacity = 1;
        }
        //updateImageOpacityInput.value = currentObject.style.opacity;
        updateImageOpacityInput.value = currentObject.style.opacity * 100 + "%";
        displayImageOpacity.style.opacity = currentObject.style.opacity;
        
        updateImageWidthInput.value = currentObject.offsetWidth;
        updateImageHeightInput.value = currentObject.offsetHeight;  

        if (currentObject.src != "https://tatarstan-symphony.com/images/noimage.jpg") {
            path.value = currentObject.src;
        }
        else {
            path.value = "";
        }
        
        displayImage.src = currentObject.src;
        displayImageOpacity.src = currentObject.src;
        
        parentTd = currentObject.parentElement;
        while(parentTd && parentTd.tagName != "TD"){
            parentTd = parentTd.parentElement;
        }
        //updateImagePaddingLeftInput.value = parentTd.tagName;

        if (parentTd.style.paddingLeft) {
            updateImagePaddingLeftInput.value = parentTd.style.paddingLeft.slice(0, -2);
        }
        else {
            updateImagePaddingLeftInput.value = '0';
        }
        if (parentTd.style.paddingRight) {
            updateImagePaddingRightInput.value = parentTd.style.paddingRight.slice(0, -2);
        }
        else {
            updateImagePaddingRightInput.value = '0';
        }
        

        path.addEventListener('change', e => {
            currentObject.src = path.value;
        });

        currentObject.onerror = function() {
            path.classList.add("error");
            currentObject.src = "https://tatarstan-symphony.com/images/noimage.jpg";
        };

        currentObject.onload = function() {
            path.classList.add("good");
        };
        
    }
    else if (object.tagName === "TD" && mainTableBlock[0].contains(object)) {
        editingBlock = true;

        currentObject = object;
        currentObject.style.outline = "4px dashed #A2D933";

        updateBlockBlock.classList.remove("dissable");

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


        let parentTemplate = currentObject.closest('.template');
        let firstTd = parentTemplate.getElementsByTagName('td');

        if (firstTd[0].style.paddingTop) {
            updateBlockPaddingTopInput.value = firstTd[0].style.paddingTop.slice(0, -2);
        }
        else {
            updateBlockPaddingTopInput.value = '0';
        }
        if (firstTd[firstTd.length - 1].style.paddingBottom) {
            updateBlockPaddingBotInput.value = firstTd[firstTd.length - 1].style.paddingBottom.slice(0, -2);
        }
        else {
            updateBlockPaddingBotInput.value = '0';
        }
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

    if (!choseMenu.classList.contains("dissable") && !templatesBlockBuff.contains(e.target) && !choseMenu.contains(e.target)) {
        choseMenu.classList.add("dissable");
        if (currentTypeTemplate) {
            currentTypeTemplate.classList.remove('menuNow');
        }
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

fontFamilyInput.addEventListener("change", e => {
    currentObject.style.fontFamily = fontFamilyInput.value;
    mainInputText.style.fontFamily = fontFamilyInput.value;
});

fontSizeInput.addEventListener("change", e => {
    if (parseInt(fontSizeInput.value.match(/\d+/)) > 46) {
        currentObject.style.fontSize = "46px";
        mainInputText.style.fontSize = "46px";
    }
    else {
        currentObject.style.fontSize = fontSizeInput.value + 'px';
        mainInputText.style.fontSize = fontSizeInput.value + 'px';

        currentObject.classList.remove("dissable");

        let curWidth = String(currentObject.offsetWidth + 20) + 'px';
        let curHeight = String(currentObject.offsetHeight + 10) + 'px';

        currentObject.classList.add("dissable");

        mainInputText.style.width = curWidth;
        mainInputText.style.height = curHeight;
    }
});

lineHeightInput.addEventListener("change", e => {
    currentObject.style.lineHeight = lineHeightInput.value + '%';
    mainInputText.style.lineHeight = lineHeightInput.value + '%';
});

letterSpacingInput.addEventListener("change", e => {
    currentObject.style.letterSpacing= letterSpacingInput.value + 'px';
    mainInputText.style.letterSpacing = letterSpacingInput.value + 'px';
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

textAlignmentLeft.addEventListener('change', e => {
    if (textAlignmentLeft.checked) {
        currentObject.style.textAlign = "left";
        mainInputText.style.textAlign = "left";
        textAlignmentLeftBlock.style.backgroundColor = "#adadad";
        textAlignmentCenterBlock.style.backgroundColor = "#D9D9D9";
        textAlignmentRightBlock.style.backgroundColor = "#D9D9D9";
    }
});

textAlignmentCenter.addEventListener('change', e => {
    let textAlignmentCenterBlock = document.getElementsByClassName('textAlignmentCenterBlock')[0];
    if (textAlignmentCenter.checked) {
        currentObject.style.textAlign = "center";
        mainInputText.style.textAlign = "center";
        textAlignmentLeftBlock.style.backgroundColor = "#D9D9D9";
        textAlignmentCenterBlock.style.backgroundColor = "#adadad";
        textAlignmentRightBlock.style.backgroundColor = "#D9D9D9";
    }
});

textAlignmentRight.addEventListener('change', e => {
    let textAlignmentRightBlock = document.getElementsByClassName('textAlignmentRightBlock')[0];
    if (textAlignmentRight.checked) {
        currentObject.style.textAlign = "right";
        mainInputText.style.textAlign = "right";
        textAlignmentLeftBlock.style.backgroundColor = "#D9D9D9";
        textAlignmentCenterBlock.style.backgroundColor = "#D9D9D9";
        textAlignmentRightBlock.style.backgroundColor = "#adadad";
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

    let allTd = currentObject.getElementsByTagName('td');

    for (let i = 0; i < allTd.length; i++) {
        allTd[i].setAttribute("bgcolor", updateBackgroundColor.value);
    }
});

updateBackgroundColorTag.addEventListener('change', e => {
    if (updateBackgroundColorTag.value[0] === '#') {
        currentObject.setAttribute("bgcolor", updateBackgroundColorTag.value.replace(/\s/g, ""));
        updateBackgroundColor.value = updateBackgroundColorTag.value.replace(/\s/g, "");

        let allTd = currentObject.getElementsByTagName('td');

        for (let i = 0; i < allTd.length; i++) {
            allTd[i].setAttribute("bgcolor", updateBackgroundColor.value);
        }
    }
});

updateImageOpacityInput.addEventListener('change', e => {
    currentObject.style.opacity = updateImageOpacityInput.value;
    displayImageOpacity.style.opacity = updateImageOpacityInput.value;
});

updateImageWidthInput.addEventListener('change', e => {
    currentObject.style.width = updateImageWidthInput.value + 'px';
    updateImageHeightInput.value = currentObject.offsetHeight;  
});

updateImageHeightInput.addEventListener('change', e => {
    currentObject.style.height = updateImageHeightInput.value + 'px';
    updateImageWidthInput.value = currentObject.offsetWidth;
});

updateImagePaddingLeftInput.addEventListener('change', e => {
    if (updateImagePaddingLeftInput.value > 100) {
        parentTd.style.paddingLeft = '100px';
    }
    else {
        parentTd.style.paddingLeft = updateImagePaddingLeftInput.value + 'px';
    }
});

updateImagePaddingRightInput.addEventListener('change', e => {

    if (updateImagePaddingRightInput.value > 100) {
        parentTd.style.paddingRight = '100px';
    }
    else {
        parentTd.style.paddingRight = updateImagePaddingRightInput.value + 'px';
    }
});

updateBlockPaddingTopInput.addEventListener('change', e => {
    let parentTemplate = currentObject.closest('.template');
    let firstTd = parentTemplate.getElementsByTagName('td')[0];

    if (updateBlockPaddingTopInput.value > 100) {
        firstTd.style.paddingTop = '100px';
    }
    else {
        firstTd.style.paddingTop = updateBlockPaddingTopInput.value + 'px';
    }
});

updateBlockPaddingBotInput.addEventListener('change', e => {
    let parentTemplate = currentObject.closest('.template');
    let firstTd = parentTemplate.getElementsByTagName('td');

    if (updateBlockPaddingBotInput.value > 100) {
        firstTd[firstTd.length - 1].style.paddingBottom = '100px';
    }
    else {
        firstTd[firstTd.length - 1].style.paddingBottom = updateBlockPaddingBotInput.value + 'px';
    }
});


templatesBlockBuff.addEventListener('click', e => {
    if (currentTypeTemplate === e.target.closest(".typeTemplateBlock")) {
        choseMenu.classList.toggle("dissable");
        currentTypeTemplate.classList.toggle('menuNow');
    }
    else {
        if (currentTypeTemplate) {
            currentTypeTemplate.classList.remove('menuNow');
        }
        
        if (e.target.closest(".typeTemplateBlock")) {
            currentTypeTemplate = e.target.closest(".typeTemplateBlock");
            choseMenu.classList.remove("dissable");
            currentTypeTemplate.classList.toggle('menuNow');
        }
    }
});
