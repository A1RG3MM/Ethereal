aboutBlank = (() => {
let win = window.open();
  let url = window.location.href;
  let iframe = win.document.createElement("iframe");
  let faviconLink = win.document.createElement("link");
  iframe.style.position = "fixed";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.top = "0";
  iframe.style.bottom = "0";
  iframe.style.left = "0";
  iframe.style.right = "0";
  iframe.style.margin = "0";
  iframe.style.padding = "0";
  iframe.style.overflow = "hidden";
  iframe.style.backgroundColor = "#000";
  iframe.src = url;
});
