const textarea = document.getElementById("dialogue-input");

const summarizeButton = document.getElementById("summarize-btn");

const clearButton = document.getElementById("clear-btn");

const copyButton = document.getElementById("copy-btn");

const summaryText = document.getElementById("summary-text");

const characterCount = document.getElementById("character-count");

/* =========================
           CHARACTER COUNTER
        ========================= */

textarea.addEventListener("input", () => {
  characterCount.textContent = textarea.value.length;
});

/* =========================
           CLEAR
        ========================= */

clearButton.addEventListener("click", () => {
  textarea.value = "";

  characterCount.textContent = "0";

  summaryText.className = "empty-state";

  summaryText.innerHTML = `
                <div class="empty-icon">✦</div>
                <p>Your generated summary will appear here.</p>
            `;

  copyButton.disabled = true;

  textarea.focus();
});

/* =========================
           SUMMARIZE
        ========================= */

summarizeButton.addEventListener("click", async () => {
  const dialogue = textarea.value.trim();

  if (!dialogue) {
    textarea.focus();

    return;
  }

  summarizeButton.disabled = true;

  clearButton.disabled = true;

  summaryText.className = "";

  summaryText.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    Generating summary...
                </div>
            `;

  copyButton.disabled = true;

  try {
    const response = await fetch("http://127.0.0.1:8000/summarize", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        dialogue: dialogue,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.summary) {
      throw new Error("No summary was returned.");
    }

    summaryText.className = "";

    summaryText.textContent = data.summary;

    copyButton.disabled = false;
  } catch (error) {
    summaryText.className = "";

    summaryText.innerHTML = `
                    <div style="color:#f87171;">
                        Unable to generate the summary.
                        <br><br>
                        <small>${error.message}</small>
                    </div>
                `;
  } finally {
    summarizeButton.disabled = false;

    clearButton.disabled = false;
  }
});

/* =========================
           COPY SUMMARY
        ========================= */

copyButton.addEventListener("click", async () => {
  const text = summaryText.textContent.trim();

  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);

    const originalText = copyButton.textContent;

    copyButton.textContent = "Copied!";

    setTimeout(() => {
      copyButton.textContent = originalText;
    }, 1500);
  } catch (error) {
    console.error("Copy failed:", error);
  }
});
