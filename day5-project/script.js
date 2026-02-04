const H1 = document.getElementById('H1');
const ThemeCh =document.getElementById('Change-Mood');
const body = document.body


//Load saved theme

if(localStorage.getItem('theme')=== 'dark'){
    body.classList.add('dark-theme');
    H1.textContent ='Welecome to Night Mood';
}

// change on click

ThemeCh.addEventListener('click',()=>{
    body.classList.toggle('dark-theme');


// save in local storage
if(body.classList.contains('dark-theme')){
        localStorage.setItem('theme','dark');
        H1.textContent ='Welecome to Night Mood';
}
else{
            localStorage.setItem('theme','light');
            H1.textContent ='Welecome to Day Mood';
}
});