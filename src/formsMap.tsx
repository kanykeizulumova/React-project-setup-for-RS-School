import UncontrolledForm from './forms/UncontrolledForm';
import ReactHookForm from './forms/ReactHookForm';

export const FORMS = {
  UNCONTROLLED: 'UNCONTROLLED',
  RHF: 'RHF',
} as const;

export const formsMap = {
  [FORMS.UNCONTROLLED]: UncontrolledForm,
  [FORMS.RHF]: ReactHookForm,
};
