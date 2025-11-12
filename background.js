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
            "Authorization": "Bearer KEY_HERE"
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
