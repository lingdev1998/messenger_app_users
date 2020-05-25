import React from "react";
import ReactTable from "react-table";

const CommonTable = props => {
    return (
        <ReactTable
            className="cus-table"
            data={props.dataTable.data}
            columns={props.columns}
            onFetchData={props.onFetchData}
            pages={props.dataTable.total !== null && props.dataTable.total > 0 ? (props.dataTable.total % props.defaultPageSize === 0 ? props.dataTable.total / props.defaultPageSize : parseInt(props.dataTable.total / props.defaultPageSize) + 1) : 0}
            defaultPageSize={props.defaultPageSize}
            sortable={false}
            manual
        />
    );
}

export default CommonTable;