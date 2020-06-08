import React, {ReactElement} from 'react'
import {TableCell, TableRow} from '@material-ui/core'
import {Grid, IconButton, Typography} from '@material-ui/core'
import {VpnKey, Settings, Delete} from '@material-ui/icons'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'

import styled from 'styled-components'

import {BaseSwitch} from 'Components'
import {User} from '@types'

const BoldText = styled.p`
  font-weight: bold;
  font-size: 1rem;
  margin: 0;
`

const StyledIconButton = styled(IconButton)<{isActive: boolean}>`
  opacity: ${(props) => (props.isActive ? 1 : 0)};
`
const StyledTableRow = styled(TableRow)<{isActive?: boolean}>`
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`
const KeyIconContainer = styled.div<{isActive?: boolean}>`
  background-color: ${(props) => (props.isActive ? '#7e7ef1' : 'transparent')};
  width: 48px;
  height: 32px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.3rem;
`
interface EnhancedTableRowType extends User {
  onDelete: (id: string) => {}
  onDetail: (id: string) => {}
  onStatusChange: (id: string) => {}
}

const EnhancedTableRow = ({
  id,
  name,
  surname,
  email,
  admin,
  active,
  onDelete,
  onDetail,
  onStatusChange,
}: EnhancedTableRowType): ReactElement => {
  return (
    <StyledTableRow isActive={active} tabIndex={-1}>
      <TableCell>
        <AccountCircleRoundedIcon fontSize={'large'} />
      </TableCell>
      <TableCell scope="row" padding="none">
        <BoldText>
          {name} {surname}
        </BoldText>
        <Typography>{email}</Typography>
      </TableCell>
      <TableCell align="right">
        {admin ? (
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <KeyIconContainer isActive={active}>
              <VpnKey htmlColor={active ? 'white' : 'black'} />
            </KeyIconContainer>
            <BoldText>Admin</BoldText>
          </Grid>
        ) : (
          <BoldText>User</BoldText>
        )}
      </TableCell>
      <TableCell align="right">
        <BaseSwitch
          checked={active}
          onChange={onStatusChange.bind(EnhancedTableRow, id)}
        />
      </TableCell>
      <TableCell align="right" padding={'none'}>
        <Grid container direction={'row'} justify={'flex-end'}>
          <StyledIconButton
            onClick={onDetail.bind(EnhancedTableRow, id)}
            isActive={active}
          >
            <Settings />
          </StyledIconButton>
          <IconButton onClick={onDelete.bind(EnhancedTableRow, id)}>
            <Delete />
          </IconButton>
        </Grid>
      </TableCell>
    </StyledTableRow>
  )
}

export default React.memo(EnhancedTableRow)
