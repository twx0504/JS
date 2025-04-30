var data = [
  {
    pid: "01",
    name: "Johor",
    children: [
      {
        cid: "0101",
        name: "Johor Bahru",
        children: [
          { aid: "010101", name: "Skudai" },
          { aid: "010102", name: "Larkin" },
          { aid: "010103", name: "Taman Molek" },
        ],
      },
      {
        cid: "0102",
        name: "Batu Pahat",
        children: [
          { aid: "010201", name: "Taman Bukit Pasir" },
          { aid: "010202", name: "Parit Raja" },
          { aid: "010203", name: "Sri Gading" },
        ],
      },
      {
        cid: "0103",
        name: "Muar",
        children: [
          { aid: "010301", name: "Taman Bakri" },
          { aid: "010302", name: "Parit Bakar" },
          { aid: "010303", name: "Sungai Abong" },
        ],
      },
    ],
  },
  {
    pid: "02",
    name: "Pahang",
    children: [
      {
        cid: "0201",
        name: "Kuantan",
        children: [
          { aid: "020101", name: "Indera Mahkota" },
          { aid: "020102", name: "Beserah" },
          { aid: "020103", name: "Bukit Sekilau" },
        ],
      },
      {
        cid: "0202",
        name: "Temerloh",
        children: [
          { aid: "020201", name: "Taman Temerloh Jaya" },
          { aid: "020202", name: "Kampung Pangsenam" },
          { aid: "020203", name: "Mentakab" },
        ],
      },
      {
        cid: "0203",
        name: "Bentong",
        children: [
          { aid: "020301", name: "Karak" },
          { aid: "020302", name: "Bukit Tinggi" },
          { aid: "020303", name: "Kampung Perting" },
        ],
      },
    ],
  },
  {
    pid: "03",
    name: "Penang",
    children: [
      {
        cid: "0301",
        name: "George Town",
        children: [
          { aid: "030101", name: "Pulau Tikus" },
          { aid: "030102", name: "Jelutong" },
          { aid: "030103", name: "Tanjung Tokong" },
        ],
      },
      {
        cid: "0302",
        name: "Bayan Lepas",
        children: [
          { aid: "030201", name: "Sungai Ara" },
          { aid: "030202", name: "Relau" },
          { aid: "030203", name: "Bayan Baru" },
        ],
      },
      {
        cid: "0303",
        name: "Bukit Mertajam",
        children: [
          { aid: "030301", name: "Alma" },
          { aid: "030302", name: "Taman Sri Rambai" },
          { aid: "030303", name: "Machang Bubok" },
        ],
      },
    ],
  },
];

/**
 * Deep Comprehensive Query
 * @param {Array} data
 * @param {function} fn comparison function
 * @param {number} n depth of recursion - the max depth to be searched. It will greatly reduce the amount of data to search in the deeper layers.
 */
// var a = 1; // for checking the number of recursion
function find(data, fn, n = 10) {
  if (!Array.isArray(data)) return null;
  if (typeof fn !== "function") return null;
  if (typeof n !== "number") return null;
  if (data.length === 0) return null;
  var len = data.length;
  for (var i = 0; i < len; i++) {
    // console.log(a++);
    if (fn(data[i], i, data)) {
      // terminating condition
      return data[i].children;
    } else {
      if (data[i].children && n > 0) {
        // if children exists.
        // note: n - 1 will not change the current n.
        // For the next item of the same level, it will work well,
        // There's no need to readjust the n.
        var res = find(data[i].children, fn, n - 1); // receive the result
        if (res) {
          // if there's res
          return res;
        }
      }
    }
  }
  return null;
}

console.log(
  find(
    data,
    function (item) {
      return item.pid === "01";
    },
    1
  )
);
