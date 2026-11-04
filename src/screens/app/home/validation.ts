import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { formValidationTypes } from './types';

const FormValidation: ObjectSchema<formValidationTypes> = yup.object().shape({
  Title: yup.string().required('Title is required'),
  pNumber: yup.string().required('Phone Number required'),
  selectedCountry: yup.object().required('Country is required'),
});

export default FormValidation;
