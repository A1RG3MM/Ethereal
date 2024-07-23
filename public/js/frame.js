const form = document.querySelector("#proxy-form");
const input = document.querySelector("#input");
// const searchengine = localStorage.getItem("searchEngine");

form.onsubmit = function() {
    window.location.href = getUrl(input)
}
// instead of rewriting the code below just use getUrl(input) and redirect toit
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
