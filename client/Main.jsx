'use strict'
var React              = require('react/addons');
var AnimatedLocations  = require('./AnimatedLocations.jsx');
var EntryList          = require('./EntryList.jsx');
var New                = require('./New.jsx');

var Router             = require('react-router-component');
var Locations 		   = Router.Locations;
var Location           = Router.Location;
var Link               = Router.Link;

var App = React.createClass({

	xhr : new XMLHttpRequest(),

	componentDidMount: function () {

 		var callback = function(){
 			WeixinJSBridge.invoke('hideOptionMenu',{},function(res){
			    alert(res.err_msg);
			});
 		}

		if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
		    callback();
		} else {
		    if (document.addEventListener) {
		        document.addEventListener("WeixinJSBridgeReady", callback, false);
		    } else if (document.attachEvent) {
		        document.attachEvent("WeixinJSBridgeReady", callback);
		        document.attachEvent("onWeixinJSBridgeReady", callback);
		    }
		}

		this.xhr.open("POST", "/wechat", true);
		this.xhr.setRequestHeader("Content-type", "application/json");
		this.xhr.send(JSON.stringify({"url": location.href.split('#')[0]+"/"}));
 		this.xhr.onload = function(e){

 			var items = JSON.parse(this.response);

 			var appId = items.appId,
 				timestamp = items.timestamp,
 				nonceStr = items.nonceStr,
 				signature = items.signature;

			wx.config({
				debug: true,
				appId: appId,
				timestamp: timestamp,
				nonceStr: nonceStr,
				signature: signature,
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline'
				]
			});

			wx.error(function(res){
				alert(res);
			})

			// wx.checkJsApi({
			// 	jsApiList: ['onMenuShareTimeline'],
			// 	success: function(res) {
			// 		console.log('yay');
			// 	}
			// });
 		}
	},

	render: function() {
		return (
			<AnimatedLocations hash transitionName="moveUp" popStateTransitionName="fade">
			<Location path="/" handler={EntryList} />
			<Location path="/new" handler={New} />
			</AnimatedLocations>
			)
	}
})

React.render(<App />, document.getElementById('content'));
