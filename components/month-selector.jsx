import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function MonthSelector({ onChange, date }) {

    const handleChange = (newDate) => {
        const updatedDate = newDate ? newDate.date(1).format("MM-DD-YYYY") : '';
        onChange({
            target: {
                name: 'date',
                value: updatedDate
            }
        });
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