import styles from './EmptyList.module.css';

import clipboard from '../../assets/clipboard.png';

export function EmptyList() {
  return (
    <div className={styles.emptyList}>
      <img src={clipboard} alt="clipboard" />
      <span>Você ainda não tem tarefas cadastradas!</span>
      <p>Crie tarefas e organize suas atividades a fazer!</p>
    </div>
  );
}
