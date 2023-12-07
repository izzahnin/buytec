interface ModalToastProps {
  closeModal: () => void;
  value: string;
}
export default function ModalToast({ closeModal, value }: ModalToastProps) {
  return (
    <div className="rounded-xl mt-14 bg-white border-2  px-4 py-2 text-dark-blue">
      <div className="">{value}</div>
      <div className="mt-2 flex justify-end">
        <button
          className="flex h-6 w-1/6 items-center justify-center rounded-lg bg-primary-blue text-white"
          onClick={closeModal}
        >
          OK
        </button>
      </div>
    </div>
  );
}
