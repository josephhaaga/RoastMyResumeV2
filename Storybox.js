// class StoryBox extends React.Component{
// 	render(){
// 		return (<div>Story Box</div>);
// 	}
// }

var StoryBox = React.createClass({
	render: function(){
		return (<div>Story Box</div>);
	}
});

ReactDOM.render(<StoryBox />, document.getElementById('story-app'));