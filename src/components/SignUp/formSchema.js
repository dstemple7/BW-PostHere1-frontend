import * as yup from 'yup'

const formSchema = yup.object().shape({
  username: yup
    .string().min(2)
    .required('username required'),
  password: yup
    .string().min(5)
    .required('password required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords do not match!')
    .required('confirm password required')
})

export default formSchema