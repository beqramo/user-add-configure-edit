import React from 'react'
import {
  Paper,
  Button,
  FormGroup,
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core'
import {useForm, Controller} from 'react-hook-form'
import styled from 'styled-components'

type FormData = {
  firstName: string
  lastName: string
  email: string
  role: string
}

const StyledPaper = styled(Paper)`
  padding: 4rem;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  position: absolute;
`

const StyledButton = styled(Button)`
  && {
    border-radius: 20px;
    height: 40px;
  }
`
const ErrorStatusText = styled.p<{isValid: boolean}>`
  color: ${(props) => (props.isValid ? '#44D36A' : '#F89797')};
`
const EnhancedTextField = styled(TextField)`
  && {
    margin: 1rem 0;
  }
`

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/

const AddUserForm = (): React.ReactElement => {
  const {handleSubmit, errors, control, formState} = useForm<FormData>({
    reValidateMode: 'onChange',
  })
  console.log(errors, 'errors')

  const addUser = ({firstName, lastName, email}: FormData) => {}
  return (
    <StyledPaper>
      <Typography>Invite New User</Typography>
      <FormGroup>
        <Grid container direction={'row'} spacing={2}>
          <Grid item>
            <Controller
              as={EnhancedTextField}
              control={control}
              defaultValue=""
              name={'firstName'}
              label="* First Name"
              rules={{required: 'required'}}
              error={!!errors['firstName']}
              helperText={errors['firstName']?.message}
            />
          </Grid>
          <Grid item>
            <Controller
              as={EnhancedTextField}
              defaultValue=""
              control={control}
              name={'lastName'}
              label="* Last Name"
              error={!!errors['lastName']}
              helperText={errors['lastName']?.message}
              rules={{required: 'required'}}
            />
          </Grid>
        </Grid>
        <Controller
          as={EnhancedTextField}
          control={control}
          defaultValue=""
          name={'email'}
          label="* Email"
          error={!!errors['email']}
          helperText={errors['email']?.message}
          rules={{
            required: 'required',
            validate: {
              ifNotEmpty: (value: string | undefined) =>
                !value || emailRegex.test(value ?? '') || 'Not Corect Format',
            },
          }}
        />
        <Grid container direction={'row'} spacing={8}>
          <Grid item xs={8}>
            <Controller
              as={(props) => (
                <Select {...props}>
                  <MenuItem value={'admin'}>admin</MenuItem>
                  <MenuItem value={'user'}>user</MenuItem>
                </Select>
              )}
              defaultValue={'admin'}
              control={control}
              name={'role'}
              label="* role"
              error={!!errors['role']}
              helperText={errors['role']?.message}
              rules={{required: 'required'}}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>

        <Grid
          container
          direction="row"
          style={{marginTop: '2rem'}}
          justify={'space-between'}
          alignItems="center"
        >
          <StyledButton
            type={'submit'}
            variant={'contained'}
            onSubmit={handleSubmit(addUser)}
            onClick={handleSubmit(addUser)}
            color={'primary'}
            size={'medium'}
          >
            send Invitation
          </StyledButton>
          <ErrorStatusText isValid={formState.isValid}>
            {formState.isValid ? 'Good to go' : 'Fill in all the fields'}
          </ErrorStatusText>
        </Grid>
      </FormGroup>
    </StyledPaper>
  )
}

export default React.memo(AddUserForm)
