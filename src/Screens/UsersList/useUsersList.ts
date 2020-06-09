import React, {useContext, useCallback, useMemo} from 'react'
import {useHistory} from 'react-router-dom'
import {AppContext} from 'App'

import {User, AddUserFormData} from '../../@types/index.d'

import {
  deleteUserAction,
  disableUserAction,
  toggleModal,
  addUserAction,
} from 'reducers/UserActions'

function descendingComparator<User>(a: User, b: User, orderBy: keyof User) {
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

function stableSort(
  array: User[],
  comparator: (a: User, b: User) => number,
  text: string,
) {
  let filteredArray = [...array]
  if (text) {
    filteredArray = filteredArray.filter((val) =>
      `${val.name} ${val.surname} ${val.email}`.includes(text),
    )
  }
  const stabilizedThis = filteredArray.map(
    (el, index) => [el, index] as [User, number],
  )
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const useUsersList = () => {
  const {
    state: {users, modalType, searchText},
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

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof User) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    },
    [order, orderBy],
  )

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    },
    [],
  )

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

  return {
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
  }
}

export default useUsersList
