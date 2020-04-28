// function ChangeDateFormat(date) {
//   var arr = date.split("T");
//   var d = arr[0];
//   var darr = d.split("-");

//   var t = arr[1];
//   var tarr = t.split(".000");
//   var marr = tarr[0].split(":");

//   var dd =
//     parseInt(darr[0]) +
//     "年" +
//     parseInt(darr[1]) +
//     "月" +
//     parseInt(darr[2]) +
//     "日" +
//     parseInt(marr[0]) +
//     ":" +
//     parseInt(marr[1]) +
//     ":" +
//     parseInt(marr[2]);
//   return dd;
// }
function ChangeDateFormat(date) {
  var arr = date.split("T");
  var d = arr[0];
  var darr = d.split('-');
  var t = arr[1];
  var tarr = t.split('.000');
  var marr = tarr[0].split(':');
  var dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
  return formatDateTime(dd);
}


function formatDateTime(date) {
  let time = new Date(Date.parse(date));
  time.setTime(time.setHours(time.getHours() + 8));
  let Y = time.getFullYear() + '-';
  let M = addZero(time.getMonth() + 1) + '-';
  let D = addZero(time.getDate()) + ' ';
  let h = addZero(time.getHours()) + ':';
  let m = addZero(time.getMinutes()) + ':';
  let s = addZero(time.getSeconds());
  return Y + M + D + h + m + s;
}

function addZero(num) {
  return num < 10 ? '0' + num : num;
}
export default ChangeDateFormat