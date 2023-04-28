/* eslint-disable no-undef */
let createdWindowId;

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    _gaq.push(["_trackEvent", "Extension", "Extension Installed"]);
  } else if (details.reason == "update") {
    _gaq.push(["_trackEvent", "Extension", "Extension Updated"]);
  }
});

chrome.management.onUninstalled.addListener(function () {
  _gaq.push(["_trackEvent", "Extension", "Extension Uninstalled"]);
});

chrome.contextMenus.create({
  id: "openInTrendly",
  title: "Open in Trendly",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "openInTrendly") {
    let selectedText = info.selectionText.toUpperCase();
    if (isValidTicker(selectedText)) {
      chrome.storage.local.set({ ticker: selectedText }, function () {
        _gaq.push([
          "_trackEvent",
          "Popup",
          "$" + selectedText + " Opened in Trendly",
        ]);
        console.log("Ticker is set to " + selectedText);
        chrome.tabs.sendMessage(tab.id, {
          action: "updateTicker",
          ticker: selectedText,
        });
      });

      chrome.windows.create(
        {
          url: chrome.runtime.getURL("index.html"),
          type: "popup",
          width: 500,
          height: 620,
        },
        function (window) {
          createdWindowId = window.id;
        }
      );
    }
  }
});

chrome.windows.onCreated.addListener(function (window) {
  createdWindowId = window.id;
});

chrome.windows.onRemoved.addListener(function (windowId) {
  if (windowId === createdWindowId) {
    chrome.storage.local.remove("selectedTicker", function () {
      console.log("Local storage cleared");
    });
  }
});

function isValidTicker(ticker) {
  return true;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "storeTicker") {
    chrome.storage.local.set({ selectedTicker: request.ticker }, () => {
      console.log(`Stored ticker: ${request.ticker}`);
    });
  }
});

var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-XXXXXXXX-X"]);
_gaq.push(["_trackPageview"]);

(function () {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src = "https://ssl.google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();
