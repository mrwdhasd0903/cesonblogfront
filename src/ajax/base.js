$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  options.xhrFields = {
      withCredentials: true
    },
    options.crossDomain = true,
    options.beforeSend = XMLHttpRequest => {
      XMLHttpRequest.setRequestHeader("token", "MyToken");
    }
  options.url = "http://localhost:8088/" + originalOptions.url
});