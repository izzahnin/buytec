import React from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

interface ReviewInputStarProps {
  stars: number;
  onClickStar: (number: number) => void;
}

export function ReviewInputStar(props: ReviewInputStarProps) {
  const { stars, onClickStar } = props;

  const ratingStar = Array.from({ length: 5 }, function (elem, index) {
    return (
      <span key={index}>
        {stars >= index + 1 ? <IoMdStar onClick={() => {onClickStar(index+1)}}/> : <IoMdStarOutline onClick={() => {onClickStar(index+1)}} />}
      </span>
    );
  });

  return (
    <main className="flex gap-[1px] text-xl text-dark-blue">{ratingStar}</main>
  );
}
