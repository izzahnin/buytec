import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export enum ModalType {
  NAME = "name",
  BIRTH = "birth",
  GENDER = "gender",
  ADDRESS = "address",
  PHONE = "phone",
}

interface PersonalDataProps {
  text: string;
  value: string;
  email: boolean;
  modalType?: ModalType;
  onOpenModal: (modalType: ModalType | undefined, value: string) => void;
}

export default function PersonalDataItems(props: PersonalDataProps) {
  const { text, value, email, modalType, onOpenModal } = props;

  const handleButtonClick = () => {
    onOpenModal(modalType, value);
  };

  return value.trim() ? (
    <section className="flex gap-28 sm:gap-36">
      <section className="w-0">
        <h2>{text}</h2>
      </section>

      <section className="flex w-full justify-between gap-5">
        <p>{value}</p>
        <button
          onClick={handleButtonClick}
          className={`${
            email ? "select-none text-transparent hover:cursor-default" : ""
          }`}
        >
          <section className={`sm:hidden`}>
            <IoIosArrowForward size={20} />
          </section>

          <section className="hidden font-semibold text-primary-blue-accent sm:block sm:text-text-l">
            <p className={`${email ? "text-transparent" : ""}`}>Change</p>
          </section>
        </button>
      </section>
    </section>
  ) : (
    <section className="flex gap-28 sm:gap-36">
      <h2 className="w-0">{text}</h2>
      <button
        onClick={handleButtonClick}
        className="font-semibold text-primary-blue-accent sm:text-text-l"
      >
        Add
      </button>
    </section>
  );
}
