//cname:cookie的key值
//cvalue:cookie的value值
//exdays:保存的天数
export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  // d.setTime(d.getTime() + (exdays * 1000));
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + escape(cvalue) + ";" + expires + ";path=/";
}
//存在返回value值
//不存在返回空字符串
export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return unescape(c.substring(name.length, c.length));
    }
  }
  return "";
}
