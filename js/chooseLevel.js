
document.addEventListener("DOMContentLoaded", () => {
    let level3 = document.getElementById('3');
    let level2 = document.getElementById('2');
    let level1 = document.getElementById('1');
    level3.addEventListener('click', hardLevel);
    level2.addEventListener('click', mediumLevel);
    level1.addEventListener('click', easyLevel);
    let currentUser = localStorage.getItem("candyCurrentUser")

    if (currentUser) {
        let helloUser = JSON.parse(localStorage.getItem(currentUser))
        document.getElementById("helloUser").innerHTML = "Hello " + helloUser.userName;
    }

});
function hardLevel() {
    localStorage.setItem('currentLevel', "3");
}

function mediumLevel() {
    localStorage.setItem('currentLevel', "2");
}

function easyLevel() {
    localStorage.setItem('currentLevel', "1");

}

