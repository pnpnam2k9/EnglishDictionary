document.addEventListener("DOMContentLoaded", () => {
    const wordList = [
      "serendipity", "harmony", "diligent", "eloquent", "tranquil",
      "resilience", "wanderlust", "lucid", "gratitude", "nostalgia",
      "vivid", "solitude", "zeal", "empathy", "clarity"
    ];
  
    function getRandomWords(arr, count) {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  
    const dailyCard = document.getElementById("daily-word-card");
    dailyCard.innerHTML = "<p>Đang tải từ...</p>";
  
    const words = getRandomWords(wordList, 5);
    dailyCard.innerHTML = ""; // Xóa dòng loading
  
    words.forEach(word => {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
        .then(data => {
          const entry = data[0];
          const meaning = entry.meanings[0];
          const def = meaning.definitions[0];
          const phonetic = entry.phonetics?.[0]?.text || "-";
  
          const wordBlock = document.createElement("div");
          wordBlock.innerHTML = `
            <h3>${entry.word}</h3>
            <p><strong>Loại từ:</strong> ${meaning.partOfSpeech}</p>
            <p><strong>Phiên âm:</strong> ${phonetic}</p>
            <p><strong>Nghĩa:</strong> ${def.definition}</p>
          `;
          dailyCard.appendChild(wordBlock);
        })
        .catch(err => {
          console.error(`Lỗi khi tải từ '${word}':`, err);
          const errorBlock = document.createElement("div");
          errorBlock.innerHTML = `<h3>${word}</h3><p>Không thể tải thông tin từ.</p>`;
          dailyCard.appendChild(errorBlock);
        });
    });
  });
  