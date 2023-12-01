import React, { useState } from "react";

interface ModalPasswordProps {
  closeModal: () => void;
}

export default function ModalPassword({ closeModal }: ModalPasswordProps) {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const [currentPWInputError, setCurrentPWInputError] = useState<string | null>(
    null,
  );
  const [newPWInputError, setNewPWInputError] = useState<string | null>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentPassword.trim()) {
      setCurrentPWInputError("Please enter this field.");
      return;
    }

    if (!newPassword.trim()) {
      setNewPWInputError("Please enter this field.");
      return;
    }

    console.log(`Current Password: ${currentPassword}`);
    console.log(`New Password: ${newPassword}`);
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
                <p className="pt-2 text-primary-blue-accent">Change Password</p>
              </div>
            </header>

            <form className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-10">
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full outline-none"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setCurrentPWInputError(null);
                    }}
                  />
                </div>
                {currentPWInputError && (
                  <p className="-mt-8 text-sm text-red-500 md:text-base">
                    {currentPWInputError}
                  </p>
                )}

                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full outline-none"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setNewPWInputError(null);
                    }}
                  />
                </div>
                {newPWInputError && (
                  <p className="-mt-8 text-sm text-red-500 md:text-base">
                    {newPWInputError}
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
