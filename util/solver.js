function solve() {
    return [JSON.parse(window.localStorage.getItem('nyt-wordle-state'))['solution']]
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try {
        let answer = solve();
        let suggestion = answer[0];
        sendResponse({answer});
    } catch (e) {
        console.error("encountered JSON parse error", e);
    }
});

chrome.runtime.sendMessage(solve());