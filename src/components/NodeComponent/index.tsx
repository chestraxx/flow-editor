import { Accessor, Component, For } from 'solid-js';
import styles from './styles.module.css';

interface NodeProps {
  id: string;
  x: number;
  y: number;
  numberInput: number;
  numberOutput: number;
  selected: boolean;
  onMouseDownNode: (id: string, event: any) => void;
  onMouseDownOutput: (
    outputPositionX: number,
    outputPositionY: number,
    nodeId: string,
    outputIndex: number,
  ) => void;
  onMouseEnterInput: (
    inputPositionX: number,
    inputPositionY: number,
    nodeId: string,
    inputIndex: number,
  ) => void;
  onMouseLeaveInput: (nodeId: string, inputIndex: number) => void;
}

const NodeComponent: Component<NodeProps> = (props: NodeProps) => {
  function handleMouseEnterInput(ref: any, inputIndex: number) {
    const centerX =
      ref.getBoundingClientRect().left +
      Math.abs(
        ref.getBoundingClientRect().right - ref.getBoundingClientRect().left,
      ) /
        2;

    const centerY =
      ref.getBoundingClientRect().top +
      Math.abs(
        ref.getBoundingClientRect().bottom - ref.getBoundingClientRect().top,
      ) /
        2;

    props.onMouseEnterInput(centerX, centerY, props.id, inputIndex);
  }

  function handleMouseLeaveInput(inputIndex: number) {
    props.onMouseLeaveInput(props.id, inputIndex);
  }

  function handleMouseDownOutput(ref: any, event: any, outputIndex: number) {
    event.stopPropagation();

    const centerX =
      ref.getBoundingClientRect().left +
      Math.abs(
        ref.getBoundingClientRect().right - ref.getBoundingClientRect().left,
      ) /
        2;

    const centerY =
      ref.getBoundingClientRect().top +
      Math.abs(
        ref.getBoundingClientRect().bottom - ref.getBoundingClientRect().top,
      ) /
        2;

    props.onMouseDownOutput(centerX, centerY, props.id, outputIndex);
  }

  return (
    <div
      class={props.selected ? styles.nodeSelected : styles.node}
      style={{ transform: `translate(${props.x}px, ${props.y}px)` }}
      onMouseDown={(event: any) => {
        event.stopPropagation();

        props.onMouseDownNode(props.id, event);
      }}
    >
      <div class={styles.inputWrapper}>
        <For each={[...Array(Number(props.numberInput)).keys()]}>
          {(_, index: Accessor<number>) => {
            let inputRef: any = null;
            return (
              <div
                ref={inputRef}
                class={styles.input}
                onMouseEnter={() => handleMouseEnterInput(inputRef, index())}
                onMouseLeave={() => handleMouseLeaveInput(index())}
              ></div>
            );
          }}
        </For>
      </div>

      <div class={styles.outputWrapper}>
        <For each={[...Array(Number(props.numberOutput)).keys()]}>
          {(_, index: Accessor<number>) => {
            let outputRef: any = null;
            return (
              <div
                ref={outputRef}
                class={styles.output}
                onMouseDown={() =>
                  handleMouseDownOutput(outputRef, event, index())
                }
              ></div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default NodeComponent;