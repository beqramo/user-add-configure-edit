import React, {ReactElement} from 'react'
import Input from '@material-ui/core/Input'

const BaseInput = (): ReactElement => {
  return <Input />
}

export default React.memo(BaseInput)
