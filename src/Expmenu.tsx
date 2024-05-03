import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface MinExpDropdownProps {
    selectedMinExp: number;
    setSelectedMinExp: React.Dispatch<React.SetStateAction<number>>;
}

function MinExpDropdown({ selectedMinExp, setSelectedMinExp }: MinExpDropdownProps) {
    const options = [0,1,2,3,4,5,6,7,8,9,10]
    const handleChange = (event: SelectChangeEvent<number>) => {
        setSelectedMinExp(parseInt(event.target.value as string, 0)); // Update parent state with selected minimum experience
    };

    const handleClear = () => {
        setSelectedMinExp(0); // Clear parent state by setting minimum experience to 0
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="min-exp-label">Min Experience</InputLabel>
                <Select
                    labelId="min-exp-label"
                    id="min-exp-select"
                    value={selectedMinExp}
                    label="Min Experience"
                    onChange={handleChange}
                    endAdornment={selectedMinExp !== 0 && (
                        <IconButton onClick={handleClear} edge="end" size="large">
                            <FontAwesomeIcon icon={faTimesCircle} /> 
                        </IconButton>
                    )}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option} Year(s)
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MinExpDropdown;
