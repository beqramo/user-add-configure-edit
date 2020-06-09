import React, {ReactElement} from 'react'

import InputLabel from '@material-ui/core/InputLabel'
import Box from '@material-ui/core/Box'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import styled from 'styled-components'
import {User, UpdateUserFormData} from '@types'

import {useForm, Controller} from 'react-hook-form'
import {BaseSwitch} from 'Components'

const StyledButton = styled(Button)<{backgroundColor: string}>`
  && {
    border-radius: 100px;
    height: 60px;
    font-weight: bold;
    background-color: ${(props) => props.backgroundColor};
    width: 100%;
    color: white;
    text-transform: capitalize;
  }
`

const EnhancedTextField = styled(TextField)`
  && {
    margin: 1rem 0;
    width: 100%;
  }
`
const EnhancedSelect = styled(Select)`
  && {
    margin: 1rem 0;
    width: 100%;
  }
`

type UserDetailChangeColumnProp = {
  user: User
  onStatusChange: (id: string) => void
  onUserUpdate: (id: string) => (data: UpdateUserFormData) => void
}

const UserDetailChangeColumn = ({
  user,
  onUserUpdate,
  onStatusChange,
}: UserDetailChangeColumnProp): ReactElement => {
  const {handleSubmit, errors, control, formState} = useForm<
    UpdateUserFormData
  >({
    reValidateMode: 'onChange',
    submitFocusError: true,
    validateCriteriaMode: 'all',
    mode: 'onChange',
    defaultValues: {
      name: user?.name,
      surname: user?.surname,
      admin: user?.admin ? 1 : 0,
    },
  })
  return (
    <Box height={'100%'}>
      <Grid
        container
        justify={'space-between'}
        alignItems={'center'}
        direction={'column'}
      >
        <Typography variant={'h3'}>Details</Typography>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <BaseSwitch
            checked={user.active}
            onChange={onStatusChange.bind(UserDetailChangeColumn, user.id)}
          />
          <Typography variant={'subtitle1'}>The user is </Typography>
          <Typography variant={'subtitle2'}>
            {user.active ? 'Active' : 'Disabled'}
          </Typography>
        </Grid>
        <Grid
          xs={10}
          style={{
            opacity: user?.active ? 1 : 0.4,
            pointerEvents: user?.active ? 'auto' : 'none',
          }}
        >
          <FormGroup>
            <Grid container spacing={2} justify="flex-start">
              <Controller
                as={EnhancedTextField}
                control={control}
                name={'name'}
                label="* First Name"
                rules={{required: 'required'}}
                error={!!errors['name']}
                helperText={errors['name']?.message}
              />
              <Controller
                as={EnhancedTextField}
                control={control}
                name={'surname'}
                label="* Last Name"
                error={!!errors['surname']}
                helperText={errors['surname']?.message}
                rules={{required: 'required'}}
              />
            </Grid>
            <InputLabel id="role-selector">Age</InputLabel>
            <Controller
              as={(props) => (
                <EnhancedSelect {...props} id={'role-selector'}>
                  <MenuItem value={1}>admin</MenuItem>
                  <MenuItem value={0}>user</MenuItem>
                </EnhancedSelect>
              )}
              control={control}
              name={'admin'}
              label="* role"
              error={!!errors['admin']}
              helperText={errors['admin']?.message}
              rules={{required: 'required'}}
              key={'user?.admin'}
            />
            <Grid
              container
              direction="row"
              style={{marginTop: '2rem'}}
              justify={'space-between'}
              alignItems="center"
              item
              xs={8}
            >
              {user.active && (
                <StyledButton
                  variant={'contained'}
                  onClick={handleSubmit(onUserUpdate(user.id))}
                  backgroundColor={'#44A0D3'}
                  color="primary"
                  disabled={!formState.isValid}
                >
                  send Invitation
                </StyledButton>
              )}
            </Grid>
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  )
}

export default React.memo(UserDetailChangeColumn)
