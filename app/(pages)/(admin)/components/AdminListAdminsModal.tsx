import React, { useState } from "react";

interface AdminListAdminsModalProps {
  onClose: () => void;
  createAdmin: () => void;
  newAdminUsername: string;
  setNewAdminUsername: (value: string) => void;
  newAdminPassword: string;
  setNewAdminPassword: (value: string) => void;
}

export default function AdminListAdminsModal({
  onClose,
  createAdmin,
  newAdminUsername,
  setNewAdminUsername,
  newAdminPassword,
  setNewAdminPassword,
}: AdminListAdminsModalProps) {
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setUsernameError(null);
    setPasswordError(null);

    if (!newAdminUsername.trim()) {
      setUsernameError("Username is required.");
      console.error("Username is required.");
      return;
    }

    if (!newAdminPassword.trim()) {
      setPasswordError("Password is required.");
      console.error("Password is required.");
      return;
    }

    createAdmin();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-screen w-screen bg-white sm:h-auto sm:w-2/4 sm:rounded-lg">
          <section className="flex flex-col text-xl text-black">
            <header className="border-b-2 font-bold">
              <div className="flex items-center gap-10 px-6 py-4 sm:flex-row-reverse sm:justify-between">
                <button onClick={onClose} className="text-heading-l">
                  &times;
                </button>
                <p className="pt-2 text-primary-blue-accent">
                  Create New Admin
                </p>
              </div>
            </header>

            <form className="flex flex-col gap-5 p-6">
              <div className="flex flex-col gap-6">
                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full outline-none"
                    value={newAdminUsername}
                    onChange={(e) => {
                      setNewAdminUsername(e.target.value);
                      setUsernameError(null);
                    }}
                  />
                </div>

                {usernameError && (
                  <p className="-mt-5 text-sm text-red-500 md:text-base">
                    {usernameError}
                  </p>
                )}

                <div className="rounded-lg border-2 border-black p-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full outline-none"
                    value={newAdminPassword}
                    onChange={(e) => {
                      setNewAdminPassword(e.target.value);
                      setPasswordError(null);
                    }}
                  />
                </div>

                {passwordError && (
                  <p className="-mt-5 text-sm text-red-500 md:text-base">
                    {passwordError}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  className="rounded-lg bg-primary-blue-accent py-3 font-bold text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
