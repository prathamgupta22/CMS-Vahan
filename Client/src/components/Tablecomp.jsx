import React, { useState } from "react";
import { data } from "../assets/data.json"; // Ensure this import works in your setup
import { useTable, useSortBy, usePagination } from "react-table";
import { CircleX, Pencil } from "lucide-react";
import EditDialog from "./EditDialog";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Mobile-No",
    accessor: "mobileNumber",
  },
  {
    Header: "Date of Birth",
    accessor: "dateOfBirth",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Salary",
    accessor: "salary",
  },
  {
    Header: "Edit",
    accessor: "edit",
    Cell: () => (
      <button onClick={() => <EditDialog />} className="editButton">
        <Pencil />
      </button>
    ),
  },
  {
    Header: "Delete",
    accessor: "delete",
    Cell: () => (
      <button className="deleteButton">
        <CircleX />
      </button>
    ),
  },
];

const Tablecomp = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 7 } },
    useSortBy,
    usePagination
  );

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="btn-container">
        <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>
          First
        </button>

        <button disabled={!canPreviousPage} onClick={previousPage}>
          Prev
        </button>

        <span>
          {pageIndex + 1} of {pageCount}
        </span>
        <button disabled={!canNextPage} onClick={nextPage}>
          Next
        </button>
        <button
          disabled={pageIndex >= pageCount - 1}
          onClick={() => gotoPage(pageCount - 1)}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Tablecomp;
