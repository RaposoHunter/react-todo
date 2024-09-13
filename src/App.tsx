import { useState } from "react";
import styles from "./App.module.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import ITask from "./interfaces/Task";
import Modal from "./components/Modal";

function App() {
    const [taskList, setTaskList] = useState<ITask[]>([]);
    const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);

    function deleteTask(id: string)
    {
        setTaskList(taskList.filter(task => task.id !== id));
    }

    function toggleModal(display: boolean)
    {
        const modal = document.getElementById('modal')!;

        if (display) {
            modal.classList.remove('hide');
        } else {
            modal.classList.add('hide');
        }
    }

    function editTask(task: ITask)
    {
        toggleModal(true);
        setTaskToEdit(task);
    }

    function updateTask(id: string, title: string, difficulty: number)
    {
        const updatedTask: ITask = { id, title, difficulty };

        const updatedItems = taskList.map(task => task.id === id ? updatedTask : task);

        setTaskList(updatedItems);

        toggleModal(false);
    }

    return (
        <div>
            <Modal>
                <TaskForm btnText="Editar Tarefa" taskList={taskList} task={taskToEdit} handleUpdate={updateTask} />
            </Modal>
            <Header />
            <main className={styles.main}>
                <div>
                    <h2>O que você vai fazer?</h2>

                    <TaskForm btnText="Criar Tarefa" taskList={taskList} setTaskList={setTaskList} />
                </div>

                <div>
                    <h2>Suas tarefas:</h2>
                    
                    <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask} />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default App;
