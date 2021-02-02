const moongoose = require('mongoose');
const uri="mongodb+srv://Mydbuser:Vijay@1234@cluster0.jooug.mongodb.net/<dbname>?retryWrites=true&w=majority";
const conn = moongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
  if(err)
  {
      console.log("connection error");
  }
  else{
      console.log("Connection established");
  }
})
  const todoSchema = new moongoose.Schema({
    description:String,
    isDone:Boolean
  });

   const todoModel = moongoose.model('TodoData',todoSchema);
module.exports = todoModel;