import React, { useState, useEffect } from "react";
import PersonalDataItems, { ModalType } from "./PersonalDataItems";
import ModalName from "../ModalName";
import ModalGender from "../ModalGender";
import ModalBirth from "../ModalBirth";
import ModalPhoneNumber from "../ModalPhoneNumber";
import ModalAddress from "../ModalAddress";
import { UserType } from "@/firebase/auth/user";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import { useRouter } from "next/navigation";

// async function fetchPersonalData() {
//   return {
//     name: "Syawal Achmad",
//     gender: "Male",
//     birth: "14 November 2004",
//     address: "Grandview Karawaci Block 7, DKI Jakarta",
//     email: "syawalachmad1323@gmail.com",
//     phone: "+6281245991113",
//   };
// }

export default function PersonalData() {
  const [selectedModal, setSelectedModal] = useState<ModalType | null>(null);
  const [modalValue, setModalValue] = useState<string>("");
  const auth = useAuth();
  const router = useRouter();
  const [personalData, setPersonalData] = useState<UserType>(auth.user);

  useEffect(() => {
    async function fetchData() {
      // const data = await fetchPersonalData();
      // setPersonalData(data);
    }

    fetchData();
  }, []);

  const handleOpenModal = (modalType: ModalType | undefined, value: string) => {
    setSelectedModal(modalType as ModalType);
    setModalValue(value);
  };

  const handleCloseModal = () => {
    setSelectedModal(null);
    setModalValue("");
    setPersonalData(auth.user);
  };

  useEffect(() => {
    setPersonalData(auth.user);
  }, [auth.user]);

  const handleLogOut = async () => {
    await auth.logOut();
    router.replace('/');
  }

  return (
    <main className="items flex flex-col gap-10 rounded-xl text-gray-600 sm:gap-2 sm:border-2 sm:border-black sm:p-3">
      <section className="flex flex-col gap-5 border-y-2 border-black p-6 sm:border-y-0">
        <h2 className="text-text-l font-bold text-gray-800">
          Change Personal Data
        </h2>

        <div className="flex w-fit flex-col gap-4 sm:gap-6">
          <PersonalDataItems
            text="Name"
            value={personalData.name || ""}
            email={false}
            modalType={ModalType.NAME}
            onOpenModal={(type, value) => handleOpenModal(type, value)}
          />
          <PersonalDataItems
            text="Gender"
            value={personalData.gender || ""}
            email={false}
            modalType={ModalType.GENDER}
            onOpenModal={(type, value) => handleOpenModal(type, value)}
          />
          <PersonalDataItems
            text="Birth"
            value={personalData.birthdate ?? ""}
            email={false}
            modalType={ModalType.BIRTH}
            onOpenModal={(type, value) => handleOpenModal(type, value)}
          />
          <PersonalDataItems
            text="Address"
            value={personalData.address ?? ""}
            email={false}
            modalType={ModalType.ADDRESS}
            onOpenModal={(type, value) => handleOpenModal(type, value)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-5 border-y-2 border-black p-6 sm:border-y-0">
        <h2 className="text-text-l font-bold text-gray-800">Change Contact</h2>

        <div className="flex w-fit flex-col gap-4 sm:gap-6">
          <PersonalDataItems
            text="Email"
            value={personalData.email || ""}
            email={true}
            onOpenModal={(type, value) => handleOpenModal(type, value)}
          />
          <PersonalDataItems
            text="Phone"
            value={personalData.number ?? ""}
            email={false}
            modalType={ModalType.PHONE}
            onOpenModal={(type, value) => handleOpenModal(type, value)}
          />
        </div>
        <button
        onClick={handleLogOut}
        >
          log out
        </button>
      </section>

      {selectedModal === ModalType.NAME && (
        <ModalName closeModal={handleCloseModal} value={modalValue} />
      )}
      {selectedModal === ModalType.GENDER && (
        <ModalGender closeModal={handleCloseModal} value={modalValue} />
      )}
      {selectedModal === ModalType.BIRTH && (
        <ModalBirth
          closeModal={handleCloseModal}
          value={modalValue}
          selectedDate={personalData.birthdate ?? ""}
        />
      )}
      {selectedModal === ModalType.ADDRESS && (
        <ModalAddress closeModal={handleCloseModal} value={modalValue} />
      )}
      {selectedModal === ModalType.PHONE && (
        <ModalPhoneNumber closeModal={handleCloseModal} value={modalValue} />
      )}
    </main>
  );
}
