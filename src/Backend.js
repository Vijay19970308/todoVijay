const express = require('express');
const todoModel = require('./Connect');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/all",async (request,response)=>{
       try
       {
        const result= await todoModel.find({});
        response.status(200).send({data:result});
       }catch(e){
           response.status(404).send({error:e.message});
       }
 })
app.post("/addItem",async (request,response)=>{
   const item = request.body;
   if(item!=={}&&item!==undefined&&item.item!=="")
   {
      try
      {
        let newmodel = new todoModel();
        newmodel.description = item.item;
        newmodel.isDone=false;
        await newmodel.save();
        response.send(200);
      }catch(e){
          response.status(404).send({error:e.message});
      }
   }
   else{
      response.sendStatus(404);
   }
})
app.put("/completeItem",async (request,response)=>{
    const item = request.body;
    if(item!=={}&&item!==undefined)
    {
       try
       {
         let result = await todoModel.findByIdAndUpdate(item._id,{isDone:true},{useFindAndModify:false});
         response.sendStatus(200);
       }catch(e){
           response.status(404).send({error:e.message});
       }
    }
    else{
       response.sendStatus(404);
    }
 })
 app.put("/editTask",async (request,response)=>{
    const item = request.body;
    if(item!=={}&&item!==undefined)
    {
       try
       {
         let result = await todoModel.findByIdAndUpdate(item._id,{description:item.description},{useFindAndModify:false});
         response.sentStatus(200);
       }catch(e){
           response.status(404).send({error:e.message});
       }
    }
    else{
       response.sendStatus(200);
    }
 })
 app.delete("/deleteTask",async (request,response)=>{
    const item = request.body;
    if(item!=={}&&item!==undefined)
    {
       try
       {
        
         let result = await todoModel.findByIdAndDelete(item._id);
         response.sendStatus(200);
       }catch(e){
           response.status(404).send({error:e.message});
       }
    }else{
       response.sendStatus(404);
    }
 })
app.listen(3030,()=>{
    console.log("App is listening on Port 3030");
})