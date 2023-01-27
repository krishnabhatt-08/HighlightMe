// Get the save note button and download notes button
const saveNoteButton = document.getElementById("save-note-button");
const downloadNotesButton = document.getElementById("download-notes-button");

// Get the notes list element
const notesList = document.getElementById("notes-list");

// Add an event listener to the save note button
saveNoteButton.addEventListener("click", saveNote);

// Add an event listener to the download notes button
downloadNotesButton.addEventListener("click", downloadNotes);

// Function to save a note
function saveNote() {
  // Get the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Send a message to the content script to get the selected text
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getSelection" },
      function (response) {
        // If there is a selected text
        if (response && response.selectedText) {
          // Get the current timestamp
          const timestamp = Date.now();
          // Save the note to storage
          chrome.storage.local.set(
            { [timestamp]: response.selectedText },
            function () {
              // Add the note to the notes list
              addNoteToList(timestamp, response.selectedText);
            }
          );
        }
      }
    );
  });
}

// Function to download notes
function downloadNotes() {
  // Get all notes from storage
  chrome.storage.local.get(null, function (notes) {
    // Create a new Blob with the notes data
    const notesData = new Blob([JSON.stringify(notes)], {
      type: "application/json",
    });
    // Create a link element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(notesData);
    downloadLink.download = "notes.json";
    // Add the link to the document and click it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    // Remove the link from the document
    document.body.removeChild(downloadLink);
  });
}

// Function to add a note to the notes list
function addNoteToList(timestamp, text) {
  // Create a new list item for the note
  const noteItem = document.createElement("li");
  noteItem.classList.add("My_Note");
  noteItem.innerText = text;
  // Add the note item to the notes list
  notesList.appendChild(noteItem);

  chrome.storage.local.get(["highlightedText"], function (result) {
    console.log("Value currently is " + result.highlightedText);
  });
}
