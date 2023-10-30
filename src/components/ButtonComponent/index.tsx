import { Component } from 'solid-js';
import styles from './styles.module.css';

interface ButtonProps {
  showDelete: boolean;
  onClickAdd: (numberInput: number, numberOutput: number) => void;
  onclickDelete: () => void;
}

const ButtonComponent: Component<ButtonProps> = (props: ButtonProps) => {
  return (
    <div class={styles.wrapper}>
      <button
        class={
          props.showDelete ? styles.buttonDelete : styles.buttonDeleteHidden
        }
        onclick={props.onclickDelete}
      ></button>
      <button class={styles.buttonAdd} onclick={props.onclickDelete}></button>
    </div>
  );
};
