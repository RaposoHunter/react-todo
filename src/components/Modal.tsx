import styles from './Modal.module.css';

interface Props
{
    children: React.ReactNode;
}

export default function Modal({ children } : Props)
{
    function closeModal() : void
    {
        const modal = document.getElementById('modal')!;
        modal.classList.add('hide');
    }

    return (
        <div id="modal" className="hide">
            <div className={styles.fade} onClick={closeModal}></div>
            <div className={styles.modal}>
                <h2>Texto modal</h2>

                {children}
            </div>
        </div>
    )
}
