import "./formFrm.css";

const Input = (props) => {
  const type = props.type;
  const placeholder = props.placeholder;
  const content = props.content;
  const data = props.data; //input태그와 연결할 state
  const setData = props.setData; //state 값 변경 함수
  const clickEvent = props.clickEvent;
  const blurEvent = props.blurEvent;
  const readonly = props.readonly;
  const disabled = props.disabled;
  const inputRef = props.inputRef;
  const keyupEvent = props.keyupEvent;
  const chageData = (e) => {
    setData(e.target.value);
  };
  if (readonly === "readonly") {
    return (
      <input
        className="input"
        id={content}
        type={type}
        value={data || ""}
        readOnly
        ref={inputRef}
        onKeyUp={keyupEvent}
      />
    );
  } else if (disabled === "disabled") {
    return (
      <input
        className="input"
        id={content}
        tnype={type}
        value={data || ""}
        disabled
        ref={inputRef}
        onKeyUp={keyupEvent}
      />
    );
  } else {
    return (
      <input
        className="input"
        id={content}
        placeholder={placeholder}
        type={type}
        value={data || ""}
        onChange={chageData}
        ref={inputRef}
        onKeyUp={keyupEvent}
        onClick={clickEvent}
        onBlur={blurEvent}
      />
    );
  }
};

const Button = (props) => {
  const text = props.text;
  const clickEvent = props.clickEvent;
  const className = props.class;

  return (
    <button type="button" className={className} onClick={clickEvent}>
      {text}
    </button>
  );
};

export { Input, Button };
