class ResumeScreen extends React.Component{
	render(){
		return <div className="row"><Resume /><CommentBox /></div>;
	}
}

class CommentBox extends React.Component{
	
	render(){
		const comments = this._getComments();
		return <div className="medium-4 column"> {comments} </div>;
	}

	_getComments(){
		const commentList = [
			{ id:1, body: 'Great picture!'},
			{ id:2, body: 'Really great picture!'},
			{ id:3, body: 'Excellent stuff!'}
		];

		return commentList.map((comment)=>{
			return (<Comment body={comment.body} key={comment.id} />);
				// pass comment's id as unique key; helps performance
		});
	}

}

class Comment extends React.Component{
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
		return <div className="medium-8 column">Here is The Resume</div>;
	}
}

ReactDOM.render(<ResumeScreen />,document.getElementById('resume-app'));





