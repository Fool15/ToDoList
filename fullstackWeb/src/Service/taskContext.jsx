import { createContext,useContext,useState,useEffect } from "react";
const TaskContext=createContext()

export function TaskProvider({children}){
    let [task,setTask]=useState([])

    function displayTask(){
        fetch('http://localhost:5000/api/tasks')
        .then(res=>res.json())
        .then(data=>setTask(data))
    }

    let [newTask,setNewTask]=useState("")
    function addTask(){
        fetch('http://localhost:5000/api/tasks',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({task:newTask})
        })
        .then(res=>res.json())
        .then(data=>{
            setTask(prev=>[...prev,data])
            setNewTask('')
        })
    }

    let [textDec,setTextDec]=useState(false)

    let toggleTextDec=(id)=>{
        const  statusValue= !textDec
        setTextDec(statusValue)

        fetch(`http://localhost:5000/api/tasks/${id}`,
            {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({newStatus:statusValue})
            })
        .then(res=>res.json())
        .then(data=>setTask(data))
        
    }
    let [updatedText,setUpdatedText]=useState('')

    function updateText(id){
        let text=updatedText
        fetch(`http://localhost:5000/api/tasks/update/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({newText:text})
        })
        .then(res=>res.json())
        .then(data=>setTask(data))
    }

    function deleteTask(id){
        fetch(`http://localhost:5000/api/tasks/${id}`,{method:"DELETE"})
        .then(()=>setTask(prev=>prev.filter((t)=>t.id!==id)))
    }
    
    return(
        <TaskContext.Provider value={{addTask,setNewTask,
            newTask,displayTask,task,
            deleteTask,setTask,toggleTextDec
            ,updateText,setUpdatedText,
            updatedText}}>{children}</TaskContext.Provider>
    )
}

export function useTask(){
    return useContext(TaskContext)
}