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
    <div className="input_wrap">
      <div>
        <div className="input_title">
          <label className="input2" htmlFor={content}>
            {label}
          </label>
        </div>
        <div className="input_item">
          <Input
            value={data}
            onChange={chageData}
            placeholder={placeholder}
            type={type}
            data={data}
            setData={setData}
            blurEvent={blurEvent}
          />
        </div>
        {checkMsg && <p className="msg error">{checkMsg}</p>}
      </div>
    </div>
  );
};

export { JoinInputWrap };
