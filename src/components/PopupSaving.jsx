import React from "react";
function PopupSaving({ show, status, onClose, isFile = false }) {
  let a = <div></div>
  if (status) {
    if (isFile == true) {
      a = <div>
        <img className="modal-success" src="/FileUploaded.svg" alt="" />
        <button className="modal-confirm" onClick={onClose}>
          Продолжить
        </button>
      </div>
    } else {
      a = <div>
        <img className="modal-success" src="/SavingSuccess.svg" alt="" />
        <button className="modal-confirm" onClick={onClose}>
          Продолжить
        </button>
      </div>
    }
  } else {
    if (isFile == true) {
      a = <div>
        <img className="modal-fail" src="/UploadingFailed.svg" alt="" />
        <button className="modal-close-1" onClick={onClose}>
          Вернуться
        </button>
        <button className="modal-close" onClick={onClose}>
          Продолжить
        </button>
      </div>
    } else {
      a = <div>
        <img className="modal-fail" src="/SavingFail.svg" alt="" />
        <button className="modal-close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    }

  }
  if (show) {
    return (
      <div className="modal-save">
        <div className="modal-content">
          {a}
        </div>
      </div>
    )
  }
}
export default PopupSaving