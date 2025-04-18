document.addEventListener('DOMContentLoaded', function () {
  const saveWordEnBtn = document.getElementById('save-word-en');
  const saveWordViBtn = document.getElementById('save-word-vi');
  const memorizedListSection = document.getElementById('memorized-list-section');
  const memorizedListPopup = document.getElementById('memorized-list-popup');
  const popup = document.getElementById('memorized-popup');
  const closePopupBtn = document.getElementById('close-popup');

  // Ẩn các nút "Ghi nhớ" nếu có
  setTimeout(() => {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
      if (btn.textContent.trim() === 'Ghi nhớ') {
        btn.style.display = 'none';
      }
    });
  }, 300);

  // Lưu một mục "từ - nghĩa"
  function saveWord(pair) {
    if (!pair || !pair.word || !pair.meaning) return;

    const entry = `${pair.word} - ${pair.meaning}`;
    let savedWords = JSON.parse(localStorage.getItem('memorizedWords')) || [];

    if (!savedWords.includes(entry)) {
      savedWords.push(entry);
      localStorage.setItem('memorizedWords', JSON.stringify(savedWords));
      renderMemorizedWords();
    }
  }

  // Xóa từ khỏi danh sách
  function removeWord(entry) {
    let savedWords = JSON.parse(localStorage.getItem('memorizedWords')) || [];
    savedWords = savedWords.filter(e => e !== entry);
    localStorage.setItem('memorizedWords', JSON.stringify(savedWords));
    renderMemorizedWords();
  }

  // Hiển thị danh sách từ đã lưu
  function renderMemorizedWords() {
    const words = JSON.parse(localStorage.getItem('memorizedWords')) || [];

    memorizedListSection.innerHTML = '';
    memorizedListPopup.innerHTML = '';

    if (words.length === 0) {
      const emptyMsg1 = document.createElement('li');
      emptyMsg1.textContent = 'Bạn chưa ghi nhớ từ nào.';
      const emptyMsg2 = emptyMsg1.cloneNode(true);
      memorizedListSection.appendChild(emptyMsg1);
      memorizedListPopup.appendChild(emptyMsg2);
    } else {
      words.forEach(entry => {
        const li1 = document.createElement('li');
        li1.textContent = entry;

        const li2 = document.createElement('li');
        li2.textContent = entry;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.title = 'Bỏ ghi nhớ';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeWord(entry);

        li1.appendChild(removeBtn);
        memorizedListSection.appendChild(li1);
        memorizedListPopup.appendChild(li2);
      });
    }
  }

  // Xử lý lưu từ tiếng Anh → Việt
  saveWordEnBtn.addEventListener('click', () => {
    const word = document.getElementById('word-input-en').value.trim();
    const result = document.getElementById('result-en').textContent.trim();
    if (word && result) {
      saveWord({ word: word, meaning: result });
    }
  });

  // Xử lý lưu từ tiếng Việt → Anh
  saveWordViBtn.addEventListener('click', () => {
    const word = document.getElementById('word-input-vi').value.trim();
    const result = document.getElementById('result-vi').textContent.trim();
    if (word && result) {
      saveWord({ word: word, meaning: result });
    }
  });

  // Hiện popup khi load trang
  function showPopupIfNeeded() {
    popup.classList.remove('hidden');
  }

  closePopupBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  renderMemorizedWords();
  showPopupIfNeeded();
});
