import React, {ReactElement, useCallback} from 'react'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {User} from '@types'

import {BaseSwitch} from 'Components'
import {withStyles} from '@material-ui/styles'
import PermissionToggle from './PermissionToggle'

const ExpansionPanel = withStyles({
  root: {
    backgroundColor: 'transparent',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    width: '100%',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel)

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    flexDirection: 'row-reverse',
    padding: 0,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary)

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: 16,
    paddingLeft: 64,
    width: '100%',
  },
}))(MuiExpansionPanelDetails)

type UserPermissionsColumnProp = {
  user: User
  onPermissionChange: (permissionGroupId: number, permissionId: number) => void
  onSuperAdminChange: () => void
}

const UserPermissionsColumn = ({
  user,
  onPermissionChange,
  onSuperAdminChange,
}: UserPermissionsColumnProp): ReactElement => {
  const [expanded, setExpanded] = React.useState<number | undefined>(undefined)

  const handleChange = (panel: number) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean,
  ) => {
    setExpanded(newExpanded ? panel : undefined)
  }

  const handlePermission = useCallback(
    (permissionGroupId: number, permissionId: number = -1) => (
      event: React.ChangeEvent<{}>,
    ) => {
      event.stopPropagation()
      onPermissionChange(permissionGroupId, permissionId)
    },
    [onPermissionChange],
  )
  return (
    <Box height={'100%'}>
      <Grid
        container
        justify={'space-between'}
        alignItems={'flex-start'}
        direction={'column'}
      >
        <Grid
          container
          item
          alignItems={'center'}
          justify="space-between"
          direction={'row'}
          xs={12}
        >
          <Typography variant={'h3'} align={'left'}>
            Permissions
          </Typography>
          <Typography variant={'body1'} align={'right'}>
            admin
          </Typography>
        </Grid>
        <PermissionToggle
          name={'Super admin'}
          status={user.superAdmin}
          onChange={onSuperAdminChange}
        />

        {user.permissionsGroups.map((permissionsGroup) => (
          <ExpansionPanel
            expanded={expanded === permissionsGroup.id}
            onChange={handleChange(permissionsGroup.id)}
            key={permissionsGroup.id}
            style={{
              opacity: user.active ? 1 : 0.4,
              pointerEvents: user?.active ? 'auto' : 'none',
            }}
          >
            <ExpansionPanelSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Typography>{permissionsGroup.permissionGroupName}</Typography>
                <BaseSwitch
                  checked={permissionsGroup.enabled}
                  onChange={handlePermission(permissionsGroup.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction="column">
                {permissionsGroup.permissions.map((permission) => (
                  <PermissionToggle
                    key={permission.id}
                    name={permission.permission}
                    status={
                      permissionsGroup.enabled ? permission.enabled : false
                    }
                    onChange={handlePermission(
                      permissionsGroup.id,
                      permission.id,
                    )}
                  />
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Grid>
    </Box>
  )
}

export default React.memo(UserPermissionsColumn)
