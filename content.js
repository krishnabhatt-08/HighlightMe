// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // If the message is to get the selected text
  if (message.action === "getSelection") {
    // Get the selected text
    const selectedText = window.getSelection().toString();
    // Check if there's any selected text
    if (selectedText) {
      // Get the range object of the selection
      const range = window.getSelection().getRangeAt(0);
      // Create a new mark element
      const mark = document.createElement("mark");
      mark.innerHTML = selectedText;
      mark.style.backgroundColor = "yellow";

      chrome.storage.local.set({ highlightedText: selectedText }, function () {
        console.log("Text is stored");
      });

      // Insert the mark element into the range
      range.deleteContents();
      range.insertNode(mark);
      // Send the selected text back to the background script
      sendResponse({ selectedText });
    }
  }
});
