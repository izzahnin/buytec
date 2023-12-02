import { useAuth } from "@/firebase/auth/AuthUserProvider";
import React, { useState } from "react";

interface ModalNameProps {
  closeModal: () => void;
  value: string;
}

export default function ModalName({ closeModal, value }: ModalNameProps) {
  const [name, setName] = useState<string>("");
  const [inputError, setInputError] = useState<string | null>(null);
  const auth = useAuth();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setInputError("Please enter your name.");
      return;
    }

    // console.log(`${value ? "Change" : "Add"} value: ${name}`);
    await auth.updateName(name)
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
                  {value.trim() ? "Change Name" : "Add Name"}
                </p>
              </div>
            </header>

            <form className="flex flex-col gap-5 p-6">
              <div className="flex flex-col gap-3">
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="text"
                    placeholder="Input Name"
                    className="w-full outline-none"
                    onChange={(e) => {
                      setName(e.target.value);
                      setInputError(null);
                    }}
                  />
                </div>
                {inputError && (
                  <p className="-mt-2 text-sm text-red-500 md:text-base">
                    {inputError}
                  </p>
                )}

                <p className="text-base md:text-xl">
                  *The name can be seen by other users
                </p>
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
