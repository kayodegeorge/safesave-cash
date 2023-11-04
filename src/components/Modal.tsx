import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { cn } from "../utils";

type Props = {
  children?: React.ReactNode;
  modalOpen: boolean;
  closeModal: () => void;
  locked?: boolean;
};

const Modal = ({ children, closeModal, modalOpen, locked }: Props) => {
  const ref = useRef(null);
  useOutsideClick(ref, () => {
    if (modalOpen) {
      if (!locked) {
        closeModal();
      }
    }
  });

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-black/50 opacity-0 transition-opacity duration-500 ease-in-out",
        {
          "opacity-100": modalOpen,
        }
      )}
    >
      <div
        className={cn(
          "pointer-events-auto z-50 h-fit w-full translate-y-[100vh] rounded-3xl px-4 transition-all duration-500 ease-in-out md:max-w-lg",
          { "translate-x-0 translate-y-0": modalOpen }
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
