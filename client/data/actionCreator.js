import ActionTypes from './type';
import Dispatcher from './Dispatcher';

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

   doActionWrite(text) {
    Dispatcher.dispatch({
      type: ActionTypes.ACTION_WRITE,
      text: text,
    });
  },
};

export default Actions;