// =======================
//       DATA LAYER
// =======================

// Rendering
// 0. totalCells = 7 * 6 = 42 cells (total calendar grid cells to display)
// 1. How many days are in the current month?
// 2. What is the weekday of the first day of the current month? (0 = Sunday, 6 = Saturday)
// 3. How many days from the previous month need to be rendered before the first day of the current month, based on the first day weekday?
// 4. How to get the last day of the previous month? (e.g., new Date(2025, 6, 0).getDate() gives the last day of May 2025)
// 5. How many days from the next month need to be rendered to fill the calendar grid? (totalCells - leadingDays - currentMonthDays)

// 2025-06-05 (example date)

/**
 * Get the total number of days in a given month of a year
 * @param {number} year
 * @param {number} month zero-based month number [0, 11]
 * @returns {number} total days in the month
 */
function getDaysInMonth(year, month) {
  // Create a date object for the 0th day of the next month, which is the last day of the given month
  var date = new Date(year, month + 1, 0);
  return date.getDate();
}

/**
 * Get the weekday of the first day of the month
 * @param {number} year
 * @param {number} month zero-based month number [0, 11]
 * @returns {number} zero-based weekday (0 = Sunday, 6 = Saturday)
 */
function getWeekdayOfMonthStart(year, month) {
  var date = new Date(year, month, 1);
  return date.getDay();
}

/**
 * Get the days from the previous month to render as leading days in the calendar grid
 * @param {number} year
 * @param {number} month zero-based month number [0, 11]
 * @param {boolean} [isSundayFirst=false] true if Sunday is considered the first day of the week
 * @returns {Array<number>} array of day numbers from the previous month to display
 */
function getLeadingDays(year, month, isSundayFirst = false) {
  var leadingDayCount = getWeekdayOfMonthStart(year, month);

  // Adjust leading day count if Sunday is the first day of the week
  if (isSundayFirst) {
    leadingDayCount = leadingDayCount === 0 ? 6 : leadingDayCount - 1;
  }

  // Get the total days in the previous month
  var lastDate = getDaysInMonth(year, month - 1);
  var restDays = [];

  // Collect the previous month's days needed to fill the leading empty cells
  while (leadingDayCount > 0) {
    restDays.push(lastDate--);
    leadingDayCount--;
  }

  // Reverse to maintain chronological order (oldest first)
  return restDays.reverse();
}

/**
 * Get the days from the next month to render as trailing days in the calendar grid
 * @param {number} year
 * @param {number} month zero-based month number [0, 11]
 * @returns {Array<number>} array of day numbers from the next month to display
 */
function getTrailingDays(year, month, isSundayFirst = false) {
  var totalCells = 7 * 6; // 42 cells in total
  var leadingDayCount = getLeadingDays(year, month, isSundayFirst).length;
  var totalDaysInCurrentMonth = getDaysInMonth(year, month);
  var trailingDayCount = totalCells - leadingDayCount - totalDaysInCurrentMonth;
  var restDays = [];
  for (var i = 1; i <= trailingDayCount; i++) {
    restDays.push(i);
  }
  return restDays;
}

/**
 * Generate an array of all days to display in the calendar grid, including leading, current, and trailing days
 * @param {number} year
 * @param {number} month zero-based month number [0, 11]
 * @returns {Array<number>} array of day numbers for the full calendar grid
 */
function generateCalendarDays(year, month, isSundayFirst = false) {
  var totalCurrentMonthDays = getDaysInMonth(year, month);
  var currentMonthDays = [];

  for (var i = 1; i <= totalCurrentMonthDays; i++) {
    currentMonthDays.push(i);
  }

  return getLeadingDays(year, month, isSundayFirst).concat(
    currentMonthDays,
    getTrailingDays(year, month, isSundayFirst)
  );
}

// =======================
//        UI LAYER
// =======================

// function createExtraDaysTds(extraDays, isLeading = true) {
//   return extraDays.map(function (day) {
//     var td = document.createElement("td");
//     var className = isLeading ? "td prev-month" : "td next-month";
//     td.className = className;
//     td.textContent = day;
//     return td;
//   });
// }

