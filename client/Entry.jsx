'use strict'
var React = require('react');
// var Wechat = require('./wechat.js');
var Https = require('https');

var getSignature = function(){

}

var ScreenWayPoint = React.createClass({
	getDefaultProps: function() {
		return {
			enterThres : 1,
			leaveThres : 0,
			onEnter: function() {},
			onLeave: function() {},
		};
	},

	componentDidMount: function() {
		window.addEventListener('touchstart', this.handleScroll);
		window.addEventListener('scroll', this.handleScroll);
		this.handleScroll();
	},

	componentDidUpdate: function() {
		this.handleScroll();
	},

	componentWillUnmount: function() {
		window.removeEventListener('touchstart', this.handleScroll);
		window.removeEventListener('scroll', this.handleScroll);
	},

	handleScroll: function(event) {
		var isVisible = this.isVisible();

		if (this.wasVisible === isVisible) {
		  return;
		}

		if (isVisible) {
		  this.props.onEnter.call(this, event);
		} else {
		  this.props.onLeave.call(this, event);
		}

		this.wasVisible = isVisible;
	},

	isVisible: function() {
		var node = this.getDOMNode();

		var enterThresPx = screen.height * this.props.enterThres;
		var leaveThresPx = screen.height * this.props.leaveThres;

		var isAboveBottom = node.offsetTop - window.scrollY <= enterThresPx;
		var isBelowTop    = node.offsetTop - window.scrollY > leaveThresPx;

		return isAboveBottom && isBelowTop;
	},

	render: function() {
		return (<span style={{fontSize: 0}} />);
	}
})


var Entry = React.createClass({
	componentDidMount: function () {
	      
	},

	getInitialState: function () {
	    return {
	        opacity : 0
	    };
	},


	displayButton: function () {
		this.setState({opacity:0.6});
	},

	hideButton : function() {
		this.setState({opacity:0});
	},

	handleClick: function() {
		wx.onMenuShareTimeline({
		    title: '陶马文的无聊图集',
		    link: 'http://everstream.cn',
		    imgUrl: this.props.imageData,
		    success: function () { 
		        console.log('yay shared');
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
	},

	render: function() {

		return (
			<div>
				<ScreenWayPoint enterThres={0.5} leaveThres={0.1} onEnter={this.displayButton} onLeave={this.hideButton} />
				<div key={"desc"+this.props.key} style={{opacity:this.state.opacity}} className="descript-box" onClick={this.handleClick}>
					<img width="100%" src="./icons/weixin.svg"/>
				</div>


				<img ref={"image"+this.props.key} className="user-image" src={this.props.imageData}/>
			</div>
		);
	}
});

module.exports = Entry;