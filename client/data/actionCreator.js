import ActionTypes from './type';
import Store from './Store'
//import Dispatcher from './Dispatcher';
//var Dispatcher = require('./Dispatcher');
//var dispatcher = new Dispatcher();

const Actions = {
  doActionOne(text) {
    Store.getDispatcher.dispatch({
      type: ActionTypes.ACTION_ONE,
      text: text,
    });
  },
};

export default Actions;