import {get} from 'jquery';
import ServerAction from '../actions/ServerAction'
let API ={
    fetchLink(){
        console.log('1- API is came');
        get('./links.json').done(resp =>{
            console.log(resp);
            ServerAction.receiveLinks(resp);
        })

    }
};

export default API;