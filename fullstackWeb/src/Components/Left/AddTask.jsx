import './AddTask.css'
import { useTask } from '../../Service/taskContext'

function AddTask(){
    const {addTask,setNewTask,newTask}=useTask()
 
    return(
        <div className="AddTaskContainer">
            <div className='mainContainer'>
            <h1>Add Task:</h1>
            <input type="text" className="addTask" placeholder="Enter the task details" value={newTask} onChange={(e)=>{setNewTask(e.target.value)}} />
            <button className="addButton" onClick={()=>{addTask()}}>Add</button>
            </div>
        </div>
    )
}
export default AddTask