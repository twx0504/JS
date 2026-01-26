var container = document.getElementById("container");
var findChildren = find;
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

  // bind ids on selects during initialization.
  bindIds(data[0], select, DEFAULT_LEVELS);

  // If the first item has children, create additional dropdowns for cascading.
  if (data[0].children) {
    init(elem, data[0].children);
  }
}

// change event for provinceSelect
selectArr[0].addEventListener("change", _changeCities);

function _changeCities() {
  // find matching id
  var _index = this.selectedIndex;
  var id = this.options[_index].value;
  this.dataset.pid = id;
  var children = findChildren(data, { pid: id });
  // city
  fillOptions(selectArr[1], children, DEFAULT_LEVELS);
  // area
  fillOptions(selectArr[2], children[0].children, DEFAULT_LEVELS);
}

// change event for citySelect

selectArr[1].addEventListener("change", _changeAreas);

function _changeAreas() {
  var _index = this.selectedIndex;
  var id = this.options[_index].value;
  this.dataset.cid = id;
  var children = findChildren(data, { pid: selectArr[0].dataset.pid, cid: id });
  // area
  fillOptions(selectArr[2], children, DEFAULT_LEVELS);
}

// change event for areaSelect (not necessary in this case)
selectArr[2].addEventListener("change", function(){
  var _index = this.selectedIndex;
  var id = this.options[_index].value;
  this.dataset.aid = id;
  // so far there's no children under area.
})

/**
 * append options filled with data.
 * @param {*} elem: container element
 * @param {*} data: data used to fill options.
 */
function fillOptions(elem, data, levels) {
  if (!(elem instanceof HTMLElement)) return;
  if (!Array.isArray(data)) return;
  if (data.length === 0) return;

  elem.innerHTML = "";

  // update the select data-id attribute when the select option changes.
  // it ensures the current select and its next select's id is somehow matched.
  bindIds(data[0], elem, levels);

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

function bindIds(item, el, level) {
  var depth = level.length;
  for (var i = 0; i < depth; i++) {
    var key = level[i];
    item[key] && (el.dataset[key] = item[key]);
  }
  // data[0].pid && (select.dataset.pid = data[0].pid);
  // data[0].cid && (select.dataset.cid = data[0].cid);
  // data[0].aid && (select.dataset.aid = data[0].aid);
}

function showIds(levels){
  var depth = levels.length;
  var ids = {}
  for (var i = 0; i < depth; i++) {
    var key = levels[i];
    ids[key] = selectArr[i].dataset[key];
  }
  return ids;
}