import React from "react";

interface ModalProps {
  closeModal: () => void;
}

function generateRandomNumbersAsString(): string {
  let randomNumbersString: string = "";
  for (let i = 0; i < 10; i++) {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // Angka antara 1 hingga 100
    randomNumbersString += randomNumber.toString(); // Menggabungkan angka tanpa spasi
  }
  return randomNumbersString; // Mengembalikan string tanpa spasi di antara angka-angkanya
}

// Contoh penggunaan

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  const randomNumbersString: string = generateRandomNumbersAsString();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  }

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
                <p>Bank BRI</p>
              </div>
            </header>

            <div className="flex flex-col gap-2 p-6">
              <div>
                <p className="font-medium">Virtual Account Number</p>
                <p className="font-bold">{randomNumbersString}</p>
              </div>
              <div>
                <p className="font-medium">Cart Total</p>
                <p className="font-bold">
                  <span>Rp.5,999,998,00</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 p-6">
              <button
                onClick={handleSubmit}
                className="rounded-lg bg-primary-blue-accent py-3 font-bold text-white"
              >
                Confirm
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Modal;
