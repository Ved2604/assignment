import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface PaymenudropdownProps {
    selectedMinPay: number;
    setSelectedMinPay: React.Dispatch<React.SetStateAction<number>>;
}

function Paymenudropdown({ selectedMinPay, setSelectedMinPay }: PaymenudropdownProps) {
    const options = [0,10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    const handleChange = (event: SelectChangeEvent<number>) => {
        setSelectedMinPay(parseInt(event.target.value as string, 0)); // Update parent state with selected minimum pay
    };

    const handleClear = () => {
        setSelectedMinPay(0); 
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="min-pay-label">Min Pay</InputLabel>
                <Select
                    labelId="min-pay-label"
                    id="min-pay-select"
                    value={selectedMinPay}
                    label="Min Pay"
                    onChange={handleChange}
                    endAdornment={selectedMinPay !== 0 && (
                        <IconButton onClick={handleClear} edge="end" size="large">
                            <FontAwesomeIcon icon={faTimesCircle} /> {/* Close icon */}
                        </IconButton>
                    )}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option} USD
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default Paymenudropdown;
