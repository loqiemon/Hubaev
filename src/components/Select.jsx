import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDemo(props) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {props.label}
                </InputLabel>
                <NativeSelect
                    inputProps={{
                        name: '',
                        id: 'uncontrolled-native',
                    }}
                    onChange={props.onChange}
                >
                    {props.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.value}</option>
                    ))}
                </NativeSelect>
            </FormControl>
        </Box>
    );
}