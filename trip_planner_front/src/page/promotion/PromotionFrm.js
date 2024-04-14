import { Input } from "../../component/FormFrm";

const PromotionInputWrap = (props) => {
  const {
    label,
    type,
    content,
    data,
    setData,
    placeholder,
    blurEvent,
    checkMsg,
    disabled,
    readOnly,
  } = props;

  const changeData = (e) => {
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
            onChange={changeData}
            placeholder={placeholder}
            type={type}
            data={data}
            disabled={disabled}
            readOnly={readOnly}
            setData={setData}
            blurEvent={blurEvent}
          />
        </div>
        {checkMsg && <p className="msg error">{checkMsg}</p>}
      </div>
    </div>
  );
};

const FileItem = (props) => {
  const file = props.file;
  const fileList = props.fileList;
  const setFileList = props.setFileList;
  const delFileNo = props.delFileNo;
  const setDelFileNo = props.setDelFileNo;

  const deleteFile = () => {
    //delFileNo 배열에 현재 파일번호 추가(controller로 전송해서 작업해야하니까)
    /*
    const copyDelFileNo = [...delFileNo];
    copyDelFileNo.push(file.fileNo);
    setDelFileNo(copyDelFileNo);
    */
    setDelFileNo([...delFileNo, file.boardFileNo]);
    //화면에서 파일 삭제 -> fileList에서 해당 file을 제거
    /*
    const copyFileList = new Array();
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i] !== file) {
        copyFileList.push(fileList[i]);
      }
    }
    setFileList(copyFileList);
*/
    const newFileList = fileList.filter((item) => {
      return item !== file;
    });
    setFileList(newFileList);
  };

  return (
    <p>
      <span className="filename">{file.filename}</span>
      <span className="material-icons del-file-icon" onClick={deleteFile}>
        delete
      </span>
    </p>
  );
};

export { PromotionInputWrap, FileItem };
