import React, { useState } from "react";

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
  onSubmit?: () => void;
  onDontKnowYet?: () => void;
  submitLabel?: string;
  dontKnowLabel?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  selectedDate,
  onSubmit,
  onDontKnowYet,
  submitLabel = "Submit",
  dontKnowLabel = "Don't Know Yet",
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
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

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const getPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const getNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    onDateSelect(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  };

  const isPastDate = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: React.ReactNode[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isSelectedDate(day);
      const isPast = isPastDate(day);
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isPast}
          className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            isSelected
              ? "bg-[#3B6AD0] text-white hover:bg-[#2B5BC0]"
              : "text-[#212121] hover:bg-gray-100"
          } ${isPast ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-[#2121210A] border border-gray-200 rounded-xl p-6 w-full max-w-lg mx-auto shadow-sm">
      <div className="flex relative justify-center items-center mb-6">
        <button
          onClick={getPreviousMonth}
          className="absolute left-0 p-2 rounded-full bg-[#3B6AD0] hover:bg-[#2B5BC0] text-white transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h2 className="text-[18px] md:text-base font-medium text-[#212121] px-8 text-center">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <button
          onClick={getNextMonth}
          className="absolute right-0 p-2 rounded-full bg-[#3B6AD0] hover:bg-[#2B5BC0] text-white transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map((day) => (
          <div key={day} className="flex justify-center items-center h-10">
            <span className="text-sm font-medium text-[#212121] text-center">
              {day}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>

      {(onSubmit || onDontKnowYet) && (
        <div className="flex gap-4 justify-end mt-6">
          {onDontKnowYet && (
            <button
              onClick={onDontKnowYet}
              className="px-6 py-3 text-[#21212185] font-medium transition-colors hover:text-[#212121] text-[14px] md:text-base"
            >
              {dontKnowLabel}
            </button>
          )}
          {onSubmit && (
            <button
              onClick={onSubmit}
              className="px-8 py-3 bg-[#3B6AD0] hover:bg-[#2B5BC0] text-white font-medium rounded-lg transition-colors shadow-sm text-[14px] md:text-base"
            >
              {submitLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
