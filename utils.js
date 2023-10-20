import {debug} from "./Config.js";

var appendStyle = (cssStyleCode, className) => {
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

export {appendStyle}