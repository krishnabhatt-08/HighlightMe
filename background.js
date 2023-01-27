// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // If the message is to get the selected text
  if (message.action === "getSelection") {
    // Get the selected text
    const selectedText = window.getSelection().toString();
    // Send the selected text back to the popup
    sendResponse({ selectedText });
  }
});
