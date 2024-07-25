let tabsJSON = JSON.parse(localStorage.getItem("tabsJSON")) || [];
let current_index;


addTab = (() => {
    let searchEngine = localStorage.getItem("searchengine");
    let newTab = {
        name: "New Tab",
        favicon: ``,
        src: searchEngine,
        index: document.querySelectorAll(".tabs").length
    }
    tabsJSON.push(newTab);
    appendTabToList(newTab);
    refreshTabList(newTab);
    current_index = newTab.index;
    switchTab(current_index);
})

appendTabToList = (() => {
    
})

switchTab = ((id) => {
    
})

deleteTab = (() => {
    
})

refreshTabList = (() => {
    
})



getTabIndex = (() => {
    
})

clearAllTabs = (() => {
    
})