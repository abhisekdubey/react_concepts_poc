import { useSortBy, useTable } from 'react-table';

const data = [
  {
    id: 1,
    gender: 'Male',
    salary: 55000
  },
  {
    id: 2,
    gender: 'Male',
    salary: 60000
  },
  {
    id: 3,
    gender: 'Female',
    salary: 45000
  },

]

const columns = [
  {
    Header: 'ID', // header which is show in ui
    accessor: 'id' // accessor is like id for header
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    // columns: [{
    //   Header: '',
    //   accessor: 'id'
    // }],
    columns,
    data
  },
    useSortBy)

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
            rows.map(row => {
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
    </div>
  );
}

export default App;
