import React, { useState, useEffect, ChangeEvent } from "react";

interface ModalBirthProps {
  closeModal: () => void;
  value: string;
  selectedDate: string;
}

export default function ModalBirth({
  closeModal,
  value,
  selectedDate,
}: ModalBirthProps) {
  const [inputError, setInputError] = useState<string | null>(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const [selectedDay, selectedMonth, selectedYear] = selectedDate.split(" ");

    setDay(selectedDay);
    setMonth(selectedMonth);
    setYear(selectedYear);
  }, [selectedDate]);

  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: 70 }, (_, index) => 2023 - index);

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDay(e.target.value);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!day || !month || !year) {
      setInputError("Please provide your birth");
      return;
    }

    const birth = `${day} ${month} ${year}`;

    closeModal();
    console.log(`${value ? "Change" : "Add"} value: ${birth}`);

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
                <p className="pt-2 text-primary-blue-accent">
                  {value.trim() ? "Change Birth" : "Add Birth"}
                </p>
              </div>
            </header>

            <form className="flex flex-col gap-6 p-6">
              <div className="flex gap-5">
                <div className="w-1/4 origin-bottom rounded-lg border-2 border-gray-300 px-2 active:border-black">
                  <select
                    value={day}
                    onChange={handleDayChange}
                    className="h-full w-full bg-transparent py-2 outline-none"
                  >
                    <option value="">Day</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-5/12 origin-bottom rounded-lg border-2 border-gray-300 px-2 active:border-black">
                  <select
                    value={month}
                    onChange={handleMonthChange}
                    className="h-full w-full bg-transparent py-2 outline-none"
                  >
                    <option value="">Month</option>
                    {months.map((m, index) => (
                      <option key={index} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-1/3 origin-bottom rounded-lg border-2 border-gray-300 px-2 active:border-black">
                  <select
                    value={year}
                    onChange={handleYearChange}
                    className="h-full w-full bg-transparent py-2 outline-none"
                  >
                    <option value="">Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {inputError && (
                <p className="-mt-2 text-sm text-red-500 md:text-base">
                  {inputError}
                </p>
              )}

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
