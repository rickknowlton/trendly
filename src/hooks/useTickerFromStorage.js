/* eslint-disable react/style-prop-object */
/*global chrome*/
import { useState, useEffect } from "react";

function useTickerFromStorage() {
  const [ticker, setTicker] = useState("SPY");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chrome && chrome.storage) {
      chrome.storage.local.get("selectedTicker", (data) => {
        if (data.selectedTicker) {
          console.log(`Retrieved ticker: ${data.selectedTicker}`);
          setTicker(data.selectedTicker);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (chrome && chrome.runtime) {
        const messageListener = (request, sender, sendResponse) => {
          if (request.action === "updateTicker") {
            console.log(`Received message from content script: ${request.ticker}`);
            setTicker(request.ticker);
          }
        };

        chrome.runtime.onMessage.addListener(messageListener);

        return () => {
          chrome.runtime.onMessage.removeListener(messageListener);
        };
      }
    } catch (error) {
      console.error("Error with chrome runtime: ", error);
    }
  }, []);

  return { ticker, setTicker, loading };
}

export default useTickerFromStorage;
