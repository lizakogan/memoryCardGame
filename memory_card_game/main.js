const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos; //הקלפים יוצגו באופן אקראי
  });
}

shuffle(); 

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this; // שומרת את הקלף שכבר התהפך
    return;
  }

  // second click
  secondCard = this;
  lockBoard = true;
  checkForMatch();//ברגע שהקלף השני התהפך יש בדיקת התאמה
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
  checkAllCardsFlipped(); // נבדוק אם כל הקלפים התהפכו אחרי שהקלפים התאימו
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];// כדי שהמשחק יוכלל להמשיך ללא תקיעות איפוס לנל
}

function checkAllCardsFlipped() {
  const allFlipped = Array.from(cards).every(card => card.classList.contains('flip'));
  const message = document.getElementById('gameOverMessage');
  if (allFlipped && message) {
    message.style.display = 'block'; // מציג את ההודעה
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));