import React from 'react';
import TableRow from './TableRow';
import PropTypes from 'prop-types';

const encabStyle = {
    textAlign: "center",
    margin: "2rem"
}

function Table(props){
    return (
            <table className = "table table-bordered">
                <thead>
                    <tr>
                        <td style={encabStyle}>Fecha</td>
                        <td style={encabStyle}>Descripción</td>
                        <td style={encabStyle}>Monto</td>
                        <td style={encabStyle}>Acción</td>
                    </tr>
                </thead>
                <tbody>
                    { props.entries.map((entry) => <TableRow key={entry.id} entry={entry}
                                                                   handleUpdateRecord = {props.handleUpdateRecord}
                                                                   handleDeleteRecord = {props.handleDeleteRecord}/>)}
                </tbody>
            </table>
        );
}

export default Table;

Table.propTypes ={
    entries: PropTypes.array,
    handleUpdateRecord: PropTypes.func,
    handleDeleteRecord: PropTypes.func,
}
