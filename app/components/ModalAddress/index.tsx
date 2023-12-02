import { useAuth } from "@/firebase/auth/AuthUserProvider";
import React, { useState } from "react";

interface ModalAddressProps {
  closeModal: () => void;
  value: string;
}

export default function ModalAddress({ closeModal, value }: ModalAddressProps) {
  const [address, setAddress] = useState<string>("");
  const [addressInputError, setAddressInputError] = useState<string | null>(
    null,
    );
  const auth = useAuth();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!address.trim()) {
      setAddressInputError("Please enter your address.");
      return;
    }

    // console.log(`${value ? "Change" : "Add"} value: ${address}`);
    await auth.updateAddress(address);
    closeModal();
    // window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-screen w-screen bg-white sm:h-auto sm:w-2/4 sm:rounded-lg">
          <section className="flex flex-col text-xl text-black">
            <header className="border-b-2 font-bold">
              <div className="flex items-center gap-10 px-6 py-4 sm:flex-row-reverse sm:justify-between">
                <button onClick={closeModal} className="text-heading-l">
                  &times;
                </button>
                <p className="pt-2 text-primary-blue-accent">
                  {value.trim() ? "Change Address" : "Add Address"}
                </p>
              </div>
            </header>

            <form className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-2">
                <div className="rounded-lg border-2 border-black p-3">
                  <textarea
                    placeholder="Address"
                    className="w-full resize-none outline-none"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setAddressInputError(null);
                    }}
                  />
                </div>
                {addressInputError && (
                  <p className=" text-sm text-red-500 md:text-base">
                    {addressInputError}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="rounded-lg bg-primary-blue-accent py-3 font-bold text-white"
              >
                Save
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
