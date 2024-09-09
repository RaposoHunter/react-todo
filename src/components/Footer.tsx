import styles from './Footer.module.css';

export default function Footer()
{
    return (
        <footer className={styles.footer}>
            <p>
                <span>{import.meta.env.VITE_APP_NAME}</span> @ {new Date().getFullYear()}
            </p>
        </footer>
    )
}
