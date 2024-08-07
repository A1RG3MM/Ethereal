const form = document.querySelector("#searchforma");
const input = document.querySelector("#searchContent");

// const searchengine = localStorage.getItem("searchEngine");
if (form) {
  console.log("true")
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
      scope: __uv$config.prefix
    }).then(() => {
      let url = input.value.trim();
      if (!isUrl(url)) {
        url = 'https://www.google.com/search?q=' + url;
      }
      else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
        url = 'http://' + url;
      }
      localStorage.setItem("encodedProxyURL", __uv$config.prefix + __uv$config.encodeUrl(url))
    });
  });
} else {
  console.log("fasle")
}

function getUrl(item) {
  window.navigator.serviceWorker.register('./sw.js', {
    scope: __uv$config.prefix
  }).then(() => {
    let url = input.value.trim();
    if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
    return __uv$config.prefix + __uv$config.encodeUrl(url);
  });
}
function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  )
    return true;
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#res")) {
    document.querySelector("#res").src = localStorage.getItem("encodedProxyURL");
    saveContent();
  }
})

function saveContent() {
  setTimeout(() => {
    let tempencodedURL = document.querySelector("#res").contentWindow.location.href;
    let aa = window.location.href;
    aa = aa.replace("/textbook", "");
    tempencodedURL = tempencodedURL.replace(aa, "");
    localStorage.setItem("encodedProxyURL", tempencodedURL);
    tempencodedURL = tempencodedURL.replace("/server/", "");
    document.getElementById("proxyLink").innerHTML = document.querySelector("#res").contentDocument.title;
    document.getElementById("proxyLink").href = aa + __uv$config.prefix + tempencodedURL;
    document.getElementById("faviconProxy").src = `https://www.google.com/s2/favicons?domain=${__uv$config.decodeUrl(tempencodedURL)}`
    
    console.log("a")
    saveContent()
  }, 500);
}