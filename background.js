chrome.commands.onCommand.addListener(async (command) => {
  if (command === "translate-selection") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async () => {
        const text = window.getSelection().toString();
        if (!text) {
          alert("אין טקסט מסומן!");
          return;
        }
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "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"
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Translate this to Hebrew:\n${text}` }]
          })
        });
        const data = await res.json();
        alert(data.choices[0].message.content);
      },
    });
  }
});
