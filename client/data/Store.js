var ActionTypes = require('./type');
//import Dispatcher from './Dispatcher';
var Dispatcher = require('./Dispatcher')
var dispatcher = new Dispatcher();
const EventEmitter = require('events');

var _dispatchID;
var _messageList = {};

class Store extends EventEmitter {
	constructor() {
		super();
		_dispatchID = dispatcher.register((action) => {
			
			switch(action.type){
				case ActionTypes.ACTION_ONE:
					var msg = {
						id: Date.now(),
						text: action.text,
					}
					_messageList[msg.id] = msg;
					this.emit('change');
					break;

				case ActionTypes.ACTION_TWO:
					var msg = {
						id: Date.now(),
						text: action.text,
					}
					_messageList[msg.id] = msg;
					this.emit('change');
					break;

				default:
					console.log("DO NOTHING");
					return;
			}

			dispatcher.dispatch();
		});
	}

	getDispatcher() {
		return dispatcher;
	}

	getDispatchID() {
		console.log(_dispatchID)
		return _dispatchID;
	}

	getMessageList() {
		console.log(_messageList)
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