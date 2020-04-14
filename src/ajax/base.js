$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  options.xhrFields = {
      withCredentials: true
    },
    options.crossDomain = true,
    options.beforeSend = XMLHttpRequest => {
      XMLHttpRequest.setRequestHeader("token", "qingnibuyaogaowo");
    }
  options.url = "http://47.113.92.137:8088/" + originalOptions.url
  // options.url = "http://localhost:8088/" + originalOptions.url
});