import React, { useEffect, useState } from "react";
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

  const [valueprop, setValueprop] = useState(value);

  useEffect(() => {
    setValueprop(value);
  }, [value]);

  const handleButtonClick = () => {
    onOpenModal(modalType, valueprop);
  };

  return valueprop.trim() ? (
    <section className="flex justify-between text-sm lg:text-base gap-4">
      <section className="w-4/12">
        <h2>{text}</h2>
      </section>

      <section className="flex w-full justify-between gap-5">
        <p>{valueprop}</p>
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
            <p className={`${email ? "hidden" : ""}`}>Change</p>
          </section>
        </button>
      </section>
    </section>
  ) : (
    <section className="flex justify-between">
      <h2>{text}</h2>
      <button
        onClick={handleButtonClick}
        className="font-semibold text-primary-blue-accent sm:text-text-l"
      >
        Add
      </button>
    </section>
  );
}
