import { combineReducers } from 'redux';

import user from './userReducer';
import ledger from './ledgerReducer';


export default combineReducers({
	user,
	ledger
});
