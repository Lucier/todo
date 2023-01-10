import styles from './Info.module.css';

interface InfoProps {
  createdTasks: number;
  finishedTasks: number;
}

export function Info({ createdTasks, finishedTasks }: InfoProps) {
  return (
    <div className={styles.info}>
      <div className={styles.createdTasks}>
        <span>Tarefas criadas</span>
        <div>{createdTasks}</div>
      </div>
      <div className={styles.finishedTasks}>
        <span>Concluídas</span>
        <div>
          {finishedTasks} de {createdTasks}
        </div>
      </div>
    </div>
  );
}
