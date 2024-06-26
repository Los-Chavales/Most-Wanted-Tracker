import { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/reports.css";
import TableReports from "../components/Table_reports";
import { API_REPORTS } from "../utils/api/conexion_server";
import Sent from "../components/Sent";
import Loading from "../components/Loading";

function ReportsPage() {
    //Función para abrir la ventana modal
    const [windowDetails, setWindowDetails] = useState(false);
    const [windowContent, setWindowContent] = useState('');
    const showWindow = function (message) {
        if (message) {
            setWindowContent(message);
            setWindowDetails(true);
        }
    }
    const closeWindow = () => {
        setWindowDetails(false);
        setWindowContent('');
    }
    //Eliminar reportes
    const deleteReport = async function (reportDel) {
        console.debug("Eliminar:", reportDel);
        try {
            const RESPONSE = await API_REPORTS.post("/delete", reportDel);
            console.debug("saliendo del backeend");
            console.debug(RESPONSE);
            if (RESPONSE.status != 200) {
                console.warn(RESPONSE.data);
                return false;
            }
            setLoadingTable(true);
            loadData();
            return
        } catch (error) {
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error al borrar";
            console.error('Error al eliminar:', menError);
            setErrorData(true);
            setErrorAPI(menError);
            setLoadingTable(false);
            return false;
        }
    }

    //Configuración de las tablas
    const columns = [
        {
            name: "Reportado",
            selector: row => row.reported_name,
        },
        {
            name: "Nombre",
            selector: row => row.name,
        },
        {
            name: "Email",
            selector: row => row.email,
        },
        {
            name: "Teléfono",
            selector: row => row.phone,
        },
        {
            name: "Fecha",
            selector: row => row.date_sighting.toString(),
        },
        {
            name: "Mensaje",
            selector: row => <a onClick={() => showWindow(row.description)}>{row.description}</a>,
        },
        {
            name: "Evidencia",
            selector: row => <button><a href={`http://localhost:4000/${row.photo}`} target="_blank" rel="noopener noreferrer">Ver foto</a></button>,
        },
        {
            name: "Acción",
            selector: row => <button onClick={() => deleteReport(row)}>Eliminar</button>,
        },
    ]
    const tableStylesR = {
        headCells: {
            style: {
                backgroundColor: "#A00000",
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 'bold'
            }
        },
        rows: {
            style: {
                fontSize: '15px',
            }
        }
    }
    const tableStylesY = {
        headCells: {
            style: {
                backgroundColor: "#EC9F0B",
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 'bold'
            }
        },
        rows: {
            style: {
                fontSize: '15px',
            }
        }
    }
    //Para guardar los datos a mostrar
    const [dataRed, setDataRed] = useState([])
    const [dataYellow, setDataYellow] = useState([]);
    const [dataRedV, setDataRedV] = useState([])
    const [dataYellowV, setDataYellowV] = useState([]);
    //Para almacenar los reportes a actualizar
    const [noticeReportR, setNoticeReportR] = useState([]);
    const [noticeReportY, setNoticeReportY] = useState([]);
    const [noticeReportRV, setNoticeReportRV] = useState([]);
    const [noticeReportYV, setNoticeReportYV] = useState([]);
    //Para controlar los estados del loader y mostrar errores
    const [errorAPI, setErrorAPI] = useState("");
    const [errorData, setErrorData] = useState(false);
    const [loadingTable, setLoadingTable] = useState(true);
    //Para mostrar/ocultar las secciones de la página
    const [hiddenSectionR, setHiddenSectionR] = useState(true);
    const [hiddenSectionY, setHiddenSectionY] = useState(true);


    //Para obtener los datos del servidor
    async function dataReport() {
        try {
            const RESPONSE = await API_REPORTS.get("/");
            //console.debug(RESPONSE)
            if (RESPONSE.status != 200) {
                console.warn(RESPONSE.response.data);
                return false;
            }
            if (!Array.isArray(RESPONSE.data)) {
                console.warn("No es un array");
                return false;
            };
            setErrorData(false);
            setErrorAPI("");
            setLoadingTable(false);
            return RESPONSE.data;

        } catch (error) {
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error al obtener los datos del servidor";
            console.error('Error al obtener los datos:', menError);
            setErrorData(true);
            setErrorAPI(menError);
            setLoadingTable(false);
            return false;
        }
    }
    //Para separa en diferentes tablas, las alertas rojas y las amarillas
    async function separate(rowsData) {
        let rows = await rowsData;
        const tableR = [];
        const tableY = [];
        const tableRV = [];
        const tableYV = [];
        if (!rows) return console.log("No hay información para mostrar");
        console.debug(rows)
        if (!Array.isArray(rows)) return console.warn("No es un arreglo");
        //console.table(rows);
        for (const row of rows) {
            if (row.date_sighting) {
                //console.log(row.date_sighting)
                let dateFormat = new Date(row.date_sighting);
                if (dateFormat != "Invalid Date") row.date_sighting = dateFormat.toLocaleDateString("es-ES", { timeZone: 'UTC' });
            }
            if (row.state == "Reportado") {//Para saber que tipo de alerta es
                if (row.status) {//Para saber si está aprobado o no
                    tableRV.push(row);
                } else {
                    tableR.push(row);
                }
            } else if (row.state == "Desaparecido") {
                if (row.status) {
                    tableYV.push(row);
                } else {
                    tableY.push(row);
                }
            }
        }
        setDataRed(tableR);
        setDataYellow(tableY);
        setDataRedV(tableRV);
        setDataYellowV(tableYV);
    }
    //Para ejecutar las dos funciones anteriores
    async function loadData() {
        const dataTables = dataReport();
        separate(dataTables);
    }

    //Para obtener los datos al cargar la página
    useEffect(() => {
        loadData();
    }, [])

    //Función para marcar como aprobado un reporte
    const registerSelect = async () => {
        const reportsSel = noticeReportY.concat(noticeReportR).concat(noticeReportYV).concat(noticeReportRV);
        //console.log("tabla que llega")
        //console.table(reportsSel) // llega tal cual 

        reportsSel.forEach((row, index) => {
            let resume = true;
            if (resume && row.status == false) {
                row.status = true;
                resume = false;
            }
            if (resume && row.status == true) {
                row.status = false;
                resume = false;
            }
        });
        //console.log("tabla con estados actualizados");
        //console.table(reportsSel);
        if (reportsSel.length < 1) return console.debug("Vacío", reportsSel);

        if (reportsSel.length < 1) return console.warn('No hay datos para actualizar');//COLOCAR EN LA PÁGINA 

        try {
            const RESPONSE = await API_REPORTS.post("/approve", reportsSel);
            //console.log("saliendo del backeend")
            //console.log(RESPONSE);
            if (RESPONSE.status != 200) {
                console.warn(RESPONSE.data);
                return false;
            }
            setLoadingTable(true);
            loadData();
            return
        } catch (error) {
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error al actualizar";
            console.error('Error al actualizar:', menError);
            setErrorData(true);
            setErrorAPI(menError);
            setLoadingTable(false);
            return false;
        }
    }

    //Función para actualizar la variable cuando se selecciona una fila
    //HAY QUE HACER FUNCIONES POR SEPARADO PARA CADA TABLA
    const selectNoticesR = (notices) => {
        console.log(notices.selectedRows);
        setNoticeReportR(notices.selectedRows);
    }
    const selectNoticesY = (notices) => {
        console.log(notices.selectedRows);
        setNoticeReportY(notices.selectedRows);
    }
    const selectNoticesRV = (notices) => {
        console.log(notices.selectedRows);
        setNoticeReportRV(notices.selectedRows);
    }
    const selectNoticesYV = (notices) => {
        console.log(notices.selectedRows);
        setNoticeReportYV(notices.selectedRows);
    }

    //Para alternar entre mostrar u ocultar las secciónes del menú
    const hiddenMenuR = () => {
        if (hiddenSectionR) {
            setHiddenSectionR(false);
        } else {
            setHiddenSectionR(true);
        }

    }
    const hiddenMenuY = () => {
        if (hiddenSectionY) {
            setHiddenSectionY(false);
        } else {
            setHiddenSectionY(true);
        }
    }

    return (
        <>
            {loadingTable && <Loading />}

            {!loadingTable && !errorData && windowDetails &&
                <section className="modal-message">
                    <div className="modal-container">
                        <h3 className="modal-title">Mensaje</h3>
                        <button className="modal-close" onClick={closeWindow}>
                            X
                        </button>
                        <div className="modal-content">
                            <p>{windowContent}</p>
                        </div>
                    </div>
                </section>
            }

            {!loadingTable && !errorData &&
                <section className="reports_containers">
                    <div className="header_reports_containers">
                        <h1 className="title_users">Reporte de Alertas Rojas</h1>
                        <button className="hidden_section_button" onClick={hiddenMenuR}>{hiddenSectionR ? "Mostrar" : "Ocultar"}</button>
                    </div>
                    {!hiddenSectionR &&
                        <div>
                            <TableReports data={dataRed} title="Pendientes por Aprobar" columns={columns} number={3} styles={tableStylesR} select={true} funDel={registerSelect} funSelDel={selectNoticesR} buttonType="Aprobar" />
                            <TableReports data={dataRedV} title="Reportes Aprobados" columns={columns} number={3} styles={tableStylesR} select={true} funDel={registerSelect} funSelDel={selectNoticesRV} buttonType="Anular" />
                        </div>
                    }
                </section>
            }

            {!loadingTable && !errorData &&
                <section className="reports_containers">
                    <div className="header_reports_containers">
                        <h1 className="title_users">Reporte de Alertas Amarillas</h1>
                        <button className="hidden_section_button" onClick={hiddenMenuY}>{hiddenSectionY ? "Mostrar" : "Ocultar"}</button>
                    </div>
                    {!hiddenSectionY &&
                        <div>
                            <TableReports data={dataYellow} title="Pendientes por Aprobar" columns={columns} number={3} styles={tableStylesY} select={true} funDel={registerSelect} funSelDel={selectNoticesY} buttonType="Aprobar" />
                            <TableReports data={dataYellowV} title="Reportes Aprobados" columns={columns} number={3} styles={tableStylesY} select={true} funDel={registerSelect} funSelDel={selectNoticesYV} buttonType="Anular" />
                        </div>
                    }
                </section>
            }

            {!loadingTable && errorData && <Sent title="Ha ocurrido un error" par={errorAPI} />}
        </>
    )
}

export default ReportsPage