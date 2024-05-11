// Add an event listener to the submit button
let submitBtn = document.getElementById('logIn');
submitBtn.addEventListener("click", userLogIn);

function userLogIn() {
  console.log("something great is coming soon :)")
  //שמירת הערכים
  let candyEmail = document.querySelector('#userEmail').value;
  let candyPwd = document.querySelector('#userPassword').value;
  console.log("it still working!!")
  //בדיקה אם אין תאים ריקים
  if (candyEmail === "" || candyPwd === "") {
    alert("All details must be complete");
    return;
  }
  //חיפוש המשתמש
  let user = localStorage.getItem(candyEmail);
  if (user) {//אם יש משתמשים רשומים
    let userData = JSON.parse(localStorage.getItem(candyEmail));//שמירת האובייקט שלו
    console.log(userData);
    if (userData.userEmail === candyEmail) {//נמצא שם משתמש תואם
      console.log(userData.userEmail);
      if (userData.userPassword !== candyPwd) {//אם הסיסמה שגויה
        alert("The username or password is incorrect");
        return;
      }
      localStorage.setItem("candyCurrentUser", candyEmail);//שמירת המשחק הנוכחי
      window.location = "../html/open.html";
      return;
    }
  }
  else {
    alert("No registered user found");
    return;
  }
}



