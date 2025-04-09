const inputEn = document.getElementById('word-input-en');
const suggestionsBox = document.getElementById('suggestions');

inputEn.addEventListener('input', async function () {
  const query = this.value.trim().toLowerCase();
  suggestionsBox.innerHTML = '';

  if (query.length < 2) return; // Chỉ bắt đầu gợi ý từ 2 ký tự trở lên

  try {
    const response = await fetch(`https://api.datamuse.com/sug?s=${query}`);
    const data = await response.json();

    const topSuggestions = data.slice(0, 5); // Lấy 5 từ gợi ý hàng đầu
    topSuggestions.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item.word;
      div.addEventListener('click', () => {
        inputEn.value = item.word;
        suggestionsBox.innerHTML = '';
      });
      suggestionsBox.appendChild(div);
    });
  } catch (error) {
    console.error('Không thể lấy gợi ý:', error);
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn-en");
    const wordInput = document.getElementById("word-input-en");
    const resultBox = document.getElementById("result-en");
  
    searchBtn.addEventListener("click", () => {
      const word = wordInput.value.trim();
      if (word === "") {
        resultBox.innerHTML = `<p>Vui lòng nhập từ để tra cứu.</p>`;
        return;
      }
  
      resultBox.innerHTML = `<p>Đang tra...</p>`;
  
      // Gọi API MyMemory để dịch từ
      fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|vi`)
        .then(response => response.json())
        .then(data => {
          const translated = data.responseData.translatedText;
          resultBox.innerHTML = `<h3>Kết quả:</h3><p>${translated}</p>`;
        })
        .catch(err => {
          resultBox.innerHTML = `<p>Lỗi: Không thể dịch từ.</p>`;
          console.error(err);
        });
    });
  });
  