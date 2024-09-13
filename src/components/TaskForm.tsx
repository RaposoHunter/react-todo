import { useState } from "react";
import styles from "./TaskForm.module.css";
import ITask from "../interfaces/Task";

interface Props 
{
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export default function TaskForm({ btnText, taskList, setTaskList } : Props)
{
    const [id, setId] = useState<string>("");
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState(0);

    function addTaskHander(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();

        setTaskList!([...taskList, {
            id: crypto.randomUUID(),
            title,
            difficulty
        }]);

        setTitle("");
        setDifficulty(0);
    }

    return (
        <form className={styles.form} onSubmit={addTaskHander}>
            <div className={styles['input-container']}>
                <label htmlFor="title">Título:</label>
                <input type="text" name="title" id="title" placeholder="Título da tarefa" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className={styles['input-container']}>
                <label htmlFor="difficulty">Dificuldade:</label>
                <input type="text" name="difficulty" id="difficulty" placeholder="Dificuldade da tarefa" value={difficulty} onChange={(e) => setDifficulty(parseInt(e.target.value || '0'))} />
            </div>

            <input type="submit" value={ btnText } />
        </form>
    )
}
