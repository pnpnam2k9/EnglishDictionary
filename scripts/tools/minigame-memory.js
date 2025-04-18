const startBtn = document.getElementById('start-game-btn');
const wordListSection = document.getElementById('word-list');
const wordDisplay = document.getElementById('word-display');
const answerPhase = document.getElementById('answer-phase');
const answerForm = document.getElementById('answer-form');
const timerDisplay = document.getElementById('timer');
const resultSection = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const leaderboardSection = document.getElementById('leaderboard');
const restartBtn = document.getElementById('restart-btn');
let words = [];
let translations = [];
let timer;
let timeLeft;
let currentWordIndex = 0;
let score = 0;

// Giữ bảng xếp hạng
let leaderboard = [];

// Lấy 5 từ ngẫu nhiên
async function getRandomWords() {
    const response = await fetch('https://random-word-api.vercel.app/api?words=5');
    return await response.json();
}

// Dịch từ sang tiếng Việt
// Dịch từ sang tiếng Việt sử dụng Yandex API
async function translate(word) {
    const apiKey = 'YOUR_YANDEX_API_KEY';  // Thay thế bằng API key của bạn
    try {
        const res = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${word}&lang=en-vi`);
        const data = await res.json();
        return data.text[0] || '(không dịch được)';
    } catch (e) {
        console.error('Lỗi dịch:', word, e);
        return '(lỗi)';
    }
}


// Hiển thị từ và nghĩa trong 40 giây
async function showWords() {
    wordDisplay.innerHTML = '';
    words = await getRandomWords();
    translations = await Promise.all(words.map(w => translate(w)));

    words.forEach((word, index) => {
        const li = document.createElement('li');
        li.textContent = `${word} - ${translations[index]}`;
        wordDisplay.appendChild(li);
    });

    wordListSection.classList.remove('hidden');

    // Sau 40 giây, ẩn nghĩa và cho người chơi điền
    setTimeout(() => {
        wordListSection.classList.add('hidden');
        startAnswerPhase();
    }, 40000);  // 40 giây cho việc học từ
}

// Bắt đầu giai đoạn nhập nghĩa cho từ hiện tại
function startAnswerPhase() {
    answerPhase.classList.remove('hidden');
    answerForm.innerHTML = '';

    const word = words[currentWordIndex];
    const div = document.createElement('div');
    div.innerHTML = `<label>${word}: <input type="text" data-index="${currentWordIndex}"></label>`;
    answerForm.appendChild(div);

    timeLeft = 25;
    timerDisplay.textContent = `Thời gian: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Thời gian: ${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

// Tính điểm cho từ hiện tại
function submitAnswer() {
    clearInterval(timer);

    const input = answerForm.querySelector('input');
    const userAns = input.value.trim().toLowerCase();
    const correct = translations[currentWordIndex].toLowerCase();

    if (userAns === correct) {
        score += 5;
    } else {
        score -= 3;
    }

    // Chuyển sang từ tiếp theo hoặc kết thúc trò chơi
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        startAnswerPhase();  // Tiếp tục với từ tiếp theo
    } else {
        showResult();  // Kết thúc trò chơi
    }
}

// Hiển thị kết quả sau khi hoàn thành tất cả các từ
function showResult() {
    resultSection.classList.remove('hidden');
    scoreDisplay.textContent = `Điểm của bạn: ${score}`;

    // Lưu điểm vào bảng xếp hạng
    leaderboard.push({ score });
    leaderboard.sort((a, b) => b.score - a.score); // Sắp xếp bảng xếp hạng

    // Cập nhật bảng xếp hạng
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';
    leaderboard.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `#${index + 1}: ${player.score} điểm`;
        rankingList.appendChild(li);
    });
}

// Sự kiện bắt đầu trò chơi
startBtn.addEventListener('click', () => {
    resultSection.classList.add('hidden');
    currentWordIndex = 0;  // Reset lại chỉ số từ
    score = 0;  // Reset lại điểm số
    showWords();
});

// Sự kiện chơi lại trò chơi
restartBtn.addEventListener('click', () => {
    resultSection.classList.add('hidden');
    currentWordIndex = 0;  // Reset lại chỉ số từ
    score = 0;  // Reset lại điểm số
    leaderboard = []; // Reset bảng xếp hạng
    showWords();
});
