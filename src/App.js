import react from 'react';
import './App.css';
import Tables from './Tables.js';
class App extends react.Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      currentSave:"",
      error:"",
    }
    
  }
 
  render(){
    const AddItem= async ()=>{
      const valueItem =this.state.currentSave;
      this.setState({error:"",currentSave:""});
      if(valueItem!=="")
      {
      await fetch('http://localhost:3030/addItem',{
        method:"POST",
        headers:{
        "Content-type":"application/json"
        },
        body: JSON.stringify({item:valueItem})
      }).then((res)=>res.json()).then((r)=>console.log(r));
      
      }
      else{
          this.setState({error:"Please Input Text"})
      }
   }
  return (
    <div className="App">
      <h1>My Todo List</h1>
      <input id="input" type="text" value={this.state.currentSave} onChange={(e)=>{
        this.setState((state)=>({currentSave:e.target.value}))
        }} placeholder="Type your new task"></input>
      <button id="button" onClick={AddItem}>+</button>
      <h3>{this.state.error}</h3>
      <div><Tables /></div>
    </div>
  );
}
}

export default App;
