import UncontrolledFrom from './forms/UncontrolledFrom';
import ReactHookForm from './forms/ReactHookForm';

export const FORMS = {
  UNCONTROLLED: 'UNCONTROLLED',
  RHF: 'RHF',
} as const;

export const formsMap = {
  [FORMS.UNCONTROLLED]: UncontrolledFrom,
  [FORMS.RHF]: ReactHookForm,
};
