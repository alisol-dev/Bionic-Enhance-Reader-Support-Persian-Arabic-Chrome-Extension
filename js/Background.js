//User Settings
var userSettings = {
    Auto_Bold : true
}

//First Initiallization of the Plugin
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ userSettings });
});


//Bold a webpage once the user loads a page
chrome.tabs.onUpdated.addListener(function (tabId , info) {
  if (info.status === 'complete') {
    if(userSettings.Auto_Bold)
        chrome.scripting.executeScript({
            target: {tabId: tabId, allFrames: true},
            files: ['js/Algorithm.js'],
            });
  }
});


chrome.runtime.onMessage.addListener((request , sender , sendResponse) => {
    
    //Check if request contains info related to Auto_Bold
    if('Auto_Bold' in request)
    {
        userSettings.Auto_Bold = request.Auto_Bold;
        chrome.storage.sync.set({ userSettings });
    }
        

    //Since No responce is needed, close the Message Port
    return true;
});
