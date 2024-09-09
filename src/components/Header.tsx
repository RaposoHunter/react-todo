import styles from './Header.module.css';

export default function Header()
{
    return (
        <header className={styles.header}>
            <h1>{import.meta.env.VITE_APP_NAME}</h1>
        </header>
    )
}
