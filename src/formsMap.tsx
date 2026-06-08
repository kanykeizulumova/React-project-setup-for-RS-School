import UncontrolledFrom from './forms/UncontrolledForm';
import ReactHookForm from './forms/ReactHookForm';

export const FORMS = {
  UNCONTROLLED: 'UNCONTROLLED',
  RHF: 'RHF',
} as const;

export const formsMap = {
  [FORMS.UNCONTROLLED]: UncontrolledFrom,
  [FORMS.RHF]: ReactHookForm,
};
