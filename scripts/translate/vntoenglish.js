document.getElementById("search-btn-vi").addEventListener("click", () => {
  const word = document.getElementById("word-input-vi").value.trim();
  const resultBox = document.getElementById("result-vi");

  if (word === "") {
    resultBox.textContent = "Vui lòng nhập từ tiếng Việt.";
    return;
  }

  resultBox.innerHTML = "<p>Đang dịch...</p>";

  fetch("https://libretranslate.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: word,
      source: "vi",
      target: "en",
      format: "text"
    })
  })
    .then(res => res.json())
    .then(async data => {
      const translatedWord = data.translatedText;

      // Lấy word family
      const familyRes = await fetch(`https://api.datamuse.com/words?ml=${translatedWord}`);
      const familyData = await familyRes.json();
      const wordFamily = familyData.slice(0, 5).map(item => item.word); // lấy 5 từ liên quan

      resultBox.innerHTML = `
        <p><strong>English:</strong> ${translatedWord}</p>
        <p><strong>Word Family (related):</strong> ${wordFamily.join(', ')}</p>
      `;
    })
    .catch(err => {
      console.error(err);
      resultBox.textContent = "Không thể dịch lúc này. Hãy thử lại sau.";
    });
});
