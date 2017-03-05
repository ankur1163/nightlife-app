import React, { Component } from 'react'
//import Zones from '../containers/Zones'
import Api from '../../utils/ApiManager';

import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

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
    
    
    
    componentWillMount(){
        
         
         console.log("username",this.state.username)
         if(localStorage.getItem("profile")&&localStorage.getItem("searchterm")){
             console.log(">>>>>>>")
            console.log("full profile",localStorage.getItem("profile"))
        var obj = localStorage.getItem("profile")
        console.log("parsed value",JSON.parse(obj))
        var parobj = JSON.parse(obj);
        var username = parobj.email;
        console.log("email is",username)
        var sterm1 = localStorage.getItem("searchterm");
        
        
            this.setState({"username":username})
        
    }
   
    }
    
    afterlogin(){
        
    }
    
    componentDidMount(){
        
        var sterm = localStorage.getItem("searchterm");
        this.setState({"searchterm":sterm})
        if(localStorage.getItem("searchterm")){
            
            this.yelpsearchtwo(sterm);
            
            
        }
        else{
            console.log("nothing there in console log")
        }
        
       
             
    }
    saveusername(){
        return;
    }
    
    goingfunc(e){
        
        var idtoken = localStorage.getItem("id_token");
        if(idtoken){
            
            var username = this.state.username;
        var id=e.target.id;
        var url ="/api/yelp/"+username+"/"+id;
        /*
        url = url+"/";
        url=url+id;
        */
        console.log("url is",url)
         Api.post(url, null, (err, response) => {
            // Call above goes to ApiManager.js
            if (err) { 
                // err = { message: "Not found anything", null: null }}
                
                alert("Error: " + err); 
                return;
            }
        else{
            var arr1 = [];
            
            
            
            
            
        }
         
        });
            
        }
        else{
            browserHistory.push('/login');
        }
        
        
        
        /*
       
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
       */
    }
    onvaluechange(e){
        this.setState({searchterm:e.target.value})
    }
    onusernamechange(e){
        this.setState({username:e.target.value})
    }
    
    //yelpsearchtwo starts 
      yelpsearchtwo(a){
        // 1 This fires first
        
      var sterm = a;
                
      
      
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
    
    
    //yelpsearchtwoends
    yelpsearch(e){
        // 1 This fires first
        console.log("event",e)
      var sterm = this.state.searchterm;
      localStorage.setItem('searchterm', sterm);
                 
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
            
            arr1 =response.message;
            this.setState({results:arr1})
            
            
        }
         
        });

    
    }
    
    render() {
        console.log("username",this.state.username)
        var g = this.state.results.map((i,index)=>{
            
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
        
        
        return (
            <div>
            <Link to="/waste">Waste Page</Link><br />
            <Link to="/example">Example page</Link>
                <div className="fbody">
                <h2> This is Yelp page </h2>
                
                
                <input value={this.state.searchterm} onChange={this.onvaluechange.bind(this)} type="text"></input><button onClick={this.yelpsearch.bind(this)} >Search</button><br /><br />
                
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