import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function DateSelector() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={date => setSelectedDate(date)}
    />
  );
}