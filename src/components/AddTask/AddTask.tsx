import { useState, ChangeEvent, useEffect } from 'react';

import styles from './AddTask.module.css';
import iconPlus from '../../assets/plus.svg';

import Swal from 'sweetalert2';

interface AddTaskProps {
  handleCreateTask: (description: string) => void;
}

export function AddTask({ handleCreateTask }: AddTaskProps) {
  const [newTask, setNewTask] = useState('');
  const [inputIsActive, setInputIsActive] = useState(false);

  const windowSize = useWindowSize();
  const smallWindow = windowSize.width < 902;

  return (
    <div className={styles.addTask}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={newTask}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setNewTask(event.target.value)
        }
        onBlur={() => setInputIsActive(false)}
        onFocus={() => setInputIsActive(true)}
        className={inputIsActive && !smallWindow ? styles.inputIsActive : ''}
      />
      {inputIsActive && !smallWindow && (
        <span className={styles.inputDescription}>Descrição da tarefa |</span>
      )}
      <button
        className={
          inputIsActive && !smallWindow ? styles.buttonWhenInputIsActive : ''
        }
        onClick={
          newTask.trim().length > 0
            ? () => {
                handleCreateTask(newTask);

                setNewTask('');

                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                  },
                });

                Toast.fire({
                  icon: 'success',
                  title: 'Tarefa criada com sucesso',
                });
              }
            : () =>
                Swal.fire({
                  title: 'Atenção!',
                  text: 'Insira a descrição da tarefa!',
                  icon: 'warning',
                  confirmButtonText: 'Ok',
                })
        }
      >
        Criar
        <img src={iconPlus} />
      </button>
    </div>
  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
