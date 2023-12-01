import React, { useState } from "react";

interface ModalGenderProps {
  closeModal: () => void;
  value: string;
}

export default function ModalGender({ closeModal, value }: ModalGenderProps) {
  const [gender, setGender] = useState<string>("");
  const [inputError, setInputError] = useState<string | null>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!gender.trim()) {
      setInputError("Please select your gender.");
      return;
    }

    console.log(`${value ? "Change" : "Add"} value: ${gender}`);
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
                  {value.trim() ? "Change Gender" : "Add Gender"}
                </p>
              </div>
            </header>

            <form className="flex flex-col gap-6 p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="flex justify-center gap-8">
                  {["Male", "Female"].map((option) => (
                    <div key={option} className="flex gap-4">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        onChange={(e) => {
                          setGender(e.target.value);
                          setInputError(null);
                        }}
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
                {inputError && (
                  <p className="-mt-2 text-sm text-red-500 md:text-base">
                    {inputError}
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
