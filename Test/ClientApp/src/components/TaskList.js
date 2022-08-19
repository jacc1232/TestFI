import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TaskForm from './TaskForm';
import Task from './Task';
import '../css/TaskList.css';



function TaskList() {

    const [tasks, setTask] = useState([]);
    const getTasks = async () => {
        try {
            const response = await fetch("api/Task/Index");
            const data = await response.json();
            setTask(data);
        } catch (error) {
            console.error(error);
        }
    }
    const createTask = task => {
        if (task.texto.trim()) {
            task.texto = task.texto.trim();
            var formdata = new FormData();
            formdata.append("Texto", task.texto);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch("api/Task/Create", requestOptions)
                .then(response => response.text())
                .then(result => {
                    getTasks();
                    toast.success("Se guardó la tarea correctamente.");
                })
                .catch(error => console.log('error', error));

        }
        else {
            toast.info("La tarea debe tener algún nombre.");
        }
    }

    const deleteTask = id => {
        if (!confirm("Está seguro que desea eliminar esta tarea"))
            return;
        else {
            fetch('api/Task/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                getTasks();
                toast("Tarea Eliminada Correctamente.");
            });
        }
    }

    const completeTask = id => {
        const taskEdit = tasks.find(tarea => tarea.id == id);
        if (taskEdit.id === id) {
            taskEdit.completada = !taskEdit.completada;
        }

        var formdata = new FormData();
        formdata.append("Texto", taskEdit.texto);
        formdata.append("Completada", taskEdit.completada);
        formdata.append("Id", taskEdit.id);
        var requestOptions = {
            method: 'Put',
            body: formdata,
            redirect: 'follow'
        };

        fetch("api/Task/Edit", requestOptions)
            .then(response => response.text())
            .then(result => {
                const taskUpdate = [...tasks];
                setTask(taskUpdate);
                taskEdit.completada ? toast.success("Tarea completada Correctamente.") : toast.success("Se actualizó la tarea correctamente.");
            })
            .catch(error => console.log('error', error));

    }
    const taskEdit = id => {
        tasks.filter(task => task.id === id).map(x => {
            x.editar = true;
        })
        const taskUpdate = [...tasks];
        setTask(taskUpdate);
    }
    const confirmEdit = (id, input) => {
        const taskEdit = tasks.find(tarea => tarea.id == id);

        var formdata = new FormData();
        formdata.append("Texto", input);
        formdata.append("Completada", taskEdit.completada);
        formdata.append("Id", taskEdit.id);
        var requestOptions = {
            method: 'Put',
            body: formdata,
            redirect: 'follow'
        };

        fetch("api/Task/Edit", requestOptions)
            .then(response => response.text())
            .then(result => {
                getTasks();
                toast.success("Se actualizó la tarea correctamente.");
            })
            .catch(error => console.log('error', error));

    }
    const cancelEdit = () => {
        tasks.filter(x => x.editar === true).map(task => task.editar = false);
        const taskUpdate = [...tasks];
        setTask(taskUpdate);
    }
    const searchTask = text => {
        if (text !== "") {
            const taskFilter = tasks.filter(x => x.texto.includes(text))
            setTask(taskFilter);
        }
        else {
            getTasks();
        }

    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <TaskForm onSubmit={createTask} search={searchTask} />
            <ToastContainer closeButton={false} position="bottom-right" />
            <div className='task-list-container'>
                {
                    tasks.map((task) =>
                        <Task
                            key={task.id}
                            id={task.id}
                            texto={task.texto}
                            editar={task.editar == undefined ? false : task.editar}
                            completada={task.completada}
                            completeTask={completeTask}
                            deleteTask={deleteTask}
                            taskEdit={taskEdit}
                            confirmEdit={confirmEdit}
                            cancelEdit={cancelEdit}
                        />
                    )
                }
            </div>
        </>
    );
}




export default TaskList;