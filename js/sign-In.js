
let sign = document.querySelector("#signUp");
sign.addEventListener('click', saveUserDetail)//הוספת האירוע כשלוחצים 
function saveUserDetail(e) {
  //שמירת הערכים
  const candyName = document.querySelector('#name').value;
  const candyLastName = document.querySelector('#lastName').value;
  const candyEmail = document.querySelector('#email').value;
  const candyPwd = document.querySelector('#pwd').value;
  console.log("it still working!!")
  if (candyName === "" || candyLastName === "" || candyEmail === "" || candyPwd === "") {//אם לא מילאו את כל הפרטים
    alert("All details must be complete");
    return;
  }
  //בדיקת תקינות האימייל
  const emailNotValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (!emailNotValid.test(candyEmail)) {
    alert("The email address is not valid");
    return;
  }

  // בדיקה האם הסיסמה קטנה מ8 תווים
  if (candyPwd.length < 8) {
    alert("Enter a password of 8 characters");
    return;
  }
  //בדיקת סיסמא חזקה
  const PswNotValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const result = PswNotValid.test(candyPwd);
  if (!PswNotValid.test(candyPwd)) {
    alert("The password must include: character, letter and number");
    return;
  }
  //בדיקה האם המשתמש כבר רשום
  for (let i = 0; i < localStorage.length; i++) {
    let candyUserData = JSON.parse(localStorage.getItem(candyEmail));
    if (candyUserData) {
      alert("User exist");
      return;
    }
  }
  console.log("everything is corecct!!!")
  const candyUser = {//יצירת אובייקט לשמירת הנתונים של המשתמש
    userName: candyName,
    userLastName: candyLastName,
    userEmail: candyEmail,
    userPassword: candyPwd,
    userWinLevel1: 0,
    userFailLevel1: 0,
    userWinLevel2: 0,
    userFailLevel2: 0,
    userWinLevel3: 0,
    userFailLevel3: 0,
  }
  localStorage.setItem(candyEmail, JSON.stringify(candyUser));//שמירת האובייקט בלוקל עם שם מפתח של כתובת האימייל שלו
  localStorage.setItem("candyCurrentUser", candyUser.userEmail);//שמירת המשחק הנוכחי
  window.location = "../html/open.html";

}
