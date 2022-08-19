import React, { useState } from 'react';
import '../css/Task.css';
import { AiOutlineCloseCircle, AiFillEdit, AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";

function Task({ id, texto, completada, editar, completeTask, deleteTask, taskEdit, confirmEdit, cancelEdit }) {
    const [input, setInput] = useState('');
    const changeInput = e => {
        setInput(e.target.value);
    }
    if (editar) {
        return (
            <div className='task-container'>
                <div>
                    <input type="text" className='task-input' name='texto' placeholder={texto} onChange={changeInput}/>
                </div>
                <div className='task-container-icons'
                    onClick={() => confirmEdit(id,input)}>
                    <AiOutlineCheckCircle className='task-icon' />
                </div>
                <div
                    className='task-container-icons'
                    onClick={() => cancelEdit(id)}>
                    <AiOutlineClose className='task-icon' />
                </div>
            </div>

        );
    }
    else {
        return (
            <div className={completada ? 'task-container complete' : 'task-container'}>
                <div
                    className='task-text'
                    onClick={() => completeTask(id)}>
                    {texto}
                </div>
                <div className='task-container-icons'
                    onClick={() => taskEdit(id)}>
                    <AiFillEdit className='task-icon' />
                </div>
                <div
                    className='task-container-icons'
                    onClick={() => deleteTask(id)}>
                    <AiOutlineCloseCircle className='task-icon' />
                </div>
            </div>
        );
    }



}

export default Task;