//chrome.app.runtime.onLaunched.addListener(init);

chrome.app.runtime.onLaunched.addListener(
  function () {
    chrome.app.window.create('index.html', {
      id: 'main',
      bounds: { width: 620, height: 500 }
    });
  }
);

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  if(request == "demo"){
      chrome.storage.sync.get(['srWcServerInfo'], function(result) {
            console.log('Value currently is ' + result.srWcServerUrl);
            console.log('Value currently is ' + result);

            debugger;
            var url = result.srWcServerInfo.Url;
            var port = parseInt(result.srWcServerInfo.Port);
            init(url, port)


          });
  }
});

// chrome.app.window.create('index.html', {
//   id: 'main',
//   bounds: { width: 620, height: 500 }
// });

function init(url, port) {
    console.log('App launch');
    //startWebserver('127.0.0.1', 8085, 'SR', null);
    startWebserver(url, port, 'SR', null);



    function startWebserverDirectoryEntry(host,port,entry) {
      directoryServer = new WSC.WebApplication({host:host,
                                                port:port,
                                                renderIndex:true,
                                                entry:entry
                                               })
      directoryServer.start()
    }
  
    //directory must be a subdirectory of the package
    function startWebserver(host,port,directory,settings){
      chrome.runtime.getPackageDirectoryEntry(function(packageDirectory){
  
        console.log('packageDirectory - ' + packageDirectory);
        var data1 = packageDirectory.getDirectory(directory,{create: false},function(webroot){
  
          console.log('webroot - ' + webroot);
          debugger;
  
          var fs = new WSC.FileSystem(webroot)
          var handlers = [['/data.*', AdminDataHandler],
                          ['.*', WSC.DirectoryEntryHandler.bind(null, fs)]]
          adminServer = new WSC.WebApplication({host:host,
                                                port:port,
                                                handlers:handlers,
                                                renderIndex:true,
                                                auth:{ username: "a",
                                                       password: "a" }
                                               }, function(e) {
                                                  console.log('error g2');
                                                  console.log(e);
                                               });

                                            try {
                                              adminServer.start()
                                            } catch (error) {
                                              console.log('error g2');
                                              console.log(e);
                                     
                                            }
          
          
    }, function(e) { 

          console.log('error g');
          console.log(e);


        });
  
      });
      // console.log('data1');
      // console.log(data1);
    }
}

