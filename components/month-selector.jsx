import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function MonthSelector({ onChange, date }) {

    const handleChange = (newDate) => {
        if (newDate) {
            const month = newDate.month() + 1; // Dayjs months are 0-indexed
            const year = newDate.year();
            const updatedDate = newDate.date(1).format("YYYY-MM-DD");
            onChange({
                target: {
                    name: 'date',
                    value: updatedDate
                },
                month,
                year
            });
        } else {
            onChange({
                target: {
                    name: 'date',
                    value: ''
                },
                month: null,
                year: null
            });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                views={['year', 'month']}
                label="Select Month"
                inputFormat="YYYY-MM"
                name="date"
                value={date ? dayjs(date) : null}
                onChange={handleChange}
            />
        </LocalizationProvider>
    );
}