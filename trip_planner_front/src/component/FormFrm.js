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
  const keyDownEvent = props.keyDownEvent;
  const changeData = (e) => {
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
        onChange={changeData}
        ref={inputRef}
        onKeyUp={keyupEvent}
        onClick={clickEvent}
        onBlur={blurEvent}
        onKeyDown={keyDownEvent}
      />
    );
  }
};

const Button = (props) => {
  const id = props.id;
  const text = props.text;
  const clickEvent = props.clickEvent;
  const className = props.class;
  
  return (
    <button type="button" id={id} className={className} onClick={clickEvent}>
      {text}
    </button>
  );
};

const Textarea = (props) => {
  const data = props.data;
  const setData = props.setData;
  const placeholder = props.placeholder;
  const changeData = (e) => {
    setData(e.target.value);
  };

  return(
    <div className="textarea">
      <textarea placeholder={placeholder} value={data || ""} onChange={changeData}></textarea>
    </div>
  );
}

export { Input, Button, Textarea };
