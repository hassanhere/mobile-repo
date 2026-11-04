import * as yup from 'yup';
import { ICountry } from 'rn-international-phone-number';
import { formValidationTypes } from './types';

const FormValidation = yup.object({
  Title: yup.string().required('Title is required'),
  pNumber: yup.string().required('Phone Number required'),
  selectedCountry: yup.mixed<ICountry>().required('Country is required'),
}) as yup.ObjectSchema<formValidationTypes>;

export default FormValidation;
