function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatOperand(n) {
  return n < 0 ? `(${n})` : `${n}`;
}

function startQuiz(generateProblem) {
  const problemEl = document.getElementById('problem');
  const form = document.getElementById('answer-form');
  const input = document.getElementById('answer-input');
  const feedbackEl = document.getElementById('feedback');
  const scoreEl = document.getElementById('score');
  const nextButton = document.getElementById('next-button');

  let correctCount = 0;
  let attemptCount = 0;
  let currentAnswer = null;

  function updateScore() {
    scoreEl.textContent = `Score: ${correctCount} / ${attemptCount}`;
  }

  function nextProblem() {
    const { display, answer } = generateProblem();
    currentAnswer = answer;
    problemEl.textContent = `${display} = ?`;
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    input.value = '';
    input.disabled = false;
    nextButton.classList.add('hidden');
    input.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.disabled) return;
    if (input.value.trim() === '') return;

    const userAnswer = parseInt(input.value, 10);
    attemptCount++;

    if (userAnswer === currentAnswer) {
      correctCount++;
      feedbackEl.textContent = 'Correct!';
      feedbackEl.className = 'feedback correct';
    } else {
      feedbackEl.textContent = `Not quite. The answer is ${currentAnswer}.`;
      feedbackEl.className = 'feedback incorrect';
    }

    updateScore();
    input.disabled = true;
    nextButton.classList.remove('hidden');
    nextButton.focus();
  });

  nextButton.addEventListener('click', nextProblem);

  updateScore();
  nextProblem();
}
