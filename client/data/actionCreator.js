import ActionTypes from './type';
//import Store from './Store';
import Dispatcher from './Dispatcher';
//import Dispatcher from './Dispatcher';
//var Dispatcher = require('./Dispatcher');
//var dispatcher = new Dispatcher();

const Actions = {
  doActionOne(text) {
    Dispatcher.dispatch({
      type: ActionTypes.ACTION_ONE,
      text: text,
    });
  },

   doActionTwo(text) {
    Dispatcher.dispatch({
      type: ActionTypes.ACTION_TWO,
      text: text,
    });
  },
};

export default Actions;