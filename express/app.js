const express = require('express'); //getting express
const cors = require('cors'); //cors allows fetch from the port express is using
const app = express();
const PORT = 5000; //the port

app.use(cors()); //using cors
app.use(express.json()); //dont know

let tasks = [];//this where all our tasks will be stored and used by both exp and react

app.get('/api/tasks',(req,res)=>{
  res.json(tasks)
})

app.post('/api/tasks',(req,res)=>{
  let {task}=req.body
  let newTask={id:Date.now(),text:task,status:false}

  tasks.push(newTask)

  res.status(201).json(newTask)
})

app.delete('/api/tasks/:id',(req,res)=>{
  let {id}=req.params
  tasks=tasks.filter(t=>t.id!==Number(id))
  console.log(id)
  res.status(200).json({success:true})
})

app.put('/api/tasks/:id',(req,res)=>{
  let {id}=req.params
  let {newStatus}=req.body

  let count =0
  let actualCount=0
  tasks.forEach((t)=>{
    if(t.id==Number(id)){
      actualCount=count
    }
    else if(tasks.length-1==count&&t.id!==Number(id)){
      count=-1
    }
    else{
      count++
    }
  })
  if(count!=-1){
    tasks[actualCount].status=newStatus
    count=0
    actualCount=0
  }
  res.json(tasks)

})
app.put('/api/tasks/update/:id',(req,res)=>{
  const {id}=req.params
  const {newText}=req.body
  let count =0
  let actualCount=0

  tasks.forEach((t)=>{
    if(t.id==Number(id)){
      actualCount=count
    }
    else if(tasks.length-1==count&&t.id!==Number(id)){
      count=-1
    }
    else{
      count++
    }
  })

  if(count!=-1){
    tasks[actualCount].text=newText
    count=0
    actualCount=0
  }
  
  res.status(200).json(tasks)

})

app.listen(PORT)