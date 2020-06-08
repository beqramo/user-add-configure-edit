const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/

const emailValidator = {
  validateEmail: (value: string | undefined) =>
    !value || emailRegex.test(value ?? '') || 'Not Corect Format',
}

export default {
  emailValidator,
}
