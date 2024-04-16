// components/AgeCounter.js
import { useState } from "react";

const AgeCounter = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  // Calculate age based on start and end dates
  const calculateAge = (start, end) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    let years = endDateObj.getFullYear() - startDateObj.getFullYear();
    let months = endDateObj.getMonth() - startDateObj.getMonth();
    let days = endDateObj.getDate() - startDateObj.getDate();

    if (
      months < 0 ||
      (months === 0 && endDateObj.getDate() < startDateObj.getDate())
    ) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const monthDays = new Date(
        endDateObj.getFullYear(),
        endDateObj.getMonth(),
        0
      ).getDate();
      days += monthDays;
      months--;
    }

    return { years, months, days };
  };

  const handleChangeStartDate = (e) => {
    setStartDate(e.target.value);
    setAge(calculateAge(e.target.value, endDate));
  };

  const handleChangeEndDate = (e) => {
    setEndDate(e.target.value);
    setAge(calculateAge(startDate, e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-800">
        Age Counter
      </h1>
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
        <input
          type="date"
          className="border border-blue-300 p-2 rounded mb-4 w-64 focus:outline-none"
          placeholder="Start Date"
          value={startDate}
          onChange={handleChangeStartDate}
        />
        <input
          type="date"
          className="border border-blue-300 p-2 rounded mb-4 w-64 focus:outline-none"
          placeholder="End Date"
          value={endDate}
          onChange={handleChangeEndDate}
        />
        {startDate && endDate && (
          <div className="text-2xl mb-4">
            Your age is: {age.years} years, {age.months} months, and {age.days}{" "}
            days.
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCounter;
