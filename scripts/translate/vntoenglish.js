document.getElementById("search-btn-en").addEventListener("click", () => {
    const word = document.getElementById("word-input-en").value.trim();
    const resultBox = document.getElementById("result-en");
  
    if (word === "") {
      resultBox.textContent = "Vui lòng nhập từ tiếng Anh.";
      return;
    }
  
    fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: word,
        source: "en",
        target: "vi",
        format: "text"
      })
    })
      .then(res => res.json())
      .then(data => {
        resultBox.textContent = data.translatedText;
      })
      .catch(err => {
        console.error(err);
        resultBox.textContent = "Không thể dịch lúc này. Hãy thử lại sau.";
      });
  });
  