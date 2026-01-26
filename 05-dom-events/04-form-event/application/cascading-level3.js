var container = document.getElementById("container");
//   var provinceSelect = document.querySelector("#province");
//   var citySelect = document.querySelector("#city");
//   var areaSelect = document.querySelector("#area");
var selectArr = [];
init(container, data);

/**
 * initialize a drop down list.
 * @param {HTMLElement} elem container
 * @param {Array} data data used to initialize the drop-down list.
 */
function init(elem, data) {
  // 1. create select elem
  var select = document.createElement("select");
  selectArr.push(select);
  var len = data.length;
  for (var i = 0; i < len; i++) {
    var option = document.createElement("option");
    // id: used for searching
    option.value = data[i].pid || data[i].cid || data[i].aid; // option attribute that is usually sent to the server
    option.text = data[i].name; // visible text
    select.appendChild(option);
  }
  elem.appendChild(select);
  // If the first item has children, create additional dropdowns for cascading.
  if (data[0].children) {
    init(elem, data[0].children);
  }
}

// change event for city
selectArr[0].addEventListener("change", _changeCities);

function _changeCities() {
  // find matching id
  var _index = this.selectedIndex;
  var id = this.options[_index].value;
  var children = findChildren(
    data,
    function (item) {
      return item.pid === id;
    },
    0
  );
  // city
  fillOptions(selectArr[1], children);
  // area
  fillOptions(selectArr[2], children[0].children);
}

// change event for area

selectArr[1].addEventListener("change", _changeAreas);

function _changeAreas() {
  var _index = this.selectedIndex;
  var id = this.options[_index].value;
  var children = findChildren(
    data,
    function (item) {
      return item.cid === id;
    },
    1
  );
  // area
  fillOptions(selectArr[2], children);
}

/**
 * Return children based on a condition and limit the recursion depth.
 * @param {*} data - The nested data structure to search through.
 * @param {Function} fn - The condition function to test each item.
 * @param {number} depth - The depth of recursion. Default is 100.
 * @returns {Array | null} - Returns the children array if found, or null if not found.
 */
function findChildren(data, fn, depth = 100) {
  var len = data.length;
  for (var i = 0; i < len; i++) {
    var item = data[i];
    if (fn(item, i, data)) {
      return item.children; // if found, return.
    } else {
      if (item.children && depth > 0) {
        var res = findChildren(item.children, fn, depth - 1); // recursion.
        if (res) return res; // if res is not undefined, return.
      }
    }
  }
  return null;
}

/**
 * append options filled with data.
 * @param {*} elem: container element
 * @param {*} data: data used to fill options.
 */
function fillOptions(elem, data) {
  if (!(elem instanceof HTMLElement)) return;
  if (!Array.isArray(data)) return;
  if (data.length === 0) return;
  elem.innerHTML = "";
  var len = data.length;
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < len; i++) {
    var option = document.createElement("option");
    option.value = data[i].pid || data[i].cid || data[i].aid;
    option.text = data[i].name;
    fragment.appendChild(option);
  }
  elem.appendChild(fragment);
}
