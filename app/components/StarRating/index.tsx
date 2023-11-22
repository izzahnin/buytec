import React from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

interface StarProps {
  stars: number;
}

export function Star(props: StarProps) {
  const { stars } = props;

  const ratingStar = Array.from({ length: 5 }, function (elem, index) {
    let number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <IoMdStar />
        ) : stars >= number ? (
          <IoMdStarHalf />
        ) : (
          <IoMdStarOutline />
        )}
      </span>
    );
  });

  return <main className="flex gap-[1px] text-xl">{ratingStar}</main>;
}
