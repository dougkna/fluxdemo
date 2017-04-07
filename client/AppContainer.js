import React, {Component} from 'react';
import Store from 'data/Store';
//import Actions from './data/actionCreator'
//import Actions from './data/actionCreator'
import Child from 'client/Child'


export default class AppContainer extends Component {
	constructor(){
		super();
		this.state = {
			messages: []
		}
	}

	getInitialState() {
		return {messages : Store.getMessageList()}
	}

	componentDidMount() {
		Store.on('change', this._onChange.bind(this));
	}

	componentWillUnmount() {
		Store.removeListener('change', this._onChange)
	}

	_onChange() {
		this.setState({ messages : Store.getMessageList() })
	}

  render(){
  	console.log("this.state: ", JSON.stringify(this.state))
  	// console.log(Actions.doActionOne)
  	// Actions.doActionOne('My first task');
		var list = this.state.messages.map( (message) => {
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

				<ul>
					List : 
					{list}
				</ul>
			</div>
		)
	}
}