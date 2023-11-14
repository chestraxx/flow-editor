import { Component, createSignal, onCleanup } from 'solid-js';
import styles from './styles.module.css';

function clickOutside(el: any, accessor: any) {
  const onClick = (e: any) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener('click', onClick);

  onCleanup(() => document.body.removeEventListener('click', onClick));
}

interface ButtonProps {
  showDelete: boolean;
  onClickAdd: (numberInput: number, numberOutput: number) => void;
  onclickDelete: () => void;
}

const ButtonComponent: Component<ButtonProps> = (props: ButtonProps) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [numberInput, setNumberInput] = createSignal<number>(0);
  const [numberOutput, setNumberOutput] = createSignal<number>(0);

  function handleOnClickAdd(event: any) {
    event.stopPropagation();

    setIsOpen(true);
  }

  function handleOnClickAddNode(event: any) {
    event.stopPropagation();

    if (
      numberInput() > 4 ||
      numberInput() < 0 ||
      numberOutput() > 4 ||
      numberOutput() < 0
    ) {
      return;
    }

    setIsOpen(false);
    props.onClickAdd(numberInput(), numberOutput());
    setNumberInput(0);
    setNumberOutput(0);
  }

  function handleChangeNumberInput(event: any) {
    setNumberInput(event.target.value);
  }

  function handleChangeNumberOutput(event: any) {
    setNumberOutput(event.target.value);
  }

  function handleClickOutsideDropdown(event: any) {
    setIsOpen(false);
    setNumberInput(0);
    setNumberOutput(0);
  }

  return (
    <div class={styles.wrapper}>
      <button
        class={
          props.showDelete ? styles.buttonDelete : styles.buttonDeleteHidden
        }
        onclick={props.onclickDelete}
      >
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          style="overflow: visible; color: currentcolor;"
        >
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
        </svg>
      </button>

      <button class={styles.buttonAdd} onclick={handleOnClickAdd}>
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          height="1em"
          width="1em"
          style="overflow: visible; color: currentcolor;"
        >
          <defs>
            <style></style>
          </defs>
          <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path>
          <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8Z"></path>
        </svg>
      </button>

      <div
        class={isOpen() ? styles.dropdown : styles.dropdownHidden}
        // @ts-ignore
        use:clickOutside={handleClickOutsideDropdown}
      >
        <label class={styles.label}>Number of input</label>
        <input
          class={styles.input}
          type="number"
          value={numberInput()}
          onInput={handleChangeNumberInput}
        ></input>

        <label class={styles.label}>Number of output</label>
        <input
          class={styles.input}
          type="number"
          value={numberOutput()}
          onInput={handleChangeNumberOutput}
        ></input>

        <button class={styles.buttonRect} onclick={handleOnClickAddNode}>
          Add node
        </button>
      </div>
    </div>
  );
};

export default ButtonComponent;
