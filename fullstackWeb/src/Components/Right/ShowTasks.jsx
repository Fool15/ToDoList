import './ShowTasks.css';
import { useTask } from '../../Service/taskContext';
import { useEffect, useState } from 'react';

function ShowTasks() {
    const [editIndex, setEditIndex] = useState(null); // local state for which task is being edited

    const {
        displayTask,
        task,
        deleteTask,
        toggleTextDec,
        updatedText,
        setUpdatedText,
        updateText
    } = useTask();

    useEffect(() => {
        displayTask();
    }, []);

    function handleEdit(id, index) {
        if (editIndex === index) {
            updateText(id)
            setEditIndex(null);
        } else {
            // Update clicked – switch to input mode
            setEditIndex(index);
            setUpdatedText(task[index].text);
        }
    }

    return (
        <div className='ShowTasksContainer'>
            <h1>All Tasks:</h1>
            <div className='AllTasks'>
                {task.map((t, i) => (
                    <div className='singularTask' key={t.id}>
                        {editIndex === i ? (
                            <input
                                type="text"
                                value={updatedText}
                                onChange={(e) => setUpdatedText(e.target.value)}
                            />
                        ) : (
                            <span className={t.status ? 'textDec' : 'noTextDec'}>
                                {t.text}
                            </span>
                        )}
                        <div className='buttonContainer'>
                            <button className='styleButtons' onClick={() => deleteTask(t.id)}>Delete</button>
                            <button className='styleButtons Update' onClick={() => handleEdit(t.id, i)}>
                                {editIndex === i ? 'Change' : 'Update'}
                            </button>
                            <button className='styleButtons' onClick={() => toggleTextDec(t.id)}>Done</button>
                        </div>
                    </div>
                ))}
            </div>

           
        </div>
    );
}

export default ShowTasks;
