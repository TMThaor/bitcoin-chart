interface IChangeTimeFrameProps {
  selectedButton: string;
  onButtonClick: (buttonId: string) => void;
}

function ChangeTimeFrame(props: IChangeTimeFrameProps) {
  return (
    <div>
      <button
        className="button"
        id={props.selectedButton === "5m" ? "buttonActive" : ""}
        onClick={() => props.onButtonClick("1m")}
      >
        5m
      </button>
      <button
        className="button"
        id={props.selectedButton === "30m" ? "buttonActive" : ""}
        onClick={() => props.onButtonClick("30m")}
      >
        30m
      </button>
      <button
        className="button"
        id={props.selectedButton === "1h" ? "buttonActive" : ""}
        onClick={() => props.onButtonClick("1h")}
      >
        1h
      </button>
      <button
        className="button"
        id={props.selectedButton === "4h" ? "buttonActive" : ""}
        onClick={() => props.onButtonClick("4h")}
      >
        4h
      </button>
      <button
        className="button"
        id={props.selectedButton === "1d" ? "buttonActive" : ""}
        onClick={() => props.onButtonClick("1d")}
      >
        1d
      </button>
      <button
        className="button"
        id={props.selectedButton === "1w" ? "buttonActive" : ""}
        onClick={() => props.onButtonClick("1w")}
      >
        1w
      </button>
    </div>
  );
}

export default ChangeTimeFrame;
