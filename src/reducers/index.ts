import { combineReducers } from 'redux';

import ledger from './ledgerReducer';
import user from './userReducer';


export default combineReducers({
	ledger,
	user
});
