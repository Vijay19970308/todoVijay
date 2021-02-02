import react from 'react';
import inprocess from './inprocess.jpg';
import complete from './complete.png';
import deleteIcon from './delete-icon.jpg';
import editIcon from './edit.png';
class Tables extends react.Component {
    constructor(props){
      super(props);
      this.state={
        List:[],
        error:"",
        edit:[],
        edits:[],
      }
      
    }
  
    componentDidMount(){
      
      const call = async()=>{
        await fetch('http://localhost:3030/all',{
          method:"GET",
          headers:{
          "Content-type":"application/json"
          },
        }).then((res)=>res.json()).then((r)=>{this.setState({List:r.data})});
      }
      call();
    }
    componentDidUpdate(){
      const call = async()=>{
        await fetch('http://localhost:3030/all',{
          method:"GET",
          headers:{
          "Content-type":"application/json"
          },
        }).then((res)=>res.json()).then((r)=>{this.setState({List:r.data})});
      }
      call();
    }
    render(){
    
      
     const setComplete = async(id)=>{
      await fetch('http://localhost:3030/completeItem',{
        method:"PUT",
        headers:{
        "Content-type":"application/json"
        },
        body:JSON.stringify({_id:id})
      }).then((res)=>res.json()).then((r)=>{
        if(r.error==="")
             this.setState({error:r.error});
      });
    }
      const doDelete = async(id)=>{
        await fetch('http://localhost:3030/deleteTask',{
          method:"DELETE",
          headers:{
          "Content-type":"application/json"
          },
          body:JSON.stringify({_id:id})
        }).then((res)=>res.json()).then((r)=>{
          if(r.error==="")
               this.setState({error:r.error});
        });
      }
        const editList =(id)=>{
          if(!this.state.edit.includes(id))
          {
            let listId = [...this.state.edit,...[id]];
            this.setState({edit:listId});
          }
        } 
        const editLists=(id,value)=>{
          let found=false;
          let listData = [...this.state.edits];
          listData.map((items)=>{
             if(items.id===id)
             {
               found=true;
               items.desc =value;
             }
          })
          if(!found){
            const data ={
              id:id,
              desc:value
            }
            listData = [...listData,...[data]]
          }
          this.setState({edits:listData})
          
        }
        const doEdit = async(id)=>{

          let description = "";
          let listIds = [...this.state.edit];
          listIds = listIds.filter(items=>items!==id);
          this.setState({edit:listIds});

          let listData = [...this.state.edits];
          listData.map((items)=>{
             if(items.id===id)
             {
               description=items.desc;
             }
          })
          listData = listData.filter(items=>items.id!==id);
          this.setState({edits:listData});
         

          if(description!=="")
          {
          await fetch('http://localhost:3030/editTask',{
            method:"PUT",
            headers:{
            "Content-type":"application/json"
            },
            body:JSON.stringify({_id:id,description:description})
          }).then((res)=>res.json()).then((r)=>{
            if(r.error==="")
                 this.setState({error:r.error});
          
          });
          
        }
    }
    return (
      <div className="App">
        <div>
          <table>
            <thead>
              <tr><th>Name</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {this.state.List.map((item,index)=>{
                let completed ="";
                let disabled=true; 
                
                if(item.isDone===false)
                {
                  completed = inprocess;
                  disabled=false;
                }
                else
                {
                  completed = complete;
                  disabled=true;
                }
                
               return <tr id="row">
                         <td id="des" >
                           {this.state.edit.includes(item._id)?<span><input id="edit" onChange={(e)=>{editLists(item._id,e.target.value)}} placeholder={item.description}></input><button onClick={()=>doEdit(item._id)} id="but">Edit</button></span>:item.description}</td>
                         <td id="compelte"><button disabled={disabled} onClick={()=>setComplete(item._id)} id="image"><img id="img" src={completed} alt="status"></img></button></td>
                         <td id="action"><button id="btn" onClick={()=>doDelete(item._id)} ><img id="img" src={deleteIcon} alt="status"></img></button><button disabled={this.state.edit.includes(item._id)} onClick={()=>editList(item._id)} id="btn"><img id="img" src={editIcon} alt="status"></img></button></td>
                      </tr>
              })}
            </tbody>
        </table>
        </div>
      </div>
    );
  }
}
  export default Tables;