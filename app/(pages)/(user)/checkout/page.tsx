"use client";
import CardOrderSummary from "@/components/CardOrderSummary";
import CardPaymentMethod from "@/components/CardPaymentMethod";
import { IoIosWarning } from "react-icons/io";
import { useState } from "react";
import Modal from "./Modal";
import ReCAPTCHA from "react-google-recaptcha";

export default function Checkout() {
  const [openModal, setOpenModal] = useState(false);

  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  const handleOpenModal = () => {
    if (isRecaptchaVerified) {
      setOpenModal(true);
    } else {
      alert("Please verify ReCAPTCHA first.");
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleRecaptchaChange = (value: any) => {
    setIsRecaptchaVerified(true);
    console.log("reCAPTCHA value:", value);
  };

  return (
    <main className="mx-4 my-6 flex flex-col justify-center gap-4 md:mx-12">
      <h1 className="text-heading-s font-bold text-dark-blue">Checkout</h1>

      <div className="flex w-auto flex-row items-center gap-2 rounded-md bg-yellow-500 p-3">
        <IoIosWarning size={26} />
        <p className="">Please fill your addres to continue place order</p>
      </div>

      <main className="flex w-full flex-col justify-between gap-6 lg:flex-row">
        <section className="flex h-fit w-full flex-col gap-4 rounded border-2 border-solid border-primary-blue-accent p-2 md:p-6 lg:w-1/2 ">
          <h2 className="text-heading-s font-bold">Payment Method</h2>
          <div className="overflow-clip rounded border-2 border-solid border-primary-blue-accent p-4 md:p-6">
            <h2 className="text-heading-s font-bold">Bank</h2>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <CardPaymentMethod bank={"BRI"} image={"/images/bri.svg"} />
              <CardPaymentMethod bank={"BCA"} image={"/images/bca.svg"} />
              <CardPaymentMethod bank={"BNI"} image={"/images/bni.svg"} />
              <CardPaymentMethod bank={"BSI"} image={"/images/bsi.svg"} />
              <CardPaymentMethod
                bank={"Mandiri"}
                image={"/images/mandiri.svg"}
              />
              <CardPaymentMethod
                bank={"Permata"}
                image={"/images/permata.svg"}
              />
            </section>
          </div>
        </section>

        <section className="flex  w-full flex-col lg:w-1/2">
          <CardOrderSummary />

          <div className="flex justify-center py-8">
            <ReCAPTCHA
              sitekey="6LdFAScpAAAAAIm9ZJw4mxLUiFGNjtfext7LhxV9"
              onChange={handleRecaptchaChange}
            />
          </div>

          <div className="flex w-auto justify-center">
            <button
              className="h-16 w-72 rounded-lg bg-primary-blue-accent  font-black text-white"
              type="submit"
              onClick={handleOpenModal}
              disabled={!isRecaptchaVerified}
            >
              Place Order
            </button>
          </div>
        </section>
        {openModal && (
          <>
            <Modal closeModal={handleCloseModal} />
          </>
        )}
      </main>
    </main>
  );
}
