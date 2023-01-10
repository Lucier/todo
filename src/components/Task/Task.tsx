import { Trash } from 'phosphor-react';

import styles from './Task.module.css';

interface TaskProps {
  id: number;
  description: string;
  isCompleted: boolean;
  handleChangeIsCompletedTask: (id: number) => void;
  handleDeleteTask: (id: number) => void;
}

export function Task({
  id,
  description,
  isCompleted,
  handleChangeIsCompletedTask,
  handleDeleteTask,
}: TaskProps) {
  return (
    <div className={styles.task}>
      <label className={styles.labelCheckbox}>
        <input
          type="checkbox"
          onChange={() => handleChangeIsCompletedTask(id)}
        />
        <span className={styles.checkmark}></span>
      </label>

      <span className={isCompleted ? styles.descriptionChecked : ''}>
        {description}
      </span>

      <button onClick={() => handleDeleteTask(id)}>
        <Trash size={24} />
      </button>
    </div>
  );
}
