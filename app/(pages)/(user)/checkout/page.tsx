"use client";
import CardOrderSummary from "@/components/CardOrderSummary";
import CardPaymentMethod from "@/components/CardPaymentMethod";
import { IoIosWarning } from "react-icons/io";
import { useState } from "react";
import Modal from "./Modal";
import ReCAPTCHA from "react-google-recaptcha";

export default function checkout() {
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
    <main className="flex flex-col justify-center gap-4 px-12 py-8">
      <h1 className="py-6 text-heading-l font-bold text-dark-blue">Checkout</h1>
      <div className="flex w-auto flex-row items-center gap-8 rounded-md bg-yellow-500 p-4">
        <IoIosWarning size="50px" />
        <p className="text-heading-m">
          Please fill your addres to continue place order
        </p>
      </div>

      <main className="flex w-full flex-col justify-between gap-8 lg:flex-row">
        <section className="w-full rounded border-2 border-solid border-primary-blue-accent px-6 py-8 lg:w-4/6 ">
          <h2 className="pb-8 text-heading-m font-bold">Payment Method</h2>
          <div className="overflow-clip rounded border-2 border-solid border-primary-blue-accent px-6 py-8">
            <h2 className="pb-8 text-heading-m font-bold">Bank</h2>
            <div className="flex w-auto flex-col items-center gap-6 md:flex-row md:justify-start">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex flex-col gap-6">
                  <CardPaymentMethod bank={"BRI"} image={"/images/bri.svg"} />
                  <CardPaymentMethod bank={"BCA"} image={"/images/bca.svg"} />
                </div>
                <div className="flex flex-col gap-6">
                  <CardPaymentMethod bank={"BNI"} image={"/images/bni.svg"} />
                  <CardPaymentMethod bank={"BSI"} image={"/images/bsi.svg"} />
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <CardPaymentMethod
                  bank={"Mandiri"}
                  image={"/images/mandiri.svg"}
                />
                <CardPaymentMethod
                  bank={"Permata"}
                  image={"/images/permata.svg"}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full lg:w-2/6">
          <div>
            <CardOrderSummary />
          </div>
          <div className="flex justify-center py-8">
            <ReCAPTCHA
              sitekey="6LdFAScpAAAAAIm9ZJw4mxLUiFGNjtfext7LhxV9"
              onChange={handleRecaptchaChange}
            />
          </div>
          <div className="flex w-auto justify-center">
            <button
              className="h-16 w-72 rounded-lg bg-primary-blue-accent text-heading-m font-black text-white"
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
