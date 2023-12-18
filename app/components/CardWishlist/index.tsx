import { toast } from "sonner";
import Image from "next/image";
import React from "react";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import ModalToast from "../ModalToast";
import { FaRegTrashCan } from "react-icons/fa6";

interface CardProps {
  title: string;
  price: string;
  image: string;
  id: string;
}

export default function CardWishlist(props: CardProps) {
  const { title, price, image, id } = props;

  const auth = useAuth();
  const handleDelete = async () => {
    await auth.deleteFromWishlist(id);
  };

  const handleAddToCartClick = async () => {
    if (auth.user.id != null) {
      await auth.addToCart(id, 1);
      await auth.deleteFromWishlist(id);
      toast.custom((t) => (
        <ModalToast
          closeModal={() => toast.dismiss(t)}
          value="Perfume added to cart"
        />
      ));
    } else {
      // TODO: CHANGE POP UP
      // alert('Create account to add perfume to wishlist')
      toast.custom((t) => (
        <ModalToast
          closeModal={() => toast.dismiss(t)}
          value="Create account to add perfume to cart"
        />
      ));
    }
  };

  return (
    <main className="flex w-full items-center gap-2 rounded-xl border-2 border-[#C7C7C7] p-6 ">
      <section className="lg:w-1/10 flex h-fit w-[80px] justify-center object-cover sm:w-1/4 md:w-1/6 xl:w-32 ">
        <Image
          priority={true}
          draggable={false}
          src={image}
          alt={title}
          width={100}
          height={100}
          className="m-auto h-[100px] w-auto object-cover"
        />
      </section>

      <section className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <div className="flex flex-col gap-2">
          <h5 className="line-clamp-2 text-xl">{title}</h5>
          <p className="text-[#606060]">Price : Rp {price}</p>
        </div>

        <div className="flex items-center gap-5  text-[#8D96AA]">
          <button onClick={handleAddToCartClick}>
            <h3 className="">Move to Cart</h3>
          </button>
          <span className="h-6 w-0.5 bg-[#BFC9D9] md:h-6 md:w-0.5"></span>
          <button
            title="Delete Button"
            className="p-1 text-heading-s"
            onClick={handleDelete}
          >
            <FaRegTrashCan />
          </button>
        </div>
      </section>
    </main>
  );
}
