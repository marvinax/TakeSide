'use strict'
var React              = require('react/addons');
var AnimatedLocations  = require('./AnimatedLocations.jsx');
var EntryList          = require('./EntryList.jsx');
var New                = require('./New.jsx');

var Router             = require('react-router-component');
var Locations 		   = Router.Locations;
var Location           = Router.Location;
var Link               = Router.Link;

var wechat             = require('./wechat.js')();

var App = React.createClass({

	xhr : new XMLHttpRequest(),

	componentDidMount: function () {
		this.xhr.open("POST", "/getsignature", true);
		this.xhr.send({url : "http://everstream.cn"});
 		this.xhr.onload = function(e){
 			console.log(e);
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
