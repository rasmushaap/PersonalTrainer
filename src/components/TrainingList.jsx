import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddTraining from "./AddTraining";

export default function TrainingList() {

    useEffect(() => {getTrainings(), getCustomers()}, []);

    const [trainings, setTrainings] = useState([])
    
    const [customers, setCustomers] = useState([])

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [msgSnackbar, setMsgSnackbar] = useState("")

    const [colDefs] = useState([
        { field: 'date', filter: true, cellRenderer: (params) => dayjs(params.value).format('DD-MM-YYYY HH:mm'), },
        { field: 'duration', filter: true },
        { field: 'activity', filter: true },
        { headerName: 'First Name', field: 'customer.firstname', filter: true },
        { headerName: 'Last Name', field: 'customer.lastname', filter: true },
        { cellRenderer: (params) => <Button size="small" color="error" onClick={() => deleteTraining(params)}>Delete</Button>, width: 120 }
    ])

    const getCustomers = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', { method: 'GET' })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data._embedded.customers)
                setCustomers(data._embedded.customers)
            })
            .catch(error => console.error(error))
    }

    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings', { method: 'GET' })
            .then(response => {
                return response.json()
            })
            .then(responseData => {
                setTrainings(responseData)
            })
            .catch(error => console.error(error))
    }

    const deleteTraining = (params) => {
        if (window.confirm("Are you sure?")) {
            fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${params.data.id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setOpenSnackbar(true)
                        setMsgSnackbar("Delete OK!")
                        getTrainings()
                    } else {
                        setOpenSnackbar(true)
                        setMsgSnackbar("Delete not OK!")
                    }
                })
                .catch(error => console.error(error))
        }
    }

    const addTraining = (training) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                date: training.date,
                activity: training.activity,
                duration: training.duration,
                customer: training.customer._links.self.href
            })
        })
            .then(response => {
                if (response.ok) {
                    setMsgSnackbar("Treeni lisätty onnistuneesti!")
                    setOpenSnackbar(true)
                    return response.json()
                } else {
                    throw new Error("Datan vienti ei onnistunut")
                }
            })
            .then(data => {
                getTrainings()
            })
            .catch(error => {
                console.error("Error adding training:", error);
            });
    }

    return (
        <>
            <div className="ag-theme-material" style={{ width: "100%", height: 500 }}>
                <AgGridReact
                    rowData={trainings}
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
                <AddTraining addTraining={addTraining} customers={customers} />
            </div>
        </>
    )
}