function createExtraDaysTds(
  year,
  month,
  isLeading = true,
  isSundayFirst = false
) {

  // record prev / next year and month
  var referenceYear = year;
  var referenceMonth = month;
  var adjacentMonthDays = null;

  if (isLeading) {
    // previous month
    referenceMonth = month - 1;
    if (referenceMonth < 0) {
      referenceYear = year - 1;
      referenceMonth = 11;
    }
    adjacentMonthDays = getLeadingDays(year, month, isSundayFirst);
  } else {
    // next month
    referenceMonth = month + 1;
    if (referenceMonth > 11) {
      referenceYear = year + 1;
      referenceMonth = 0;
    }
    adjacentMonthDays = getTrailingDays(year, month, isSundayFirst);
  }
  var currentYr = getCurrentDate().year;
  var currentMth = getCurrentDate().month;
  var currentDate = getCurrentDate().date;
  var tdClass = isLeading ? "td prev-month" : "td next-month";
  return adjacentMonthDays.map(function (day) {
    var td = document.createElement("td");
    td.className = tdClass;
    var isCurrentDay =
      currentYr === referenceYear &&
      currentMth === referenceMonth &&
      currentDate === day;
    if (isCurrentDay) {
      td.classList.add("current");
    }
    td.textContent = day;
    return td;
  });
}

// function createCurrentDaysTds(currentDays) {
//   var tds = [];
//   for (var i = 1; i <= currentDays; i++) {
//     var td = document.createElement("td");
//     td.className = "td current-month";
//     td.textContent = i;
//     tds.push(td);
//   }
//   return tds;
// }

function createCurrentDaysTds(year, month, selectedDate) {
  var tds = [];
  var currentYr = getCurrentDate().year;
  var currentMth = getCurrentDate().month;
  var currentDay = getCurrentDate().date;
  var totalDays = getDaysInMonth(year, month);
  for (var i = 1; i <= totalDays; i++) {
    var td = document.createElement("td");
    if (currentYr === year && currentMth === month && currentDay === i) {
      td.className = "td current";
    } else {
      td.className = "td";
    }
    // Check if there's selectedDate
    // Remember to check the type, or convert type before use.
    if (selectedDate && selectedDate === i) {
      td.classList.add("active");
      // prevEl is global variable.
      // Without it, you cannot clear the prevEl active style.
      prevEl = td;
    }
    td.textContent = i;
    tds.push(td);
  }
  return tds;
}

function composeCalenderTds(year, month, selectedDate, isSundayFirst = false) {
  //   var leadingTds = createExtraDaysTds(
  //     getLeadingDays(year, month, isSundayFirst)
  //   );
  var leadingTds = createExtraDaysTds(year, month, true, isSundayFirst);

  var currentTds = createCurrentDaysTds(year, month, selectedDate);
  //   var trailingTds = createExtraDaysTds(
  //     getTrailingDays(year, month, isSundayFirst)
  //   );
  var trailingTds = createExtraDaysTds(year, month, false, isSundayFirst);
  return leadingTds.concat(currentTds, trailingTds);
}

function renderCalenderUI(year, month, selectedDate, isSundayFirst = false) {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var tds = composeCalenderTds(year, month, selectedDate, isSundayFirst);
  var calenderMain = document.getElementById("calender-main");
  var displayDate = document.querySelector(".calender-header .current-date");
  //   displayDate.textContent = year + " " + months[month];
  displayDate.textContent = months[month] + " " + year;
  // Remove previous content before appending new table.
  calenderMain.innerHTML = "";
  calenderMain.appendChild(_createTable(tds));

  function _createTable(tds) {
    var rows = 6;
    var cols = 7;
    var table = document.createElement("div");
    table.className = "table";
    var n = 0;
    for (var i = 0; i < rows; i++) {
      var tr = document.createElement("div");
      tr.className = "tr";
      for (var j = 0; j < cols; j++) {
        tr.appendChild(tds[n]);
        n++;
      }
      table.appendChild(tr);
    }
    return table;
  }
}

function getCurrentDate() {
  var now = new Date(); // returns an date object representing the current date and time at the moment the line runs.
  return {
    year: now.getFullYear(),
    month: now.getMonth(), // Zero-based
    date: now.getDate(),
  };
}
