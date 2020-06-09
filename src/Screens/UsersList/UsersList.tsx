import React, {useMemo} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import {Modal} from '@material-ui/core'
import styled from 'styled-components'

import {ModalEnum} from '../../@types/index.d'

import EnhancedTableHead from './components/EnhancedTableHead'
import EnhancedTableRow from './components/EnhancedTableRow'
import AddUserForm from './components/AddUserForm'
import useUsersList from './useUsersList'

const MainDiv = styled.div`
  background-color: #f3f3f3;
  margin-top: 5rem;
`

const UsersList = () => {
  const {
    getComparator,
    stableSort,
    navigateToDetail,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    emptyRows,
    deleteUser,
    onStatusChange,
    onModalClose,
    onAddUser,
    modalType,
    searchText,
    order,
    orderBy,
    users,
    page,
    rowsPerPage,
  } = useUsersList()

  return useMemo(
    () => (
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
              {stableSort(
                users as any,
                getComparator(order, orderBy),
                searchText,
              )
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
    ),
    [
      deleteUser,
      emptyRows,
      getComparator,
      handleChangePage,
      handleChangeRowsPerPage,
      handleRequestSort,
      modalType,
      navigateToDetail,
      onAddUser,
      onModalClose,
      onStatusChange,
      order,
      orderBy,
      page,
      rowsPerPage,
      searchText,
      stableSort,
      users,
    ],
  )
}
export default UsersList
