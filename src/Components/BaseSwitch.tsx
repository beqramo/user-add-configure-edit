import React, {ReactElement} from 'react'
import Switch, {SwitchProps} from '@material-ui/core/Switch'
import {withStyles} from '@material-ui/styles'

const PurpleSwitch = withStyles({
  switchBase: {
    color: 'red',
    '&$checked': {
      color: '#305ECA',
    },
    '&$checked + $track': {
      backgroundColor: '#305ECA',
    },
  },
  checked: {},
  track: {
    backgroundColor: '#FF6666',
  },
})(Switch)

const BaseSwitch = (props: SwitchProps): ReactElement => {
  return <PurpleSwitch {...props} />
}

export default React.memo(BaseSwitch)
