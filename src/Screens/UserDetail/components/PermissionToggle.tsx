import React, {ReactElement} from 'react'
import {Grid, Typography} from '@material-ui/core'
import {BaseSwitch} from 'Components'

const PermissionToggle = ({name, status, onChange}: any): ReactElement => {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{opacity: status ? 1 : 0.5}}
    >
      <Typography>{name}</Typography>
      <BaseSwitch checked={status} onChange={onChange} />
    </Grid>
  )
}

export default React.memo(PermissionToggle)
