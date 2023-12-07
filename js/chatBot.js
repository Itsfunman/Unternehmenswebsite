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

      addLines(lineNumber, lines, NaN);
    })
    .catch((error) => {
      console.error("Error fetching the file:", error);
    });
});

function addLines(lineNumber, lines, value) {
  const specificLine = lines[lineNumber];

  if (specificLine) {
    const { lineType, lineContent, end } = getLineElements(specificLine);
    addMessage(lineType, lineContent, value);
    addInputOptions(end, lines, lineNumber);
  }
}
//Gets the content of the line
function getLineElements(specificLine) {
  console.log(specificLine);
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
  console.log(end);
  if (end != "[EXIT]") {
    const cleanedEnd = end.replace(/[^\d,]/g, "");
    return cleanedEnd.split(",");
  } else {
    return [];
  }
}

//adds the text to the chatbox
function addMessage(lineType, lineContent, value) {
  if (isNaN(value)) {
    const messageElement = document.createElement(
      getElementAttribute(lineType)
    );
    messageElement.textContent = lineContent;
    chatbox.appendChild(messageElement);
  } else {
    const messageElement = document.createElement(
      getElementAttribute(lineType)
    );
    messageElement.textContent = lineContent.replace("(VALUE)", value);
    chatbox.appendChild(messageElement);
  }
}

// Adds the next element
function addInputOptions(end, lines, lineNumber) {
  // Split the cleaned string at each comma
  const resultArray = end;
  console.log(resultArray);

  for (let i = 0; i < resultArray.length; i++) {
    lineNumber = resultArray[i] - 1;

    const { lineType, lineContent, end } = getLineElements(lines[lineNumber]);

    // Create an element
    const element = document.createElement(lineType);

    // Append the element to the chatbox and set its text content
    chatbox.appendChild(element).textContent = lineContent;

    if (lineType === "button") {
      element.addEventListener("click", () => {
        console.log(end)
        if (end.length === 0) {
          console.log("CALLED");
          const exitMessage = document.createElement("p");
          exitMessage.textContent =
            "Vielen Dank für Ihr Interesse und viel Erfolg!";
          chatbox.appendChild(exitMessage);
        } else {
          addLines(end - 1, lines, NaN);
        }
      });
    } else if (lineType === "input") {
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          // Trim leading and trailing whitespaces
          const trimmedInput = element.textContent.trim();
          // Use a regex to keep only digits
          const parsedMultiplyValue = parseInt(
            trimmedInput.replace(/[^\d]/g, "")
          );

          const parsedValue = element.value.replace(/[^\d]/g, "");

          if (!isNaN(parsedValue)) {
            let value = parsedValue;

            if (value <= 0) {
              value = 1;
            }

            if (lineNumber + 1 == 26 || lineNumber + 1 == 27) {
              // Handle special cases for line 26 and 27
              if (value > 10) {
                value = 10;
              }
            }

            value *= parsedMultiplyValue;

            addLines(end - 1, lines, value);
          } else {
            console.error("Invalid input for number");
          }
        }
      });
    }
  }
}
