import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { TimePicker as MuiTimePicker } from "@material-ui/pickers";

const TimePicker = (props) => {
  const { date, setDate } = props;
  const [selectedDate, setSelectedDate] = React.useState(
    date ? new Date(date) : new Date()
  );

  const handleTimeChange = (date) => {
    setSelectedDate(date);
    setDate(date);
  };

  React.useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MuiTimePicker
        autoOk
        id="time-picker"
        label="Choose time"
        value={selectedDate}
        onChange={handleTimeChange}
        KeyboardButtonProps={{
          "aria-label": "change time",
        }}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default TimePicker;
