import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'; 
interface JobRoleDropdownProps {
    selectedJobRole: string;
    setSelectedJobRole: React.Dispatch<React.SetStateAction<string>>;
}

function JobRoleDropdown({ selectedJobRole, setSelectedJobRole }: JobRoleDropdownProps) {
    const options = ['frontend','backend','ios','android','tech lead']; 

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedJobRole(event.target.value); // Update parent state with selected job role
    };

    const handleClear = () => {
        setSelectedJobRole(''); // Clear parent state
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="job-role-label">Job Role</InputLabel>
                <Select
                    labelId="job-role-label"
                    id="job-role-select"
                    value={selectedJobRole}
                    label="Job Role"
                    onChange={handleChange}
                    endAdornment={selectedJobRole && (
                        <IconButton onClick={handleClear} edge="end" size="large">
                            <FontAwesomeIcon icon={faTimesCircle} /> {/* Close icon */}
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

export default JobRoleDropdown;
