'use strict';

import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import AppContainer from './AppContainer'
import Actions from './data/actionCreator'

render(<AppContainer />, document.getElementById('js-main'));

Actions.doActionOne('My first task');
Actions.doActionTwo('This is second');
Actions.doActionTwo('This is second2222');




