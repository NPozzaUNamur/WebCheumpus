p = (msg) => console.log(msg);

function appendStyle(cssStyleCode, className) {
    if(
        cssStyleCode == null || className == null
    ) {
        throw new Error("appendStyle: cssStyleCode or className is null");
    }
    if (document.getElementById(className)) {
        if(debug) console.info(`${className} already exists`);
        document.getElementById(className).remove();
    }
    document.querySelector("head").insertAdjacentHTML(
        "beforeend",
        `<style id="${className}">${cssStyleCode}</style>`
    );

}
function removeStyle(className) {
    if(className[0] !== ".") className = `.${className}`;
    if (document.getElementById(className)) {
        document.getElementById(className).remove();
    }
}

function addLogo() {
    if (!document.querySelector("#logoEffectPurpose")) {
        document.querySelector("nav.fixed-top").insertAdjacentHTML(
            "afterbegin",
            `
            <div id="logoEffectPurpose">
                <a id="logoFrame" href="https://webcampus.unamur.be/my/">
                    <img id="logo" src="${browser.runtime.getURL("static/unamur_logo.png")}" alt="logo">
                </a>
            </div>
            `
        );
    }    
}
function removeLogo() {
    if (document.querySelector("#logoEffectPurpose")) {
        document.querySelector("#logoEffectPurpose").remove();
    }
}

function loadCSS(path, className) {
    if (document.querySelector(`.${className}`)) return;
    let link = document.createElement('link');

    path = browser.runtime.getURL(path);
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    link.className = className;
     
    document.getElementsByTagName('HEAD')[0].appendChild(link);
}
function removeCSS(className) {
    if(className[0] !== ".") className = `.${className}`;
    if (document.querySelector(className)) {
        document.querySelector(className).remove();
    }
}

function hideCall911(hide=true) {
    let call = document.querySelector(".call911");
    if(!call) return;
    // Check if d-sm-block is in classList
    let isHidden = !call.classList.contains("d-sm-block");
    console.log(`isHidden: ${isHidden}`);
    if (!hide && isHidden) call.classList.add("d-sm-block");
    else if (hide && !isHidden) call.classList.remove("d-sm-block");
}

function customStyleOn() {
    addLogo();
    loadCSS("style/addStyle.css", "addStyle")
    loadCSS("style/modifyStyle.css", "modifyStyle")
    hideCall911(true);
}
function customStyleOff() {
    removeLogo();
    removeCSS("addStyle");
    removeCSS("modifyStyle");
    hideCall911(false);
}

function setNavbarStyle(style) {
    navbar = document.querySelector("nav.fixed-top");
    navbar.classList.remove("classic-navbar");
    navbar.classList.remove("glass-navbar");
    if (style === "glass") {
        navbar.classList.add("glass-navbar");
    } else if (style === "classic") {
        navbar.classList.add("classic-navbar");
    }
    
}

function loadState() {
    browser.storage.local.get("state").then((result) => {
        if (result.state === undefined) {
            state = {
                "global": false,
                "navbar": "glass"
            };
        } else {
            state = result.state;
            if (state.global) customStyleOn();
            if (state.navbar) setNavbarStyle(state.navbar);
        }
    }).catch((error) => {
        console.error(error);
    }); 
}

loadState();

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "globalOn") {
        customStyleOn();
    } else if (message.command === "globalOff") {
        customStyleOff();
    } else if (message.command === "setNavbarStyle") {
        setNavbarStyle(message.order);
    }
});