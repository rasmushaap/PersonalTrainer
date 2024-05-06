import React from "react"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function UpdateCustomer(props) {

    const [customer, setCustomer] = React.useState([{
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    }])

    //open = false, kun ikkuna on kiinni
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone,
        })
    }

    const handleSave = () => {
        props.updateCustomer(props.params.data._links.customer.href, customer)
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Edit</Button>

            <Dialog open={open}>
                <DialogTitle>
                    Edit Customer
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="First Name"
                        value={customer.firstname}
                        onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Last Name"
                        value={customer.lastname}
                        onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Street Address"
                        value={customer.streetaddress}
                        onChange={(e) => setCustomer({ ...customer, streetaddress: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Postcode"
                        value={customer.postcode}
                        onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="City"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Phone"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        variant="standard"
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}