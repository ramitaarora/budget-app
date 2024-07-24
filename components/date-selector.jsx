import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DateSelector({ onChange, date }) {

    const handleChange = (newDate) => {
        onChange({
            target: {
                name: 'date',
                value: newDate ? newDate.format("YYYY-MM-DD") : ''
            }
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select Date"
                inputFormat="YYYY-MM-DD"
                name="date"
                value={date ? dayjs(date) : null}
                onChange={handleChange}
            />
        </LocalizationProvider>
    );
}