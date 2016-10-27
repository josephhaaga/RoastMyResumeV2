class ResumeScreen extends React.Component{
	constructor(){
		super();
		this.state = {
			annotations: []
		}
	}
	render(){
		return <div className="row resume-screen">
			<ResumeBox />
			<CommentBox />
		</div>;
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
		// console.log("CommentBox.state.comments: "+this.state.comments);		
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
		e.preventDefault();
		console.log(" ");
		let distance_from_left = document.getElementsByClassName('resumeImage')[0].offsetLeft + document.getElementsByClassName('resume-screen')[0].offsetLeft;
		console.log("X: "+(e.pageX - distance_from_left)+" Y:"+e.pageY);
		let newAnnotation = {x: e.pageX-distance_from_left, y: e.pageY, type:'grammar'};
		this.props.onClick(newAnnotation);
	}
	render(){
		return <div className="medium-8 column">
			<img className="resumeImage" src={this.props.imgsrc}  onClick={this._alertOnClick.bind(this)}  />
		</div>;
	}
}




class ResumeBox extends React.Component{
	constructor(){
		super();
		this.state={
			annotations : [
				{ key:1, x: 14, y:28, type:'design', active:'false'},
				{ key:2, x:299, y:210, type:'grammar', active:'false'},
				{ key:3, x:20, y:400, type:'content', active:'true'}
			]
		}
	}
	_getAnnotations() { // returns array of dynamically-generated JSX elements
		return this.state.annotations.map((annotation)=>{
			return (<Annotation x={annotation.x} y={annotation.y} type={annotation.type} key={annotation.key} />);
				// pass comment's id as unique key; helps performance
		});
	}
	_updateAnnotations(newAnnotation){
		// event.preventDefault();
		newAnnotation['key'] = this.state.annotations.length+1;
		newAnnotation['active'] = true;
		let previousAnnotationsInactive = this.state.annotations;
		previousAnnotationsInactive.forEach(function(i){
			i['active']=false;
		})
		console.log("previous: "+previousAnnotationsInactive);
		this.setState({annotations: previousAnnotationsInactive.concat([newAnnotation])})
	}
	render(){
		const annotations = this._getAnnotations();
		// console.log("render() ResumeBox.state.annotations: "+JSON.stringify(this.state.annotations));
		return <div className="resume"><Resume imgsrc="http://i.imgur.com/sFq0wAC.jpg" onClick={this._updateAnnotations.bind(this)}>
		</Resume>{annotations}</div>;
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
			top: this.props.y,
			left: this.props.x,
			background: color,
		};
		this.props.active ? annotation_style['opacity']=0.8 : annotation_style['opacity']=0.4;
		return <div className="annotation-marker" style={annotation_style} />;
	}
}

ReactDOM.render(<ResumeScreen />,document.getElementById('resume-app'));





