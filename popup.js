// Run when the popup is clicked
document.addEventListener('DOMContentLoaded', async () => {
  const title = document.getElementById('title');
  const answerHTML = document.getElementById('answer');

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.tabs.sendMessage(tab.id, {}, ({ answer }) => {
    title.innerHTML = `Answer`;
    answerHTML.innerHTML = `<p>${answer.map(word => `${word.toUpperCase()}`).join(', ')}</p>`;
    chrome.action.setBadgeText({ text: `${answer.length || 1}`, tabId: tab.id });
    chrome.action.setBadgeBackgroundColor({ color: '#538d4e' });
  });
})

function injectTheScript() {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['sim_input.js']})
  })
}

document.getElementById('answer').addEventListener('click', injectTheScript);