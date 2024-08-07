"use strict";
const index_uv_form = document.getElementById("index_uv_form");
const index_uv_input = document.getElementById("searchContent");

const proxy_uv_form = document.getElementById("proxy_uv_form");
const proxy_uv_input = document.getElementById("proxy_uv_input");

const searchEngine = localStorage.getItem("searchEngine");
if (!searchEngine) localStorage.setItem("searchEngine", "https://www.google.com/search?q=%s");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");
const connection = new BareMux.BareMuxConnection("/baremux/worker.js");


const NavigateToProxy = async (type, content) => {
	if (type === "form") {
		try {
			await registerSW();
			let url = search(content, searchEngine);

			let wisp = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
			if (await connection.getTransport() !== "/epoxy/index.mjs") {
				await connection.setTransport("/epoxy/index.mjs", [{ wisp: wisp }]);
			}

			NavigateToProxy("navigate", __uv$config.prefix + __uv$config.encodeUrl(url));
		} catch (err) {
			alert("There has been an error while registering the ServiceWorker. (Check console for more information.)")
			console.error(err)
		}
	}
	if (type === "proxy-form") {
		try {
			await registerSW();
			let url = search(content, searchEngine);
			let wisp = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
			if (await connection.getTransport() !== "/epoxy/index.mjs") {
				await connection.setTransport("/epoxy/index.mjs", [{ wisp: wisp }]);
			}
			document.querySelector("#res").src = __uv$config.prefix + __uv$config.encodeUrl(url);
		} catch (err) {
			alert("There has been an error while registering the ServiceWorker. (Check console for more information.)")
			console.error(err)
		}
	}
	if (type === "navigate") {
		localStorage.setItem("encodedProxyURL", content);
		const loadingBar = document.getElementById('loading-bar');
		document.getElementById("proxy-load").style.transition = "0.25s ease-in-out";
		document.getElementById("load-div").style.transition = "0.25s ease-in-out";
		document.getElementById("load-div").style.opacity = 0;
		document.getElementById("proxy-load").style.visibility = "visible";
		document.getElementById("proxy-load").style.opacity = 1;
		loadingBar.style.width = 0;
		loadingBar.style.animation = 'loading-bar 2s linear infinite';
		setTimeout(() => {
			location.replace("/textbook");
		}, 2500);
	}
}

const NavigateToGame = async (type, src) => {
	if (type == "proxy") {
		try {
			await registerSW();
			let url = search(content, searchEngine);

			let wisp = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
			if (await connection.getTransport() !== "/epoxy/index.mjs") {
				await connection.setTransport("/epoxy/index.mjs", [{ wisp: wisp }]);
			}

			localStorage.setItem("encodedProxyURL", __uv$config.prefix + __uv$config.encodeUrl(url));
			let loadingBar = document.getElementById('loading-bar');
			document.getElementById("proxy-load").style.transition = "0.25s ease-in-out";
			document.getElementById("load-div").style.transition = "0.25s ease-in-out";
			document.getElementById("load-div").style.opacity = 0;
			document.getElementById("proxy-load").style.visibility = "visible";
			document.getElementById("proxy-load").style.opacity = 1;
			loadingBar.style.width = 0;
			loadingBar.style.animation = 'loading-bar 2s linear infinite';
			setTimeout(() => {
				location.replace("/textbook");
			}, 2500);
		} catch (err) {
			alert("There has been an error while registering the ServiceWorker. (Check console for more information.)")
			console.error(err)
		}
	}
	if (type === "local" || type === "flash") {
		localStorage.setItem("encodedProxyURL", src);
		let loadingBar = document.getElementById('loading-bar');
		document.getElementById("proxy-load").style.transition = "0.25s ease-in-out";
		document.getElementById("load-div").style.transition = "0.25s ease-in-out";
		document.getElementById("load-div").style.opacity = 0;
		document.getElementById("proxy-load").style.visibility = "visible";
		document.getElementById("proxy-load").style.opacity = 1;
		loadingBar.style.width = 0;
		loadingBar.style.animation = 'loading-bar 2s linear infinite';
		setTimeout(() => {
			location.replace("/textbook");
		}, 2500);
	}
}

if (index_uv_form) {
	index_uv_form.addEventListener("submit", async (e) => {
		e.preventDefault();
		NavigateToProxy("form", index_uv_input.value);
	});
}

if (proxy_uv_form) {
	proxy_uv_form.addEventListener("submit", async (e) => {
		e.preventDefault();
		NavigateToProxy("proxy-form", proxy_uv_input.value);
	})
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
		tempencodedURL = tempencodedURL.replace("/uv/service/", "");
		document.getElementById("proxyLink").innerHTML = document.querySelector("#res").contentDocument.title;
		document.getElementById("proxyLink").href = aa + __uv$config.prefix + tempencodedURL;
		document.getElementById("faviconProxy").src = `https://www.google.com/s2/favicons?domain=${__uv$config.decodeUrl(tempencodedURL)}`
		saveContent()
	}, 500);
}