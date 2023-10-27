import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleHourChange = (event) => {
    setSelectedHour(parseInt(event.target.value, 10));
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(parseInt(event.target.value, 10));
  };

  const formattedDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    selectedHour,
    selectedMinute
  ).toLocaleString("pt-BR", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  console.log(formattedDate);

  return (
    <div style={{ display: "flex", background:"red" }}>
      <h2>Selecione a Data, Hora e Minutos</h2>

      <div >
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
        />
        <div>
          <label>Horas:</label>
          <select value={selectedHour} onChange={handleHourChange}>
            {[...Array(24).keys()].map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <label>Minutos:</label>
          <select value={selectedMinute} onChange={handleMinuteChange}>
            {[...Array(60).keys()].map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p>Data e hora selecionadas: {formattedDate}</p>
    </div>
  );
};

export default DateTimePicker;
