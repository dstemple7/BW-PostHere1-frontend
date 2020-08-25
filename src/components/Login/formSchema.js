import * as yup from 'yup'

const formSchema = yup.object().shape({
  username: yup
    .string().min(2)
    .required('username required'),
  password: yup
    .string().min(5)
    .required('password required')
})

export default formSchema