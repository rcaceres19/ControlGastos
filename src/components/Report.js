import React from 'react';
import TableRow from './TableRow';
import PropTypes from 'prop-types';

function Table(props){
    return (
            <table className = "table table-bordered">
                <thead>
                    <h2>Reporte de Control de Gastos</h2>
                    <tr>
                        <td>Fecha</td>
                        <td>Descripcion</td>
                        <td>Monto</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                    { props.entries.map((entry) => <TableRow key={entry.id} entry={entry}/>)}
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

