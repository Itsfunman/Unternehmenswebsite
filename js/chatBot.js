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

      //Transforms the data into an array
      const lines = data.split("\n");
      const lineNumber = 0;

      addLines(lineNumber, lines);
    })
    .catch((error) => {
      console.error("Error fetching the file:", error);
    });
});

function addLines(lineNumber, lines) {
  const specificLine = lines[lineNumber];

  if (specificLine) { // Check if line exists
    const { lineType, lineContent, end } = getLineElements(specificLine);
    addMessage(lineType, lineContent);
    addInputOptions(end, lines, lineNumber);
  }
}
//Gets the content of the line
function getLineElements(specificLine) {
  const splitLine = specificLine.split(" ");
  const lineType = getElementAttribute(splitLine[0]);
  const lineContent = getLineContent(splitLine);
  const end = getEndNumbers(splitLine[splitLine.length - 1]);

  return { lineType, lineContent, end };
}

//Returns the type of the line
function getElementAttribute(lineType) {
  if (lineType == "[O]") {
    return "p";
  } else if (lineType == "[C]") {
    return "button";
  } else if (lineType == "[I]") {
    return "input";
  }
}

function getLineContent(line) {
  let lineContent = "";

  for (let i = 1; i < line.length - 1; i++) {
    lineContent += line[i] + " ";
  }

  return lineContent.trim(); // Trim to remove extra space at the end
}

function getEndNumbers(end) {
  const cleanedEnd = end.replace(/\[|\]/g, "");
  return cleanedEnd.split(",");
}

//adds the text to the chatbox
function addMessage(lineType, lineContent) {
  const messageElement = document.createElement(getElementAttribute(lineType));
  messageElement.textContent = lineContent;
  chatbox.appendChild(messageElement);
}

// Adds the next element
function addInputOptions(end, lines, lineNumber) {
  // Split the cleaned string at each comma
  const resultArray = end;

  for (let i = 0; i < resultArray.length; i++) {
    lineNumber += 1;

    const { lineType, lineContent, end } = getLineElements(lines[lineNumber]);

    // Create an element
    const element = document.createElement(lineType);

    // Append the element to the chatbox and set its text content
    chatbox.appendChild(element).textContent = lineContent;

    if (lineType === "button") {
      element.addEventListener("click", () => {
        console.log(end)
        addLines(end, lines);
      });
    } else if (lineType === "input") {
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          // Check for Enter key
          if (lineNumber + 1 == 26 || lineNumber + 1 == 27) {
            if (element.textContent < 0) {
              element.textContent = 1;
            } else if (element.textContent > 10) {
              element.textContent = 10;
            }
            if (lineNumber == 26) {
              element.textContent *= 3000;
            } else {
              element.textContent *= 9000;
            }
          } else {
            if (element.textContent < 0) {
              element.textContent = 1;
            }
            element.textContent *= 200;
          }
        }
      });
    }
  }
}
