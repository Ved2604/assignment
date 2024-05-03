import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Assuming you have the close icon from Font Awesome

interface DropdownMenuProps {
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
    selectedLocation:string
    
}


function DropdownMenu({ setSelectedLocation,selectedLocation }: DropdownMenuProps) {
    
    const options = ['remote', 'mumbai', 'delhi ncr', 'chennai', 'bangalore'];

    const handleChange = (event: SelectChangeEvent<string>) => {
        
        setSelectedLocation(event.target.value); // Update parent state with selected location
    };

    const handleClear = () => {
        
        setSelectedLocation(''); // Clear parent state
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedLocation}
                    placeholder='Choose an option'
                    label="Select"
                    onChange={handleChange}
                    endAdornment={selectedLocation && (
                        <IconButton onClick={handleClear} edge="end" size="large">
                            <FontAwesomeIcon icon={faTimesCircle} /> {/* Using the close icon from Font Awesome */}
                        </IconButton>
                    )}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default DropdownMenu;
