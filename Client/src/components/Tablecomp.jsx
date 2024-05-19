import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { CircleX, Pencil } from "lucide-react";
import EditDialog from "./EditDialog";
// import { data } from "../assets/data.json";
import axios from "axios";

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
    accessor: "mobile_no",
  },
  {
    Header: "Date of Birth",
    accessor: "dob",
  },

  {
    Header: "Edit",
    Cell: ({ row }) => <EditButton rowData={row.original} />,
  },
  {
    Header: "Delete",
    Cell: () => (
      <button className="deleteButton">
        <CircleX />
      </button>
    ),
  },
];
const EditButton = ({ rowData }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleClick} className="editButton">
        <Pencil />
      </button>
      {showModal && (
        <EditDialog
          rowData={rowData}
          onClose={handleClose}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};
const Tablecomp = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/student");
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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
    { columns, data: tableData, initialState: { pageIndex: 0, pageSize: 5 } },
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
