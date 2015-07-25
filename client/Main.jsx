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

		alert(JSON.stringify({url: location.href.split('#')[0]}));

		this.xhr.open("POST", "/wechat", true);
		this.xhr.setRequestHeader("Content-type", "application/json");
		this.xhr.send(JSON.stringify({"url": location.href.split('#')[0]}));
 		this.xhr.onload = function(e){

			wx.config({
				debug: true,
				appId: this.response.appId,
				timestamp: this.response.timestamp,
				nonceStr: this.response.nonceStr,
				signature: this.response.signature,
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline'
				]
			});

			wx.ready(function(){
				alert("just show something");
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
