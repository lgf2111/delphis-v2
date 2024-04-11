import React from "react";

type ModalProps = {
  button: React.ReactNode | string;
  buttonClassName?: string;
  children: React.ReactNode;
  showClose?: boolean;
};
export default function Modal(props: ModalProps) {
  const { button, buttonClassName, children: modal, showClose } = props;
  const modalRef = React.useRef<HTMLDialogElement | null>(null);
  return (
    <>
      <button
        className={`btn ${buttonClassName ?? ""}`}
        onClick={() => modalRef.current?.showModal()}
      >
        {button}
      </button>
      <dialog ref={modalRef} className="modal">
        {showClose ? (
          <>
            <div className="modal-box">
              {modal}
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="modal-box">{modal}</div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
