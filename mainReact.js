const headerNode = document.getElementById("header");
const header = ReactDOM.createRoot(headerNode);
const mainNode = document.getElementById("main");
const main = ReactDOM.createRoot(mainNode);
const footerNode = document.getElementById("footer");
const footer = ReactDOM.createRoot(footerNode);

const choseNode = document.getElementById("choseMenu");
const chose = ReactDOM.createRoot(choseNode);

const templatesBlockBuffNode = document.getElementById("templatesBlockBuff");
const templatesBlock = ReactDOM.createRoot(templatesBlockBuffNode);

const removeTemplateBlockNode = document.getElementById("removeTemplateBlock");
const removeTemplateBlock = ReactDOM.createRoot(removeTemplateBlockNode);

const dragTemplateBlockNode = document.getElementById("dragTemplateBlock");
const dragTemplateBlock = ReactDOM.createRoot(dragTemplateBlockNode);

let letterReact = document.getElementById("letter");

let removeModeReact = false;

let currentHeader;
let currentMain;
let currentFooter;
let currentLoadMenu;

let headersArray = [<Header1 />, <Header2 />]
let mainsArray = [<Main1 />, <Main2 />]
let footersArray = [<Footer1 />]

function handlerChose(e) {
    let object = e.target;
    
    if (object.closest('.choseOption')) {
        object = object.closest('.choseOption');

        let numChose = object.classList[1].at(-1);

        if (object.classList.contains("header")) {
            currentHeader.press(numChose - 1);
        }
        else if (object.classList.contains("main")) {
            currentMain.press(numChose - 1);
        }
        else if (object.classList.contains("footer")) {
            currentFooter.press(numChose - 1);
        }
    }
}

function ChoseHeader() {
    const listItems = headersArray.map((header, index) =>
        <div className={"choseOption " + "headerMenu" + String(index+1) + " header"}>
            <div className="choseWrapper">
                {header}
            </div>
        </div>
    );

    return (<div onClick={handlerChose}>
        {listItems}
    </div>)	
}

function ChoseMain() {
    const listItems = mainsArray.map((main, index) =>
        <div className={"choseOption " + "mainMenu" + String(index+1) + " main"}>
            <div className="choseWrapper">
                {main}
            </div>
        </div>
    );

    return (<div onClick={handlerChose}>
        {listItems}
    </div>)	
}

function ChoseFooter() {
    const listItems = footersArray.map((footer, index) =>
        <div className={"choseOption " + "footerMenu" + String(index+1) + " footer"}>
            <div className="choseWrapper">
                {footer}
            </div>
        </div>
    );

    return (<div onClick={handlerChose}>
        {listItems}
    </div>)	
}


class CurrentHeader extends React.Component {
    constructor(props) {
        super(props);
        this.press = this.press.bind(this);
        this.state = {content: <Header1 />};
    }
    press(numChose) {
        this.setState({content: headersArray[numChose]});
    }
    deleter() {
        this.setState({content: ""});
    }
    render() {
        currentHeader = this;
        return (
            this.state.content
        );
    }
}

class CurrentMain extends React.Component {
    constructor(props) {
        super(props);
        this.press = this.press.bind(this);
        this.state = {content: [<Main1 />]};
    }
    press(numChose) {
        this.state.content.push(mainsArray[numChose]);
        let buff = this.state.content;
        this.setState({content: buff});
    }
    deleter(numChose) {
        let index = this.state.content.indexOf(mainsArray[numChose]);
        this.state.content.splice(index, 1);
        let buff = this.state.content;
        this.setState({content: buff});
    }
    render() {
        currentMain = this;
        return (
            this.state.content
        );
    }
}

class CurrentFooter extends React.Component {
    constructor(props) {
        super(props);
        this.press = this.press.bind(this);
        this.state = {content: <Footer1 />};
    }
    press(numChose) {
        this.setState({content: footersArray[numChose]});
    }
    deleter() {
        this.setState({content: ""});
    }
    render() {
        currentFooter = this;
        return (
            this.state.content
        );
    }
}

function LoadTemplatesMenuHandler(e) {
    let object = e.target.closest(".typeTemplateBlock");

    if (object.classList.contains("headerTypeTemplateBlock")) {
        currentLoadMenu.press("header")
    }
    else if (object.classList.contains("mainTypeTemplateBlock")) {
        currentLoadMenu.press("main")
    }
    else if (object.classList.contains("footerTypeTemplateBlock")) {
        currentLoadMenu.press("footer")
    }
}


function TemplatesBlockComponent() {
    return (
        <div className="typesTemplates" id="typesTemplates">
            <div onClick={LoadTemplatesMenuHandler} className="typeTemplateBlock headerTypeTemplateBlock">
                <img className="TypeTemplateImg" src="./img/headerTemplate.png" alt="" />
            </div>
            <div onClick={LoadTemplatesMenuHandler} className="typeTemplateBlock mainTypeTemplateBlock">
                <img className="TypeTemplateImg" src="./img/mainTemplate.png" alt="" />
            </div>
            <div onClick={LoadTemplatesMenuHandler} className="typeTemplateBlock footerTypeTemplateBlock">
                <img className="TypeTemplateImg" src="./img/footerTemplate.png" alt="" />
            </div>
            <div className="typeTemplateBlock layoutTypeTemplateBlock">
                <span className="layouts">Layouts</span>
            </div>
        </div>
    )
}


class LoadTemplatesMenu extends React.Component {
    constructor(props) {
        super(props);
        this.press = this.press.bind(this);
        this.state = {content: <ChoseHeader />};
    }
    press(typeTemplate) {
        if (typeTemplate === "header") {
            this.setState({content: <ChoseHeader />});
        }
        else if (typeTemplate === "main") {
            this.setState({content: <ChoseMain />});
        }
        else if (typeTemplate === "footer") {
            this.setState({content: <ChoseFooter />});
        }
    }
    render() {
        currentLoadMenu = this;
        return (
            this.state.content
        );
    }
}

function handleDeleteClick(e) {
    let object = e.target.closest(".template")
    let parent = object.parentElement;
    
    if (parent.classList.contains("header")) {
        currentHeader.deleter();
    }
    else if (parent.classList.contains("main")) {
        currentMain.deleter(object.classList[1].at(-1));
    }
    else if (parent.classList.contains("footer")) {
        currentFooter.deleter();
    }
}

function RemoveTemplateHandler(e) {
    if (removeModeReact) {
        removeModeReact = false;
        e.target.classList.remove("pressed");

        letterReact.removeEventListener("click", handleDeleteClick);

    }
    else {
        removeModeReact = true;
        e.target.classList.add("pressed");

        letterReact.addEventListener("click", handleDeleteClick);

    }

}


header.render(
    <CurrentHeader />
);

main.render(
    <CurrentMain />
);

footer.render(
    <CurrentFooter />
);

chose.render(
    <LoadTemplatesMenu/>
);

templatesBlock.render(
    <TemplatesBlockComponent />
);

removeTemplateBlock.render(
    <button onClick={RemoveTemplateHandler} class="removeTemplateButton" id="removeTemplateButton" type="button">Remove templates mode</button>
);

dragTemplateBlock.render(
    <button class="dragTemplateButton" id="dragTemplateButton" type="button">Move templates mode</button>
);
