
let Menu = document.getElementById("MenuIcon");
let close = document.getElementById("closeIcon");
let Menubar = document.getElementById("Menu");

function openMenu() {
    Menubar.style.display = "block"
    close.style.display = "block"
    Menu.style.display = "none"


}
function closeMenu() {
    Menubar.style.display = "none"
    close.style.display = "none"
    Menu.style.display = "block"


}


