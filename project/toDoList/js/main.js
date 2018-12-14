;(function () {
    'use strict';
  
    window.api = post;
  
    function post (action, data, onSuccess, onError) {
      send('post', action, data, onSuccess, onError);
    }
  
    /**
     *
     * @param action e.g.: 'user/create'
     */
    function get (action, onSuccess, onError) {
      send('get', action, null, onSuccess, onError);
    }
  
    function send (method, action, data, onSuccess, onError) {
      let http      = new XMLHttpRequest();
      let baseUrl   = 'http://mock.biaoyansu.com/api/1/';
      let timestamp = (new Date).getTime();
      // 这个地方填你的应用key
      let appKey    = '485e4201823872994ed5e9f87d0a58b3b980a3a53f6af23ed760df2cd442f19b';
  
      function sign (appKey, timestamp) {
        return btoa(appKey + timestamp);
      }
  
      http.open(method, baseUrl + action);
  
      http.setRequestHeader('BIAO-MOCK-APP-KEY', appKey);
      http.setRequestHeader('BIAO-MOCK-TIMESTAMP', timestamp);
      http.setRequestHeader('BIAO-MOCK-SIGNATURE', sign(appKey, timestamp));
      http.setRequestHeader("Content-Type", "application/json");
  
      let json = JSON.stringify(data);
  
      http.send(json);
  
      http.addEventListener('load', $ => {
        onSuccess && onSuccess(JSON.parse(http.responseText));
      });
  
      http.addEventListener('error', $ => {
        onError && onError(JSON.parse(http.responseText));
      });
    }
  
  })();