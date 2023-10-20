glass_effect = false;
dark_mode = false;

remove = (selector) => {
    if (typeof selector === "object") {
        selector = selector.join(", ");
    }
    elem = document.querySelectorAll(selector);
    for(let i = 0; i < elem.length; i++) {
        elem[i].remove();
    }
}

// ========================

remove([".call911", "#usernavigation form"])

barStyleGlass = `
    backdrop-filter: blur(13px);
    background: linear-gradient(92deg, rgba(110, 199, 46, 0.69) 0.87%, rgba(108, 164, 66, 0.51) 7.83%, rgba(107, 138, 81, 0.38) 13.67%, rgba(106, 117, 93, 0.27) 24%, rgba(105, 103, 101, 0.20) 41.04%, rgba(105, 101, 102, 0.19) 100%);
`

barStyleClassique = `
    background: rgb(155,216,96);
    background: linear-gradient(90deg, rgba(155,216,96,1) 0%, rgba(163,212,128,1) 10%, rgba(191,208,177,1) 22%, rgba(210,215,205,1) 35%, rgba(226,226,226,1) 57%);
`

barStyle = glass_effect ? barStyleGlass : barStyleClassique;

iconColor = dark_mode ? "#ffffff" : "#1d2125";



stylecss = `
    header.fixed-top,
    .primary-navigation,
    #usernavigation form,
    .trick {
        display: none;
        visibility: hidden;
    }

    .navbar.fixed-top {
        top: 0;
        height: 10.2vh;
        border: 0;
    }

    .navbar-receptic {
        ${barStyle}
    }

    .navbar-receptic .navbar-nav .nav-link,
    .navbar-receptic a.dropdown-toggle .icon,
    .editmode-switch-form:hover,
    .navbar-receptic .popover-region[data-region="popover-region-messages"] a .icon {
        color: ${iconColor};
    }

    #page {
        margin-top: 0 !important;
        padding-top: 10.2vh !important;
        height: 100vh !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        scrollbar-width: none !important;
    }

    #usernavigation {
        margin-top: 2.32vh;
    }

    #usernavigation [data-region="popover-region-messages"] a:hover,
    .navbar-receptic .navbar-nav .nav-link:hover, .navbar-receptic .navbar-nav .nav-link:focus,
    #usernavigation [data-region="popover-region-messages"] a:hover i {
        color: #1d2125;
    }

    .popover-region {
        width: 3.13vw;
        height: 3.13vw;
        flex-shrink: 0;

        display: inline-flex;
        justify-content: center;
        align-items: center;

        /* effect */
        transition: linear 300ms;

        text-decoration: none;
        color: #1E1E1E;
        font-size: 1.5rem;
        border-radius: 14px;
    
        margin-left: 0.40vw;
    }

    .popover-region:hover {
        color: #1d2125;

        /* effect */
        background: linear-gradient(133deg, #FFF -7.1%, rgba(220, 220, 220, 0.00) 107.1%);
        backdrop-filter: blur(20px);
        box-shadow: 4px 6px 4px 0px rgba(0, 0, 0, 0.25);
        transition: linear 300ms;
    }

`;

oldStyle = document.querySelector("#navBarStyle");
if (oldStyle) {
    oldStyle.remove();
}


document.querySelector("head").insertAdjacentHTML(
    "beforeend",
    `<style id="navBarStyle">${stylecss}</style>`
);

console.log("style added");