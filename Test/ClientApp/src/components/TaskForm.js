import React, { useState } from 'react';
import '../css/TaskForm.css';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineSearch, AiOutlineUnorderedList } from "react-icons/ai";
function TaskForm(props) {

    const [input, setInput] = useState('');

    const manageChange = e => {
        setInput(e.target.value);
    }

    const manageSend = e => {
        e.preventDefault();

        const taskNew = {
            id: uuidv4(),
            texto: input,
            completada: false,
            editar:false
        }

        props.onSubmit(taskNew);

    }
    const searchTask = e => {
        e.preventDefault();
        props.search(input);
    }

    return (
        <form
            className='task-form'
            onSubmit={manageSend}>
            <input
                className='task-input'
                type='text'
                placeholder='Escribe o busca una Tarea'
                name='texto'
                onChange={manageChange}
            />
            <button
                className='task-button'
                onClick={searchTask} title='Buscar Tarea'>
                <AiOutlineSearch className='task-icon' />
            </button>
            <button className='task-button' title='Agregar Tarea'>
                <AiOutlineUnorderedList className='task-icon' />
            </button>
        </form>
    );
}

export default TaskForm;
