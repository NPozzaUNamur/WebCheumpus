document.querySelector(".call911").remove();
document.querySelector("#usernavigation form").remove();

stylecss = `
    header.fixed-top,
    .primary-navigation,
    #usernavigation form {
        display: none;
        visibility: hidden;
    }

    .navbar.fixed-top {
        top: 0;
        height: 10.2vh;
        border: 0;
    }

    .navbar-receptic {
        backdrop-filter: blur(13px);
        background: linear-gradient(92deg, rgba(110, 199, 46, 0.69) 0.87%, rgba(108, 164, 66, 0.51) 7.83%, rgba(107, 138, 81, 0.38) 13.67%, rgba(106, 117, 93, 0.27) 24%, rgba(105, 103, 101, 0.20) 41.04%, rgba(105, 101, 102, 0.19) 100%);
    }

    .navbar-receptic .navbar-nav .nav-link,
    .navbar-receptic a.dropdown-toggle .icon,
    .editmode-switch-form:hover,
    .navbar-receptic .popover-region[data-region="popover-region-messages"] a .icon {
        color: #1d2125;
    }

    #page {
        margin-top: 0 !important;
        padding-top: 10.2vh !important;
        height: 100vh !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        scrollbar-width: none !important;
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