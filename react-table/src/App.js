import { useSortBy, useTable, usePagination } from 'react-table';
import { data } from './assets/data.json';

const columns = [
  {
    Header: 'ID', // header which is show in ui
    accessor: 'id' // accessor is like id for header
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Gender',
    accessor: 'gender'
  },
  {
    Header: 'Salary',
    accessor: 'salary'
  },
]

function App() {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
    gotoPage
  } = useTable({
    // columns: [{
    //   Header: '',
    //   accessor: 'id'
    // }],
    columns,
    data,
    // initialState: { pageSize: 5 } // for pagination limit beacuse by default 10 row limit
  },
    useSortBy, // plugins
    usePagination
  )

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>

          {
            headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>

                {
                  headerGroup.headers.map(header => (
                    <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                      {header.render("Header")}

                      {
                        header.isSorted && (
                          <span>{header.isSortedDesc ? ' ⬆️' : ' ⬇️'}</span>
                        )
                      }
                    </th>
                  ))
                }

              </tr>
            ))
          }

          {/* <tr>
            <th>Id</th>
            <th>Gender</th>
            <th>Salary</th>
          </tr> */}
        </thead>

        <tbody {...getTableBodyProps()}>
          {
            // rows.map(row => {
            page.map(row => { // for pagination
              prepareRow(row)

              return <tr {...row.getRowProps()}>
                {
                  row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))
                }
              </tr>
            })
          }


          {/* <tr>
            <td>1</td>
            <td>Male</td>
            <td>55000</td>
          </tr> */}
        </tbody>
      </table>

      <div className='btn-container'>

        <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>First</button>

        <button disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
        <span>{pageIndex + 1} of {pageCount}</span>
        <button disabled={!canNextPage} onClick={nextPage}>Next</button>

        <button disabled={pageIndex >= pageCount - 1} onClick={() => gotoPage(pageCount - 1)}>Last</button>
      </div>
    </div>
  );
}

export default App;
