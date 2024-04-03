const Modal = (props) => {
  const className = props.class;
  const open = props.open;
  const closeModal = props.closeModal;
  const title = props.title;
  const content = props.children;
  const useCloseBtn = props.useCloseBtn;

  return (
    open ? (
      <div className={className}>
        <div className="modal_wrap">
          <div className="modal_header">
            <div className="modal_title">{title}</div>
          </div>

          <div className="modal_container">
            <div className="modal_content">
              {content[0]}
            </div>
          </div>

          <div className="modal_footer">
            {content[1]}
          </div>
          {
            useCloseBtn ? (
              <button type="button" onClick={closeModal} className="btn_close"><span className="hidden">닫기</span></button>
            ) : ""
          }
          
        </div>
      </div>
    ) : ""
  );
}

export default Modal;