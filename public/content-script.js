/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateTicker") {
      chrome.storage.local.set({ selectedTicker: request.ticker }, () => {
        console.log(`Stored ticker: ${request.ticker}`);
      });
    }
  });
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateTicker") {
      chrome.runtime.sendMessage({
        action: "storeTicker",
        ticker: request.ticker,
      });
    }
  });
  