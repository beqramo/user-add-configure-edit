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
import {validator} from 'utils'
import {AddUserFormData} from '@types'
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
type AddUserFormPropType = {
  onAddUser: (data: AddUserFormData) => void
}
const AddUserForm = ({onAddUser}: AddUserFormPropType): React.ReactElement => {
  const {handleSubmit, errors, control, formState} = useForm<AddUserFormData>({
    reValidateMode: 'onChange',
    submitFocusError: true,
    validateCriteriaMode: 'all',
    mode: 'onChange',
  })

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
              name={'name'}
              label="* First Name"
              rules={{required: 'required'}}
              error={!!errors['name']}
              helperText={errors['name']?.message}
            />
          </Grid>
          <Grid item>
            <Controller
              as={EnhancedTextField}
              defaultValue=""
              control={control}
              name={'surname'}
              label="* Last Name"
              error={!!errors['surname']}
              helperText={errors['surname']?.message}
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
            validate: validator.emailValidator,
          }}
        />
        <Grid container direction={'row'} spacing={8}>
          <Grid item xs={8}>
            <Controller
              as={(props) => (
                <Select {...props}>
                  <MenuItem value={1}>admin</MenuItem>
                  <MenuItem value={0}>user</MenuItem>
                </Select>
              )}
              defaultValue={1}
              control={control}
              name={'admin'}
              label="* role"
              error={!!errors['admin']}
              helperText={errors['admin']?.message}
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
            variant={'contained'}
            onClick={handleSubmit(onAddUser)}
            color={'primary'}
            size={'medium'}
            disabled={!formState.isValid}
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
