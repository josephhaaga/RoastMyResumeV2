class ResumeScreen extends React.Component{
	render(){
		return <div className="row"><ResumeBox /><CommentBox /></div>;
	}
}

class CommentBox extends React.Component{
	constructor(){
		super();
		this.state = {
			comments: [
				{ id:1, body: 'Great picture!', commentType:'design'},
				{ id:2, body: 'Really great picture!', commentType:'grammar'},
				{ id:3, body: 'Excellent stuff!', commentType:'content'}
			]
		}
	}
	render(){
		const comments = this._getComments();
		return <div className="medium-4 column"> {comments} </div>;
	}
	_getComments(){
		return this.state.comments.map((comment)=>{
			return (<Comment body={comment.body} key={comment.id} commentType={comment.commentType}/>);
				// pass comment's id as unique key; helps performance
		});
	}
}

class Comment extends React.Component{
	constructor() {
		super();
		this.state = {isActive: false};
	}
	render() {
		if(this.props.commentType=='design'){
			return (
				<div className="comment design">
					<p className="comment-body">
						{this.props.body}
					</p>
				</div>
			)
		}else if(this.props.commentType=='grammar'){
			return (
				<div className="comment grammar">
					<p className="comment-body">
						{this.props.body}
					</p>
				</div>
			)
		}else if(this.props.commentType=='content'){
			return (
				<div className="comment content">
					<p className="comment-body">
						{this.props.body}
					</p>
				</div>
			)
		}
	}
}




class Resume extends React.Component{
	_alertOnClick(e){
		let distance_from_left = document.getElementsByClassName('resumeImage')[0].offsetLeft;
		console.log("X: "+(e.pageX-distance_from_left)+" Y:"+e.pageY);
	}
	render(){
		return <div className="medium-8 column"><img className="resumeImage" src={this.props.imgsrc}  onClick={this._alertOnClick.bind(this)}  /></div>;
	}
}

class ResumeBox extends React.Component{
	render(){
		return <Resume imgsrc="http://i.imgur.com/sFq0wAC.jpg" />;
	}
}

ReactDOM.render(<ResumeScreen />,document.getElementById('resume-app'));





