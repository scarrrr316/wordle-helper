function solve() {
    return [JSON.parse(window.localStorage.gameState)['solution']]
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try {
        let answer = solve();
        let suggestion = answer[0];
        // sendResponse({ suggestion, answer });
        sendResponse({answer});
    } catch (e) {
        console.error("encountered JSON parse error", e);
    }
});

// Run when wordle page first opens
chrome.runtime.sendMessage(solve());