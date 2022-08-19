import './custom.css';
import ListaDeTareas from './components/TaskList';

function App() {
    return (
        <div className='aplication-task'>
            <div className='task-list-main'>
                <h1>Mis Tareas</h1>
                <ListaDeTareas />
            </div>
        </div>
    );
}

export default App;