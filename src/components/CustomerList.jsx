import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";
import UpdateCustomer from "./UpdateCustomer";

export default function CustomerList() {

    useEffect(() => getCustomers(), []);

    const [customer, setCustomer] = useState([{
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    }])

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [msgSnackbar, setMsgSnackbar] = useState("")

    const [colDefs] = useState([
        { field: 'firstname', filter: true },
        { field: 'lastname', filter: true },
        { field: 'streetaddress', filter: true },
        { field: 'postcode', filter: true },
        { field: 'city', filter: true },
        { field: 'email', filter: true },
        { field: 'phone', filter: true },
        { cellRenderer: (params) => <UpdateCustomer updateCustomer={updateCustomer} params={params} />, width: 120},
        { cellRenderer: (params) => <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>, width: 120 }
    ])

    const getCustomers = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', { method: 'GET' })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data._embedded.customers)
                setCustomer(data._embedded.customers)
            })
            .catch(error => console.error(error))
    }

    const addCustomer = (customer) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Datan vienti ei onnistunut")
                }
            })
            .then(data => {
                getCustomers()
            })
    }

    const deleteCustomer = (params) => {
        if (window.confirm("Are you sure?")) {
            fetch(params.data._links.customer.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setOpenSnackbar(true)
                        setMsgSnackbar("Delete OK!")
                        getCustomers()
                    }
                    else {
                        setOpenSnackbar(true)
                        setMsgSnackbar("Delete not OK!")
                    }
                })
                .catch(error => console.error(error))
        }
    }

    const updateCustomer = (url, updateCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updateCustomer)
        })
        .then(response => {
            if(response.ok) {
                setMsgSnackbar("Auto päivitetty onnistuneesti!")
                setOpenSnackbar(true)
                return response.json()
            } else {
                throw new Error("Datan vienti ei onnistunut")
            }
        })
        .then(data => {
            getCustomers()
        })
    }

    return (
        <>
            <div className="ag-theme-material" style={{ width: "100%", height: 500 }}>
                <AgGridReact
                    rowData={customer}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
                <Snackbar
                    open={openSnackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => {
                        setOpenSnackbar(false)
                        setMsgSnackbar("")
                    }}>
                </Snackbar>
                <AddCustomer addCustomer={addCustomer} />
                <CSVLink data={customer}>Export data</CSVLink>
            </div>
        </>
    )
}