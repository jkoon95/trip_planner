import "../page/common/common.css";

const Input = (props) => {
  const data = props.data;            //input태그와 연결할 state
  const setData = props.setData;      //state 값 변경 함수
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const readonly = props.readonly;
  const disabled = props.disabled;
  const inputRef = props.inputRef;
  const keyupEvent = props.keyupEvent;
  const chageData = (e) => {
    setData(e.target.value);
  }
  if (readonly === "readonly") {
    return (
      <input className="input" id={content} type={type} value={data || ""} readOnly ref={inputRef} onKeyUp={keyupEvent} />
    );
  } else if (disabled === "disabled") {
    return (
      <input className="input" id={content} type={type} value={data || ""} disabled ref={inputRef} onKeyUp={keyupEvent} />
    );
  } else {
    return (
      <input className="input" id={content} type={type} value={data || ""} onChange={chageData} onBlur={blurEvent} ref={inputRef} onKeyUp={keyupEvent} />
    );
  }
};

const Button = (props)=>{
  const text = props.text;
  const size = props.size;
  const outline = props.outline;
  const clickEvent = props.clickEvent;
  const className = props.class;
  console.log(className);
  return(
      <button type="button" className={className} onClick={clickEvent}>{text}</button>
  );
}

export { Input, Button };