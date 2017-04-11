import React, {Component} from 'react';
import Store from 'data/Store';
import Actions from './data/actionCreator'
import Child from 'client/Child'


export default class AppContainer extends Component {
	constructor(){
		super();
		this.state = {
			messages: [],
			textInput: ''
		}
	}

	// getInitialState() {
	// 	return {messages : Store.getMessageList()}
	// }

	componentDidMount() {
		Store.on('change', this._onChange.bind(this));
	}

	componentWillUnmount() {
		Store.removeListener('change', this._onChange)
	}

	_onChange() {
		this.setState({ messages : Store.getMessageList() })
		console.log("onChange : ", JSON.stringify(this.state))
	}

	handleAdd(e) {
		e.preventDefault();
		console.log("added")
		Actions.doActionWrite(this.state.textInput)
		this.setState({textInput: ''});
		//this._onChange();
	}

	typeInput(e){
    this.setState({textInput: e.target.value});
  }

  render(){
  	console.log("this.state: ", JSON.stringify(this.state))
  	// console.log(Actions.doActionOne)
  	// Actions.doActionOne('My first task');
		if (this.state.messages) var list = this.state.messages.map( (message) => {
			return(
				<Child 
					key={message.id}
					id={message.id}
					text={message.text}
				/>
			);
		});

		return(
			<div>
				<h5>FLUX</h5>
				<form onSubmit={this.handleAdd.bind(this)}>
				<input placeholder="Type" 
          onChange={this.typeInput.bind(this)} value={this.state.textInput} />
        <button type='submit'> ADD </button>

				<ul>
					List : 
					{list}
				</ul>
				
				</form>
			</div>
		)
	}
}