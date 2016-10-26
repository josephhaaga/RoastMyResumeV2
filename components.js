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
				{ id:1, body: 'Great picture!'},
				{ id:2, body: 'Really great picture!'},
				{ id:3, body: 'Excellent stuff!'}
			]
		}
	}
	render(){
		const comments = this._getComments();
		return <div className="medium-4 column"> {comments} </div>;
	}
	_getComments(){
		return this.state.comments.map((comment)=>{
			return (<Comment body={comment.body} key={comment.id} />);
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
		return (
			<div className="comment">
				<p className="comment-body">
					{this.props.body}
				</p>
			</div>
		)
	}
}

class Resume extends React.Component{
	render(){
		return <div className="medium-8 column"><img src={this.props.imgsrc} /></div>;
	}
}

class ResumeBox extends React.Component{
	render(){
		return <Resume imgsrc="http://i.imgur.com/sFq0wAC.jpg" />;
	}
}

ReactDOM.render(<ResumeScreen />,document.getElementById('resume-app'));





