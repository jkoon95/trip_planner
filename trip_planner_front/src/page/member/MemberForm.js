import { Input } from "../../component/FormFrm";

const JoinInputWrap = (props) => {
  const {
    label,
    type,
    content,
    data,
    setData,
    placeholder,
    blurEvent,
    checkMsg,
  } = props;

  const chageData = (e) => {
    setData(e.target.value);
  };

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>{label}</label>
        </div>
        <Input
          className="input"
          value={data}
          onChange={chageData}
          placeholder={placeholder}
          type={type}
          data={data}
          setData={setData}
          blurEvent={blurEvent}
        />
      </div>
      {checkMsg && <div className="check-msg">{checkMsg}</div>}
    </div>
  );
};

export { JoinInputWrap };
