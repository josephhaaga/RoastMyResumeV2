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
	constructor(){
		super();
		this.state={
			annotations : []
		}
	}

	// _addComment(author, body){
	// 	const comment = {author,body};
	// 	jQuery.post('/api/comments', { comment }).success(newComment => {
	// 		this.setState({ comments: this.state.comments.concat([newComment]) });
	// 		// state is only updated when we get new comment from API request
	// 	})
	// }

	_alertOnClick(e){
		let distance_from_left = document.getElementsByClassName('resumeImage')[0].offsetLeft;
		console.log("X: "+(e.pageX-distance_from_left)+" Y:"+e.pageY);
		let newAnnotation = {x: e.pageX-distance_from_left, y: e.pageY};
		this.setState({annotations: this.state.annotations.concat([newAnnotation]) });
		this.props.onClick(newAnnotation); // pass newAnnotation Up
	}

	render(){
		return <div className="medium-8 column">
			<img className="resumeImage" src={this.props.imgsrc}  onClick={this._alertOnClick.bind(this)}  />
		</div>;
	}
}




class ResumeBox extends React.Component{

	_updateAnnotations(newAnnotation){
		console.log("ResumeBox._updateAnnotations() called");
		console.log("  "+newAnnotation);
	}
	render(){
		return <div className="resume"><Resume imgsrc="http://i.imgur.com/sFq0wAC.jpg" onClick={this._updateAnnotations}>
		</Resume><Annotation x={25} y={26} type="content"/></div>;
	}
}

class Annotation extends React.Component{
	render(){
		let color;
		switch(this.props.type){
			case 'grammar':
				color = "purple";
				break;
			case 'design':
				color = "red";
				break;
			case 'content':
				color = "green";
				break;
		}

		const annotation_style={
			top: this.props.x,
			left: this.props.y,
			background: color
		};
		return <div className="annotation-marker" style={annotation_style} />;
	}
}

ReactDOM.render(<ResumeScreen />,document.getElementById('resume-app'));





