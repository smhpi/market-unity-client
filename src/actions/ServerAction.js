import AppDispatcher from '../AppDispatcher';
import {ActionTypes} from '../Constants';

let ServerAction = {

    receiveLinks(links){
        console.log("2- In Action");
        AppDispatcher.dispatch({
             actionType: ActionTypes.RECEIVE_LINKS,
             links
        });
    }
};
export default ServerAction;
