class ResumeScreen extends React.Component{
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

class ResumeBox extends React.Component{
	constructor(){
		super();
		this.state={
			annotations : []
		}
	}
	_getAnnotations() { // returns array of dynamically-generated JSX elements
		return this.state.annotations.map((annotation)=>{
			// return (<Annotation x={annotation.x} y={annotation.y} type={annotation.type} key={annotation.key} k={annotation.key} active={annotation.active} onClick={this._makeActive.bind(this)}/>);
			return (<Annotation body={annotation.body} x={annotation.x} y={annotation.y} type={annotation.type} key={annotation.key} k={annotation.key} active={annotation.active} onClick={this._makeActive.bind(this)} />);
		});
	}
	_makeInactive(){
		let previousAnnotationsInactive = this.state.annotations;
		previousAnnotationsInactive.forEach(function(i){
			i['active']=false;
		});
		return previousAnnotationsInactive;
	}
	_makeActive(anno){
		this.setState({annotations:this._makeInactive()});
		let indexOfAnnotation = this.state.annotations.findIndex(function(a){return a.key==anno});
		this.state.annotations[indexOfAnnotation]['active']=true;
		// window.getElementsByClassName(indexOfAnnotation.toString());
	}
	_updateAnnotations(newAnnotation){
		event.preventDefault();
		newAnnotation['key'] = this.state.annotations.length+1;
		let previousAnnotationsInactive = this._makeInactive();
		newAnnotation['active'] = true;
		this.setState({annotations: previousAnnotationsInactive.concat([newAnnotation])})
	}
	render(){
		const annotations = this._getAnnotations();
		return <div className="medium-8 column"><div className="resume"><Resume imgsrc="http://i.imgur.com/sFq0wAC.jpg" onClick={this._updateAnnotations.bind(this)}>
		</Resume>{annotations}</div></div>;
	}
}


class Resume extends React.Component{
	_alertOnClick(e){
		e.preventDefault();
		let distance_from_left = document.getElementsByClassName('resumeImage')[0].offsetLeft + document.getElementsByClassName('resume-screen')[0].offsetLeft;
		let newAnnotation = {x: e.pageX-distance_from_left, y: e.pageY, type:'grammar'};
		this.props.onClick(newAnnotation);
	}
	render(){
		return <div className="medium-8 column">
			<img className="resumeImage" src={this.props.imgsrc}  onClick={this._alertOnClick.bind(this)}  />
		</div>;
	}
}


class Annotation extends React.Component{
	constructor(){
		super();
		this.state={
			active: true
		}
		this.handleTextChange = this.handleTextChange.bind(this);
	}
	componentDidMount(){
		console.log(this._tf);
		this._tf.focus();
	}
	handleTextChange(event){
		this.setState({body: event.target.value});
		// this.props.content = event.target.value;
	}
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
		const annotation_marker_style={
			top: this.props.y,
			left: this.props.x,
			background: color,
		};
		const annotation_editor_style={
			top: this.props.y,
			left: this.props.x+30,
			display: 'none'
		};
		if(this.props.active && this.state.active){
			annotation_marker_style['opacity']=0.8;
			annotation_editor_style['display']='block';
		}else{
			annotation_marker_style['opacity']=0.4;
		}
		let k = this.props.k;
		return <div className={"annotation-container annotation-container-"+this.props.k}>
			<div className="annotation-marker" style={annotation_marker_style} ref={(div) => this._annoNum = k} onClick={this._clickedAnnotation.bind(this)} />
			<input autoFocus ref={(input) => this._tf = input} className="annotation-editor" style={annotation_editor_style} onChange={this.handleTextChange} >{this.props.text}</input>
		</div>;
	}
	_clickedAnnotation(event){
		event.preventDefault();
		this.props.onClick(this._annoNum);
	}
}


ReactDOM.render(<ResumeScreen />,document.getElementById('resume-app'));





