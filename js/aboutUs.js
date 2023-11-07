// This function updates a counter element with a specified increment and target value
// over a period of time with a specified delay (ms) between each update.
function updateCounter(element, i, increment, target, ms) {
    return new Promise((resolve) => {
      // This inner function is used to perform the counter updates
      function step() {
        element.innerText = i;
        if (i < target) {
          // Schedule the next step with a delay of ms milliseconds
          setTimeout(step, ms);
          i += increment;
        } else {
          // If the counter reaches the target value, resolve the Promise to signal completion
          resolve();
        }
      }
      // Start the counter update process
      step();
    });
  }

  var employeeCount = document.getElementById("employeeCount");
  var revenue = document.getElementById("revenue");
  
  // This async function runs both counters concurrently using Promise.all
  async function runCounters() {
    // Use Promise.all to run both counter updates concurrently
    await Promise.all([
      updateCounter(employeeCount, 10, 2, 24, 100),
      updateCounter(revenue, 1000000, 100000, 3600000, 50)
    ]);
  }
  
  runCounters();
  