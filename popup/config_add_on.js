function reportExecuteScriptError(error) {
    hide(document.querySelector("#popup-content"));
    hide(document.querySelector("#popup-content-unmatched"));
    show(document.querySelector("#error-content"));
    console.error(`Failed to execute content script: ${error}`);
    document.querySelector("#msgError").textContent = error;
}

function hide(element) {
    if (!element.classList.contains("hidden")) {
        element.classList.add("hidden");
    }
}

function show(element) {
    while(element.classList.contains("hidden")) {
        element.classList.remove("hidden");
    }
}

function resetHideShow() {
    hide(document.querySelector("#error-content"));
    hide(document.querySelector("#popup-content-unmatched"));
    show(document.querySelector("#popup-content"));
}

function onNotMatchURL() {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#popup-content-unmatched").classList.remove("hidden");
}
function onMatchURL() {
    document.querySelector("#popup-content").classList.remove("hidden");
    document.querySelector("#popup-content-unmatched").classList.add("hidden");
}
function checkURL(tab) {
    if (tab.url.includes("https://webcampus.unamur.be")) {
        onMatchURL();
        return true;
    } else {
        onNotMatchURL();
        return false;
    }
}
function checkCurrentURL() {
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        if (tabs.length === 0) {
            return false;
        } else {
            return checkURL(tabs[0]);
        }
    });
}

function sendOrder(command, order, callback = () => {}) {
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        if (tabs.length === 0) {
            return;
        } else {
            if (!checkURL(tabs[0])) return;
            browser.tabs.sendMessage(tabs[0].id, {
                command: command,
                order: order
            }).then(callback).catch(reportExecuteScriptError);
        }
    });
}

function changeState(global = null, navbar = null) {
    if (global === null && navbar === null) return;
    browser.storage.local.get("state").then((result) => {
        if (result.state === undefined) {
            state = {
                "global": global?global: false,
                "navbar": navbar?navbar: "classic"
            };
        } else {
            state = result.state;
            if (global !== null) {
                state.global = global;
            } if (navbar !== null) {
                state.navbar = navbar;
            }
        }        
        browser.storage.local.set({ state });
    }).catch(reportExecuteScriptError);
}
function loadState() {
    browser.storage.local.get("state").then((result) => {
        if (result.state === undefined) {
            state = {
                "global": false,
                "navbar": "classic"
            };
        } else {
            state = result.state;
        }
        document.querySelector("#globalToggle").checked = state.global;
        document.querySelector("#navbarGlassToggle").checked = state.navbar === "glass";
    }).catch(reportExecuteScriptError);
}

function setGlobal(on = true) {
    commande = on?"globalOn":"globalOff";
    sendOrder(commande, "",
        () => {
            changeState(global=on);
        }
    );
}

function setNavbarStyle(style) {
    commande = "setNavbarStyle";
    sendOrder(commande, style,
        () => {
            changeState(null, style);
        }
    );
}

function loadHTMLEvents() {
    gt = document.querySelector("#globalToggle")
    if(gt) {
        gt.addEventListener("change", (checkBox) => {
            if (checkBox.target.checked) {
                setGlobal(true)
            } else {
                setGlobal(false)
            }
        });
    } else {
        console.error("globalToggle not found");
    }

    nbgt = document.querySelector("#navbarGlassToggle")
    if (nbgt) {
        nbgt.addEventListener("change", (checkBox) => {
            if (checkBox.target.checked) {
                setNavbarStyle("glass")
            } else {
                setNavbarStyle("classic")
            }
        });
    } else {
        console.error("navbarGlassToggle not found");
    }

    owc = document.querySelector("#openWebcampus")
    if(owc) owc.addEventListener("click", () => {openWebcampusTab();});
    else console.error("openWebcampus not found");

    rtn = document.querySelector("#returnToNormal")
    if(rtn) rtn.addEventListener("click", () => {resetHideShow();});
    else console.error("returnToNormal not found");
}

function openWebcampusTab() {
    console.log("openWebcampusTab");
    browser.tabs.query({
        url: ["*://webcampus.unamur.be/*"],
        windowId: browser.windows.WINDOW_ID_CURRENT
    }).then((tabs) => {
        console.log(tabs);
        if (tabs.length === 0) {
            browser.tabs.create({url: "https://webcampus.unamur.be/"});
        } else {
            browser.tabs.update(tabs[0].id,{active:true})
        }
    });
}

function onLoad() {
    loadState();
    checkCurrentURL();
    loadHTMLEvents();
    // testError();
}

function testError() {
    title = document.querySelector("h3");
    title.textContent = "test";
    title.addEventListener("click", () => {reportExecuteScriptError("test");});
}

onLoad();
console.info("popup.js loaded");


