interface ModalToastProps {
  closeModal: () => void;
  value: string;
}
export default function ModalToast({ closeModal, value }: ModalToastProps) {
  return (
    <div className="rounded-xl bg-dark-blue px-4 py-2 text-white">
      <div className="text-lg">{value}</div>
      <div className="mt-2 flex justify-end">
        <button
          className="flex h-8 items-center justify-center rounded-full bg-white px-4 text-black"
          onClick={closeModal}
        >
          OK
        </button>
      </div>
    </div>
  );
}
