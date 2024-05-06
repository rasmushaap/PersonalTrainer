import React from "react"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MenuItem from '@mui/material/MenuItem';

export default function AddTraining(props) {

    const [training, setTraining] = React.useState({
        date: '',
        duration: '',
        activity: '',
        customer: '',
    });

    //open = false, kun ikkuna on kiinni
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleSave = () => {
        props.addTraining(training)
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleDate = (date) => {
        const formattedDate = date.toISOString()
        setTraining({ ...training, date: formattedDate })
    }

    const handleCustomerChange = (event) => {
        setTraining({ ...training, customer: event.target.value });
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>Add Training</Button>

            <Dialog open={open}>
                <DialogTitle>
                    Add Training
                </DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Date" onChange={handleDate} fullWidth />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        onChange={(e) => setTraining({ ...training, duration: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={(e) => setTraining({ ...training, activity: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        select
                        margin="dense"
                        label="Customer"
                        value={training.customer}
                        onChange={handleCustomerChange}
                        variant="standard"
                        fullWidth
                    >
                        {props.customers.map((customer, index) => (
                            <MenuItem key={index} value={customer}>
                                {customer.firstname} {customer.lastname}
                            </MenuItem>
                        ))}
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}