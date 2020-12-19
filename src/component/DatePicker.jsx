import "date-fns";
import { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { DatePicker as MuiDatePicker } from "@material-ui/pickers";

const DatePicker = (props) => {
  const { date, setDate } = props;
  const [selectedDate, setSelectedDate] = useState(
    date ? new Date(date) : new Date()
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDate(date);
  };

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MuiDatePicker
        autoOk
        value={selectedDate}
        onChange={handleDateChange}
        format="do MMMM yyyy"
        animateYearScrolling
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
