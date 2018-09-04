import { get } from 'jquery';
import ServerAction from '../actions/ServerAction'

let API ={
    


    fetchLink(){
        console.log('1- API is came');
        get('./links.json').done(resp =>{
            ServerAction.receiveLinks(resp);
        })
   

    } 
        /*
        fetchLink(){
        axios.get('./links.json').then(res => {
        console.log(res);
        ServerAction.receiveLinks(res);
    })
    }

    fetchLink(){
        console.log('1- API is came');
        fetch('./links.json', {mode: 'cors'}).then(resp => {
                console.log(resp);
                ServerAction.receiveLinks(resp);
            });
        }
    */
};

export default API;