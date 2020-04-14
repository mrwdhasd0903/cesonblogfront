function ChangeDateFormat(date) {
  var arr = date.split("T");
  var d = arr[0];
  var darr = d.split("-");

  var t = arr[1];
  var tarr = t.split(".000");
  var marr = tarr[0].split(":");

  var dd =
    parseInt(darr[0]) +
    "年" +
    parseInt(darr[1]) +
    "月" +
    parseInt(darr[2]) +
    "日" +
    parseInt(marr[0]) +
    ":" +
    parseInt(marr[1]) +
    ":" +
    parseInt(marr[2]);
  return dd;
}
export default ChangeDateFormat