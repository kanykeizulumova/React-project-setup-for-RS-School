import UncontrolledFrom from './UncontrolledFrom';
import ReactHookForm from './ReactHookForm';

export const FORMS = {
  UNCONTROLLED: 'UNCONTROLLED',
  RHF: 'RHF',
};

export const formsMap = {
  [FORMS.UNCONTROLLED]: <UncontrolledFrom />,
  [FORMS.RHF]: <ReactHookForm />,
};
