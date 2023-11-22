import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { MdDelete } from "react-icons/md";

interface CardAddressProps {
  id: string;
  name: string;
  recipient: string;
  recipientNumber: string;
  address: string;
  mainAddress: boolean;
  currentActive: boolean;
}

export default function CardAddress(props: CardAddressProps) {
  const {
    id,
    name,
    recipient,
    recipientNumber,
    address,
    mainAddress,
    currentActive,
  } = props;

  return (
    <div className={`flex w-full ${currentActive ? 'bg-[#E4EBF5]' : ''} flex-row items-center justify-between rounded-lg border-2 border-primary-blue pb-9 pt-9`}>
      <section className="flex flex-row gap-10">
        <div className="h-10 w-2 rounded-r-lg bg-primary-blue"></div>
        <section className="flex flex-col gap-3">
          {/* name and main address */}
          <section className="flex flex-row items-center gap-3">
            <span className="font-bold text-[#6D7588]">{name}</span>
              <span className={`rounded-md bg-[#6D7588] p-1 text-white ${mainAddress ? '' : 'hidden'}`}>
                Main Address
              </span>
          </section>
          {/* address details */}
          <ul className="flex flex-col gap-3">
            <li className="font-bold">{recipient}</li>
            <li className="font-medium">{recipientNumber}</li>
            <li className="font-medium">{address}</li>
            <ul className="flex-row gap-3 font-bold text-primary-blue hidden md:flex">
              <li className="hover:cursor-pointer">Change Address</li>
                <li className={`flex gap-3 hover:cursor-pointer ${mainAddress ? 'hidden' : ''}`}>
                  <div className="h-5 w-[1px] bg-[#6D7588]"></div>Make the Main
                  Address
                </li>
                <li className={`flex gap-3 hover:cursor-pointer ${mainAddress ? 'hidden' : ''}`}>
                  <div className="h-5 w-[1px] bg-[#6D7588]"></div>Delete
                </li>
            </ul>
            {/* icons for mobile */}
            <ul className="flex md:hidden text-primary-blue gap-3">
                <li><MdEdit className={`w-7 h-7`}/></li> 
                <li className={`flex gap-3 hover:cursor-pointer ${mainAddress ? 'hidden' : ''}`}><div className="h-5 w-[1px] bg-[#6D7588]"></div><IoMdHome className={`w-7 h-7`}/></li> 
                <li className={`flex gap-3 hover:cursor-pointer ${mainAddress ? 'hidden' : ''}`}><div className="h-5 w-[1px] bg-[#6D7588]"></div><MdDelete className={`w-7 h-7 text-red-600`}/></li> 
            </ul>
          </ul>
        </section>
      </section>
      <IoMdCheckmark className={`mr-12 h-10 w-10 text-primary-blue ${currentActive ? '' : 'hidden'} hidden md:flex`} />
    </div>
  );
}
