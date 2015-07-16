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
		this.xhr.open("POST", "/wechat", true);
		this.xhr.send({url : "http://everstream.cn"});
 		this.xhr.onload = function(e){
 			console.log(this.response);
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

			wx.checkJsApi({
				jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			    success: function(res) {
			        console.log('yay');
			    }
			});
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
