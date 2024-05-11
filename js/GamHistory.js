document.addEventListener("DOMContentLoaded", () => {

    let currentUser = localStorage.getItem("candyCurrentUser")

    if (currentUser) {
        let UserWin = JSON.parse(localStorage.getItem(currentUser))
        document.getElementById("winLevel1").innerHTML = UserWin.userWinLevel1;
        document.getElementById("winLevel2").innerHTML = UserWin.userWinLevel2;
        document.getElementById("winLevel3").innerHTML = UserWin.userWinLevel3;
        document.getElementById("failLevel1").innerHTML = UserWin.userFailLevel1;
        document.getElementById("failLevel2").innerHTML = UserWin.userFailLevel2;
        document.getElementById("failLevel3").innerHTML = UserWin.userFailLevel3;

    }
});