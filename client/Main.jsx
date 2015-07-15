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
			// wx.config({
			// 	debug: false,
			// 	appId: '',
			// 	timestamp: ,
			// 	nonceStr: '', // 必填，生成签名的随机串
			// 	signature: '',// 必填，签名，见附录1
			// 	jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
