
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const timerDisplay = document.getElementById('timer')
  let matrixSize;
  const squares = []
  let score = 0
  let timer = 90
  let state = false;
  let button = document.createElement("BUTTON");
  let currentLevel = localStorage.getItem('currentLevel');//מקבל מהלוקל רמה נוכחית
  if (currentLevel == 3) {
    matrixSize = 10
    document.querySelector('.grid').classList.add('gridLevel3');//הוספת מחלקת עיצוב לcss
  } else if (currentLevel == 2) {
    matrixSize = 8
    document.querySelector('.grid').classList.add('gridLevel2');
  } else {
    matrixSize = 6;
    document.querySelector('.grid').classList.add('gridLevel1');
  }

  let currentUser = localStorage.getItem("candyCurrentUser");// (key)שמירת המשתמש

  if (currentUser) {
    let dataUserHello = JSON.parse(localStorage.getItem(currentUser));//כל פרטי המשתמש מהלוקל
    document.getElementById("helloUser").innerHTML = "GOOd LUCK " + dataUserHello.userName;//מדפיס לhtml
  }

  h1_score.innerHTML = "You need to reach a score of " + matrixSize * 20;//הדפסת הנקודות שהוא צריך להגיע
  const candyColors = [//יצירת מערך של סוגי הסוכריות
    'url(../pictures/red-candy.png)',
    'url(../pictures/yellow-candy.png)',
    'url(../pictures/orange-candy.png)',
    'url(../pictures/purple-candy.png)',
    'url(../pictures/green-candy.png)',
    'url(../pictures/blue-candy.png)',
  ]
  //timer
  let dataUser = JSON.parse(localStorage.getItem(currentUser));//כל פרטי המשתמש מהלוקל
  let timerInterval = setInterval(timerGame, 1000);//קריאה לפונקציה כל שניה
  function timerGame() {
    timerDisplay.innerHTML = timer--//שינוי HTML
    if (timer == 0) {//כשהזמן נגמר
      if (score < matrixSize * 20) {//אם לא הגיע לנקודות הרצויות
        clearInterval(timerInterval);//מפסיק את הקריאה
        document.querySelector("#timer").textContent = "The time is up";//משנה את הכיתוב
        if (currentLevel == 3) {
          dataUser.userFailLevel3 = dataUser.userFailLevel3 + 1;//מוסיף למונה 
          localStorage.setItem(dataUser.userEmail, JSON.stringify(dataUser));//משנה את הנתונים בלוקל
        }
        if (currentLevel == 2) {
          dataUser.userFailLevel2 = dataUser.userFailLevel2 + 1;
          localStorage.setItem(dataUser.userEmail, JSON.stringify(dataUser));
        }
        if (currentLevel == 1) {
          dataUser.userFailLevel1 = dataUser.userFailLevel1 + 1;
          localStorage.setItem(dataUser.userEmail, JSON.stringify(dataUser));
        }
        window.location = "../html/gameOver.html";//מציג מסך אחר
      } else {//אם הצליח
        if (currentLevel == 3) {
          dataUser.userWinLevel3 = dataUser.userWinLevel3 + 1;
          localStorage.setItem(dataUser.userEmail, JSON.stringify(dataUser));
        }
        if (currentLevel == 2) {
          dataUser.userWinLevel2 = dataUser.userWinLevel2 + 1;
          localStorage.setItem(dataUser.userEmail, JSON.stringify(dataUser));
        }
        if (currentLevel == 1) {
          dataUser.userWinLevel1 = dataUser.userWinLevel1 + 1;
          localStorage.setItem(dataUser.userEmail, JSON.stringify(dataUser));
        }

        window.location = "../html/win.html";
      }
    }
  }

  //create your board
  function createBoard() {
    for (let i = 0; i < matrixSize * matrixSize; i++) {//עובר על כל המטריצה
      const square = document.createElement('div')//יוצר לכל תא דיב
      square.setAttribute('draggable', true)//מוסיף תכונת גרירה לכל תא במטריצה
      square.setAttribute('id', i)//מוסיף לכל תא במטריצה id
      let randomColor = Math.floor(Math.random() * candyColors.length)//הגרלת מספר רנדומאלית לכל תא
      square.style.backgroundImage = candyColors[randomColor]//הוספת התמונה לתא לפי הצבע המוגרל
      grid.appendChild(square)//הוספת הסוכריות לגריד
      squares.push(square)//הכנסת התא למטריצה
    }
  }
  createBoard()

  // Dragging the Candy
  let colorStart
  let colorReplaced
  let ColorPlacementStart
  let ColorPlacementReplaced
  //נותן לכל סוכריה את כל הפעולות האפשריות
  squares.forEach(square => square.addEventListener('dragstart', dragStart))//מתחיל לגרור
  squares.forEach(square => square.addEventListener('dragend', dragEnd))//כשגרירה נגמרת
  squares.forEach(square => square.addEventListener('dragover', dragOver))//כשעובר מעל יעד חוקי 
  squares.forEach(square => square.addEventListener('drop', dragDrop))//כשעוזבים את הגרירה מעל יעד שחרור חוקי

  function dragStart() {// כשסוכריה מתחילה להיגרר
    state = true;
    colorStart = this.style.backgroundImage// איזה צבע מתחיל לזוז
    ColorPlacementStart = parseInt(this.id)//מכניס את הכתובת שלו
  }

  function dragOver(e) {//אפשרות שחרר- מניעת החסימה
    e.preventDefault()//למנוע את ברירת המחדל
  }

  function dragDrop() {//כשעוזבים
    colorReplaced = this.style.backgroundImage//הצבע שאני רוצה להחליף אותו
    ColorPlacementReplaced = parseInt(this.id)// המיקום של הסוכריה
    this.style.backgroundImage = colorStart//ביצוע התחלופה
    squares[ColorPlacementStart].style.backgroundImage = colorReplaced
  }

  function dragEnd() {
    //בדיקה שהגרירה חוקית
    let validMovesArr = [ColorPlacementStart - 1, ColorPlacementStart - matrixSize, ColorPlacementStart + 1, ColorPlacementStart + matrixSize]//שמירת כל המקומות מסביב
    let validMove = validMovesArr.includes(ColorPlacementReplaced)//האם המיקום של ההחלפה הוא נמצא במקומות החוקיים

    if (ColorPlacementReplaced && validMove) {//בדיקה שהמקום שאני רוצה איתו להחליף נמצא במטריצה והאם הוא חוקי
      ColorPlacementReplaced = null//אתחול
    } else if (ColorPlacementReplaced && !validMove) {//בדיקה שהמקום שאני רוצה איתו להחליף נמצא במטריצה והוא לא חוקי
      squares[ColorPlacementReplaced].style.backgroundImage = colorReplaced//נשאר אותו מצב
      squares[ColorPlacementStart].style.backgroundImage = colorStart//נשאר אותו מצב
    } else squares[ColorPlacementStart].style.backgroundImage = colorStart//-לא יהיה שינוי: המקום שאני רוצה איתו להחליף לא נמצא במטריצה ואינו חוקי
  }
  //פונקציה למילוי סוכריות חדשות כאשר נמצאה סריה
  function fillSquare() {
    let firstRow = [];
    for (i = 0; i < matrixSize; i++) //מילוי של השורה הראשונה
    {
      firstRow.push(i);
    }
    let endInsert = matrixSize * matrixSize - matrixSize - 1;
    for (i = 0; i <= endInsert; i++) {//עובר על כל המטריצה חוץ מהשורה האחרונה
      if (squares[i + matrixSize].style.backgroundImage === '') {//אם השורה מתחת נמחקה (שנמצאה סריה)
        squares[i + matrixSize].style.backgroundImage = squares[i].style.backgroundImage//העתקה של השורות מעל, כל אחת יורדת שורה
        squares[i].style.backgroundImage = ''//השורה הנוכחית
      }
      const isFirstRow = firstRow.includes(i)//בדיקה האם האינדקס הנוכחי נמצא בשורה הראשונה
      if (isFirstRow && (squares[i].style.backgroundImage === '')) {//האם עכשיו אנחנו בשורה הראשונה והאם יש שם תאים ריקים
        let randomColor = Math.floor(Math.random() * candyColors.length)// הגרלת מילוי בכדי למלא מחדש את השורה הראשונה
        squares[i].style.backgroundImage = candyColors[randomColor]
      }
    }
  }
  //בדיקה על שורה של 4
  function checkRowForFour() {
    let notValid4 = [];//יוצר מערך לשמירת המקומות האסורים
    for (i = 1; i <= matrixSize; i++) {//כמספר השורות
      for (j = 1; j <= 3; j++) {//כמה מקומות בסוף השורה א"א
        notValid4.push(matrixSize - j + (matrixSize * (i - 1)));
      }
    }
    for (i = 0; i <= matrixSize * matrixSize - 4; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3]// האופציות לבחירת שורה של 4
      let decidedColor = squares[i].style.backgroundImage//שמירת הצבע של האינקס הנוכחי
      const isBlank = squares[i].style.backgroundImage === '';
      if (notValid4.includes(i)) continue//אם זה נמצא במקום לא חוקי - ימשיך

      if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor&& !isBlank)) {//בדיקה שארבעת האיברים זהים
        state ? score += 4 : score = 0;//העלאת הציון
        scoreDisplay.innerHTML = score//שינוי HTML
        rowOfFour.forEach(index => {//  השורה מתפוצצת אתחול 
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkRowForFour()

  //בדיקה על עמודה של 4
  function checkColumnForFour() {
    let theEndFour = (matrixSize - 3) * matrixSize - 1;//השורה האחרונה אליה הלולאה יכולה להגיע כדי לבדוק עמודה
    for (i = 0; i <= theEndFour; i++) {
      let columnOfFour = [i, i + matrixSize, i + matrixSize * 2, i + matrixSize * 3]//האופציות לבחירת עמודה של 4 זהה
      let decidedColor = squares[i].style.backgroundImage//שמירת הצבע של האינקס הנוכחי
      const isBlank = squares[i].style.backgroundImage === '';
      if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor&& !isBlank)) {//בדיקה שארבעת האיברים זהים
        state ? score += 4 : score = 0;//העלאת הציון
        scoreDisplay.innerHTML = score//שינוי HTML
        columnOfFour.forEach(index => {//  השורה מתפוצצת אתחול
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkColumnForFour()

  //בדיקה על שורה של 3
  function checkRowForThree() {
    let notValid3 = [];//יוצר מערך לשמירת המקומות האסורים
    for (i = 1; i <= matrixSize; i++) {//כמספר השורות
      for (j = 1; j <= 2; j++) {//כמה מקומות בסוף השורה א"א
        notValid3.push(matrixSize - j + (matrixSize * (i - 1)));
      }
    }
    for (i = 0; i <= matrixSize * matrixSize - 3; i++) {
      let rowOfThree = [i, i + 1, i + 2]//האופציות לבחירת שורה של 3 זהה
      let decidedColor = squares[i].style.backgroundImage//שמירת הצבע של האינקס הנוכחי
      const isBlank = squares[i].style.backgroundImage === '';
      if (notValid3.includes(i)) continue//אם זה נמצא במקום לא חוקי - ימשיך

      if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor&& !isBlank)) {//בדיקה ששלושת האיברים זהים
        state ? score += 3 : score = 0;//העלאת הציון
        scoreDisplay.innerHTML = score//שינוי HTML
        rowOfThree.forEach(index => {//  השורה מתפוצצת אתחול
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkRowForThree()

  //בדיקה על עמודה של 3
  function checkColumnForThree() {
    let theEndThree = (matrixSize - 2) * matrixSize - 1;//השורה האחרונה אליה הלולאה יכולה להגיע כדי לבדוק עמודה
    for (i = 0; i <= theEndThree; i++) {
      let columnOfThree = [i, i + matrixSize, i + matrixSize * 2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === '';
      if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor&& !isBlank)) {
        state ? score += 3 : score = 0;
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkColumnForThree()


  window.setInterval(function () {//אתחול כל זמן של ריענון הדף
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
    fillSquare()

  }, 100)
})

