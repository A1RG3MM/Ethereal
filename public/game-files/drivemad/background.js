chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") }, () => {});
});

chrome.runtime.onInstalled.addListener(function(object) {
	if(object.reason == "install"){
	chrome.tabs.create({ url: "https://tombofthemask.com/game/drive-mad/?utm_campaign=ext&utm_medium=newinstall&utm_source=ext_drivemad"
	
	});
	}
});

if(chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL('https://tombofthemask.com/category/unblocked-games/?utm_campaign=ext&utm_medium=uninstall&utm_source=ext_drivemad');
}