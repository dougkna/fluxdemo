import ActionTypes from './type';
import Dispatcher from './Dispatcher';
const EventEmitter = require('events');

var _messageList = [];

class Store extends EventEmitter {
	constructor() {
		super(Dispatcher);
		Dispatcher.register((action) => {
			
			console.log("dispatcher : ", Dispatcher)
			console.log("action ", action)

			switch(action.type){
				case ActionTypes.ACTION_ONE:
					console.log("action one is picked")
					var msg = {
						id: Date.now(),
						text: action.text,
					}
					_messageList.push(msg);
					//_messageList[msg.id] = msg;
					this.emit('change');
					break;

				case ActionTypes.ACTION_WRITE:
					console.log("action WRITE is picked")
					var msg = {
						id: Date.now(),
						text: action.text,
					}
					_messageList.push(msg);
					//_messageList[msg.id] = msg;
					this.emit('change');
					break;

				default:
					console.log("DO NOTHING");
					return;
			}
		});
	}

	getDispatcher() {
		return Dispatcher;
	}

	getMessageList() {
		console.log("msgList", _messageList)
		return _messageList;
	}
}

// var Actions = function(){
// 	return {
// 	  doActionOne: function(text) {
// 	    dispatcher.dispatch({
// 	      type: ActionTypes.ACTION_ONE,
// 	      text: text,
// 	    });
// 	  },
// 	}
// };
// var Actions = {
//   doActionOne(text) {
//     dispatcher.dispatch({
//       type: ActionTypes.ACTION_ONE,
//       text: text,
//     });
//   },
// };


//export default Actions;
module.exports = new Store();