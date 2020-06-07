import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import {User} from '@types'

interface HeadCell {
  disablePadding: boolean
  id: keyof User
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'USER',
  },
  {id: 'admin', numeric: false, disablePadding: false, label: 'ROLE'},
  {id: 'active', numeric: false, disablePadding: false, label: 'STATUS'},
]

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof User,
  ) => void
  order: any
  orderBy: string
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {order, orderBy, onRequestSort} = props
  const createSortHandler = (property: keyof User) => (
    event: React.MouseEvent<unknown>,
  ) => {
    onRequestSort && onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={index ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align={'right'}>ACTION</TableCell>
      </TableRow>
    </TableHead>
  )
}
export default React.memo(EnhancedTableHead)
