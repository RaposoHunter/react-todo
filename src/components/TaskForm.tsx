import styles from "./TaskForm.module.css";

interface Props 
{
    btnText: string;
}

export default function TaskForm({ btnText } : Props)
{
    return (
        <form className={styles.form}>
            <div className={styles['input-container']}>
                <label htmlFor="title">Título:</label>
                <input type="text" name="title" id="title" placeholder="Título da tarefa" />
            </div>

            <div className={styles['input-container']}>
                <label htmlFor="difficulty">Dificuldade:</label>
                <input type="text" name="difficulty" id="difficulty" placeholder="Dificuldade da tarefa" />
            </div>

            <input type="submit" value={ btnText } />
        </form>
    )
}
