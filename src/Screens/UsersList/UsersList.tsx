import React, {useContext, useCallback, useMemo} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import EnhancedTableHead from './components/EnhancedTableHead'

import {User, ModalEnum, AddUserFormData} from '../../@types/index.d'
import {AppContext} from 'App'
import styled from 'styled-components'
import EnhancedTableRow from './components/EnhancedTableRow'
import {
  deleteUserAction,
  disableUserAction,
  toggleModal,
  addUserAction,
} from 'reducers/UserActions'
import {useHistory} from 'react-router-dom'
import {Modal} from '@material-ui/core'
import AddUserForm from './components/AddUserForm'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: any, b: any) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const MainDiv = styled.div`
  background-color: #f3f3f3;
  margin-top: 5rem;
`

export default function EnhancedTable() {
  const {
    state: {users, modalType},
    dispatch,
  } = useContext(AppContext)
  let history = useHistory()

  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof User>('id')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const navigateToDetail = useCallback(
    (id: number) => {
      history.push({pathname: `/user-detail/${id}`})
    },
    [history],
  )

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof User,
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = useMemo(
    () =>
      rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage),
    [rowsPerPage, page, users],
  )

  const deleteUser = useCallback(
    (id: string) => {
      dispatch(deleteUserAction(id))
    },
    [dispatch],
  )

  const onStatusChange = useCallback(
    (id: string) => dispatch(disableUserAction(id)),
    [dispatch],
  )
  const onModalClose = useCallback(() => {
    dispatch(toggleModal())
  }, [dispatch])

  const onAddUser = useCallback(
    (data: AddUserFormData) => {
      dispatch(addUserAction(data))
    },
    [dispatch],
  )

  return (
    <MainDiv>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(users as any, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <EnhancedTableRow
                  {...(row as any)}
                  key={row.id}
                  onDelete={deleteUser}
                  onDetail={navigateToDetail}
                  onStatusChange={onStatusChange}
                />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Modal open={modalType === ModalEnum.addUser} onClose={onModalClose}>
        <AddUserForm onAddUser={onAddUser} />
      </Modal>
    </MainDiv>
  )
}
