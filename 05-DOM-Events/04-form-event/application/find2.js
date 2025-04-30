// var data = [
//   {
//     pid: "01",
//     name: "Johor",
//     children: [
//       {
//         cid: "0101",
//         name: "Johor Bahru",
//         children: [
//           { aid: "010101", name: "Skudai" },
//           { aid: "010102", name: "Larkin" },
//           { aid: "010103", name: "Taman Molek" },
//         ],
//       },
//       {
//         cid: "0102",
//         name: "Batu Pahat",
//         children: [
//           { aid: "010201", name: "Taman Bukit Pasir" },
//           { aid: "010202", name: "Parit Raja" },
//           { aid: "010203", name: "Sri Gading" },
//         ],
//       },
//       {
//         cid: "0103",
//         name: "Muar",
//         children: [
//           { aid: "010301", name: "Taman Bakri" },
//           { aid: "010302", name: "Parit Bakar" },
//           { aid: "010303", name: "Sungai Abong" },
//         ],
//       },
//     ],
//   },
//   {
//     pid: "02",
//     name: "Pahang",
//     children: [
//       {
//         cid: "0201",
//         name: "Kuantan",
//         // do not have children (intentional)
//       },
//       {
//         cid: "0202",
//         name: "Temerloh",
//         children: [
//           { aid: "020201", name: "Taman Temerloh Jaya" },
//           { aid: "020202", name: "Kampung Pangsenam" },
//           { aid: "020203", name: "Mentakab" },
//         ],
//       },
//       {
//         cid: "0203",
//         name: "Bentong",
//         children: [
//           { aid: "020301", name: "Karak" },
//           { aid: "020302", name: "Bukit Tinggi" },
//           { aid: "020303", name: "Kampung Perting" },
//         ],
//       },
//     ],
//   },
//   {
//     pid: "03",
//     name: "Penang",
//     children: [
//       {
//         cid: "0301",
//         name: "George Town",
//         children: [
//           { aid: "030101", name: "Pulau Tikus" },
//           { aid: "030102", name: "Jelutong" },
//           { aid: "030103", name: "Tanjung Tokong" },
//         ],
//       },
//       {
//         cid: "0302",
//         name: "Bayan Lepas",
//         children: [
//           { aid: "030201", name: "Sungai Ara" },
//           { aid: "030202", name: "Relau" },
//           { aid: "030203", name: "Bayan Baru" },
//         ],
//       },
//       {
//         cid: "0303",
//         name: "Bukit Mertajam",
//         children: [
//           { aid: "030301", name: "Alma" },
//           { aid: "030302", name: "Taman Sri Rambai" },
//           { aid: "030303", name: "Machang Bubok" },
//         ],
//       },
//     ],
//   },
// ];

var DEFAULT_LEVELS = ["pid", "cid", "aid"];

var ids1 = { pid: "01" };
var ids2 = { pid: "03", cid: "0302" }; // cid: 0201 do not have children.
var ids3 = { pid: "02", cid: "0201" }; // cid: 0201 do not have children.
var ids4 = { pid: "01", cid: "0103", aid: "010303" }; // note: aid is the deepest layer, no more children.

/**
 * Hierarchical Query
 * @param {Array} data Data to be searched.
 * @param {object} ids ids specifying the scope of searching.
 * @param {Array} levels ids specifying the correct order of searching.
 * @returns {Array | null} returns an array if found, otherwise null. If a found target doesn't have a children, returns an empty array.
 */
function find(data, ids, levels = DEFAULT_LEVELS) {
  var depth = levels.length;

  for (var i = 0; i < depth; i++) {
    var key = levels[i];
    if (!ids.hasOwnProperty(key)) {
      // If there's no current level's id in ids, return current data.
      return data;
    }
    var isFound = false;

    for (var j = 0; j < data.length; j++) {
      var item = data[j];
      if (_match(item, ids, key)) {
        data = item.children || [];
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      return null;
    }
  }
  return data;
}

function _match(item, ids, key) {
  return item[key] && item[key] === ids[key];
}

// console.log(find(data, ids1));
// console.log(find(data, ids2));
// console.log(find(data, ids3));
// console.log(find(data, ids4));
