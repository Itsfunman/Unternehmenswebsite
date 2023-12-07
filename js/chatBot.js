// index.js
const chatbox = document.getElementById("chatbox");
document.addEventListener("DOMContentLoaded", () => {
  fetch("../other/chatbot.txt")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log("File content:", data); // Log the file content

      const lines = data.split("\n");
      const lineNumber = 24;

      const specificLine = lines[lineNumber];
      const { lineType, lineContent, end } = getLineElements(specificLine);
      addMessage(lineType, lineContent);
      addInputOptions(end, lines, lineNumber);

    })
    .catch((error) => {
      console.error("Error fetching the file:", error);
    });
});

function getLineContent(line) {
  let lineContent = "";

  for (let i = 1; i < line.length - 1; i++) {
    lineContent += line[i] + " ";
  }

  return lineContent;
}

function getLineElements(specificLine) {
  let duplicateLine = specificLine.split(" ");
  const lineType = duplicateLine[0];
  const end = duplicateLine[duplicateLine.length - 1];
  const lineContent = getLineContent(duplicateLine);

  return { lineType, lineContent, end };
}

function addMessage(lineType, lineContent) {
  const messageElement = document.createElement(getElementAttribute(lineType));
  messageElement.textContent = lineContent;
  chatbox.appendChild(messageElement);
}

function getElementAttribute(lineType) {
  if (lineType == "[O]") {
    return "p";
  } else if (lineType == "[C]") {
    return "button";
  } else if (lineType == "[I]") {
    return "input";
  }
}

function addInputOptions(end, lines, lineNumber) {
    // Convert the array to a string and remove non-digit characters except commas
    const cleanedEnd = end.replace(/[^\d,]/g, '');

    // Split the cleaned string at each comma
    const resultArray = cleanedEnd.split(',');

    // Now resultArray contains the individual numbers without brackets
    console.log(resultArray);

    for (let i = 0; i < resultArray.length; i++) {
        const specificLine = lines[lineNumber += 1];
        const { lineType, lineContent, end } = getLineElements(specificLine);
        addMessage(lineType, lineContent);
    } 
}
