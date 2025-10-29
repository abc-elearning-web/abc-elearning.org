import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { styled } from "@mui/material/styles";

const CustomCalendarHeaderRoot = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 16px",
  alignItems: "center",
});

/** use client để tránh lỗi cfl server side - client side */
const ChooseExamDate = ({
  sx,
  onDontKnowYet,
  onSubmit,
}: {
  sx?: React.CSSProperties;
  onSubmit: any;
  onDontKnowYet: any;
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));
  return (
    <div
      className="choose-exam-date"
      style={{
        background: "#fff",
        borderRadius: "12px",
        ...sx,
        padding: "16px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          slots={{ calendarHeader: CustomCalendarHeader }}
          showDaysOutsideCurrentMonth
          dayOfWeekFormatter={(d) => d.format("ddd")}
          onChange={(d) => {
            setValue(d);
          }}
          value={value}
          sx={{
            width: "100%",
            maxWidth: "680px",
            minHeight: "360px",
            ".MuiPickersSlideTransition-root": {
              minHeight: "256px",
            },
          }}
        />
      </LocalizationProvider>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button
          variant="text"
          sx={{
            color: "#E3A651",
            textTransform: "capitalize",
            fontSize: "14px",
            marginRight: "8px",
            fontFamily: "Poppins-Medium",
          }}
          onClick={onDontKnowYet}
        >
          Don't Know Yet
        </Button>
        <Button
          variant="contained"
          sx={{
            background: "#E3A651 !important",
            textTransform: "capitalize",
            boxShadow: "none",
            fontSize: "14px",
            width: "100px",
            borderRadius: "8px",
            height: "36px",
            fontFamily: "Poppins-Medium",
          }}
          disableElevation
          onClick={() => {
            onSubmit(value);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

function CustomCalendarHeader(props: PickersCalendarHeaderProps) {
  const { currentMonth, onMonthChange } = props as unknown as {
    currentMonth: Dayjs;
    onMonthChange: (date: Dayjs) => void;
  };

  const selectNextMonth = () => onMonthChange(currentMonth.add(1, "month"));
  const selectPreviousMonth = () =>
    onMonthChange(currentMonth.subtract(1, "month"));

  return (
    <CustomCalendarHeaderRoot sx={{ justifyContent: "space-around" }}>
      <Stack spacing={1} direction="row">
        <IconButton
          onClick={selectPreviousMonth}
          title="Previous month"
          disableRipple
          sx={{ padding: 0, margin: "8px", background: "#E3A651" }}
        >
          <ChevronLeft htmlColor="#fff" />
        </IconButton>
      </Stack>
      <Typography variant="body2">
        {currentMonth.format("MMMM YYYY")}
      </Typography>
      <Stack spacing={1} direction="row">
        <IconButton
          onClick={selectNextMonth}
          title="Next month"
          disableRipple
          sx={{ padding: 0, margin: "8px", background: "#E3A651" }}
        >
          <ChevronRight htmlColor="#fff" />
        </IconButton>
      </Stack>
    </CustomCalendarHeaderRoot>
  );
}

export default ChooseExamDate;
