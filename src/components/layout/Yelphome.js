import React, { Component } from 'react'
//import Zones from '../containers/Zones'
import Api from '../../utils/ApiManager';

import {Link} from 'react-router';

class Yelphome extends Component {
    constructor(){
        
        super()
        this.goingfunc=this.goingfunc.bind(this);
            this.state = {
                searchterm:"",
                results:[],
                username:""
              
        };
    }
    saveusername(){
        return;
    }
    goingfunc(e){
        var username = this.state.username;
        var id=e.target.id;
        var url ="/api/yelp/"+username;
        url = url+"/";
        url=url+id;
        console.log("url is",url)
         Api.post(url, null, (err, response) => {
            // Call above goes to ApiManager.js
            if (err) { 
                // err = { message: "Not found anything", null: null }}
                console.log("error",err)
                alert("Error: " + err); 
                return;
            }
        else{
            var arr1 = [];
            console.log("here's the yelp response",response.message)
            
            
            
            
        }
         
        });
    }
    onvaluechange(e){
        this.setState({searchterm:e.target.value})
    }
    onusernamechange(e){
        this.setState({username:e.target.value})
    }
    yelpsearch(e){
        // 1 This fires first
        console.log("event",e)
      var sterm = this.state.searchterm;
      console.log("sterm value",sterm)
        Api.get('/api/yelp/' + sterm, null, (err, response) => {
            // Call above goes to ApiManager.js
            if (err) { 
                // err = { message: "Not found anything", null: null }
                console.log("error",err)
                alert("Error: " + err); 
                return;
            }
        else{
            console.log("response in front end",response.message)
            var arr1 = [];
            console.log("here's the yelp response",response.message)
            arr1 =response.message;
            this.setState({results:arr1})
            
            
        }
         
        });

    
    }
    
    render() {
        
        var g = this.state.results.map((i,index)=>{
            console.log("here's the i",i);
            console.log("image",i.image_url);
            console.log("name",i.name);
            console.log("snippet text",i.snippet_text);
            return (
            
                 <div key={index} className="row res">
                     <div className="col-xs-3">
                     
                     <img className="img-responsive center-block" src={i.image_url} alt="Smiley face" height="100" width="100" />
                     </div>
                     <div className="col-xs-9">
                     <p>{i.name}  </p><button id={i.id} onClick={this.goingfunc}>{i.going} going</button><br />
                     <p>{i.snippet_text}</p>
                     </div>
                 
                 
                 </div>
            
            
            )
            
        });
        console.log("state",this.state)
        console.log("g",g)
        
        return (
            <div>
                <div className="fbody">
                <h2> This is yelp page </h2>
                
                <input value={this.state.searchterm} onChange={this.onvaluechange.bind(this)} type="text"></input><button onClick={this.yelpsearch.bind(this)} >Search</button><br /><br />
                <input value={this.state.username} onChange={this.onusernamechange.bind(this)} type="text" /><button onClick={this.saveusername.bind(this)}>save username</button>
                </div>
                <div>
                <div  className="container">
                {g}
                </div>
                </div>
        </div>
        )
    }
}

export default Yelphome;