let menu = document.querySelector('#menubutton');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>
{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}
window.onclick = () =>
{
    menu.classList.onscroll('fa-times');
    navbar.classList.onscroll('active');
}