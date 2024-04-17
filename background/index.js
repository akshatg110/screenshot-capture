
// chrome.storage.sync.clear()

var defaults = {
  method: 'crop',
  format: 'png',
  quality: 100,
  scaling: true,
  save: ['file'],
  clipboard: 'url',
  dialog: true,
  icon: 'default',
}

let otpPopupId; // Store the ID of the OTP popup window


chrome.storage.sync.get((store) => {
  var config = {}
  Object.assign(config, defaults, JSON.parse(JSON.stringify(store)))
  // v3.0 -> v3.1
  if (typeof config.save === 'string') {
    config.clipboard = /url|binary/.test(config.save) ? config.save : 'url'
    config.save = /url|binary/.test(config.save) ? ['clipboard'] : ['file']
  }
  if (config.dpr !== undefined) {
    config.scaling = config.dpr
    delete config.dpr
  }
  if (typeof config.icon === 'boolean') {
    config.icon = config.icon === false ? 'default' : 'light'
  }
  chrome.storage.sync.set(config)

  chrome.action.setIcon({
    path: [16, 19, 38, 48, 128].reduce((all, size) => (
      all[size] = `/icons/${config.icon}/${size}x${size}.png`,
      all
    ), {})
  })
})

function inject (tab) {
  chrome.tabs.sendMessage(tab.id, {message: 'init'}, (res) => {
    if (res) {
      clearTimeout(timeout)
    }
  })

  var timeout = setTimeout(() => {
    chrome.scripting.insertCSS({files: ['vendor/jquery.Jcrop.min.css'], target: {tabId: tab.id}})
    chrome.scripting.insertCSS({files: ['content/index.css'], target: {tabId: tab.id}})

    chrome.scripting.executeScript({files: ['vendor/jquery.min.js'], target: {tabId: tab.id}})
    chrome.scripting.executeScript({files: ['vendor/jquery.Jcrop.min.js'], target: {tabId: tab.id}})
    chrome.scripting.executeScript({files: ['content/crop.js'], target: {tabId: tab.id}})
    chrome.scripting.executeScript({files: ['content/index.js'], target: {tabId: tab.id}})

    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, {message: 'init'})
    }, 100)
  }, 100)
}

chrome.action.onClicked.addListener((tab) => {
  inject(tab)
})

chrome.commands.onCommand.addListener((command) => {
  if (command === 'take-screenshot') {
    chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
      inject(tab[0])
    })
  }
})

chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.message === 'capture') {
    chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
      chrome.tabs.captureVisibleTab(tab.windowId, {format: req.format, quality: req.quality}, (image) => {
        // image is base64
        res({message: 'image', image})
      })
    })
  }
  else if (req.message === 'active') {
    if (req.active) {
      chrome.storage.sync.get((config) => {
        if (config.method === 'crop') {
          chrome.action.setTitle({tabId: sender.tab.id, title: 'Crop and Save'})
          chrome.action.setBadgeText({tabId: sender.tab.id, text: '◩'})
        }
        else if (config.method === 'wait') {
          chrome.action.setTitle({tabId: sender.tab.id, title: 'Crop and Wait'})
          chrome.action.setBadgeText({tabId: sender.tab.id, text: '◪'})
        }
        else if (config.method === 'view') {
          chrome.action.setTitle({tabId: sender.tab.id, title: 'Capture Viewport'})
          chrome.action.setBadgeText({tabId: sender.tab.id, text: '⬒'})
        }
        else if (config.method === 'page') {
          chrome.action.setTitle({tabId: sender.tab.id, title: 'Capture Document'})
          chrome.action.setBadgeText({tabId: sender.tab.id, text: '◼'})
        }
      })
    }
    else {
      chrome.action.setTitle({tabId: sender.tab.id, title: 'Screenshot Capture'})
      chrome.action.setBadgeText({tabId: sender.tab.id, text: ''})
    }
  }
  return true
})

// Listen for messages from phone_popup.js and otp_popup.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log("MESSAGE: ", message);
  if (message.action === 'submitOTP') {
    // Get the phone number from localStorage or retrieve it from the server
    console.log("PRINTING ALL DATA: ", message)

    // Use the phone number and OTP
    // console.log('Phone Number:', phoneNumber);
    // console.log('OTP:', message.otp);
    //
    // // Clear phone number from localStorage if needed
    // localStorage.removeItem('phoneNumber');
  }
});


function postData(url = '', data = {}) {
  url = 'https://dummyjson.com/posts'
  data = JSON.stringify({
    title: 'I am in love with someone.',
    userId: 5,
    /* other post data */
  });
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers if required
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("RESPONSE: ", response.json())
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
