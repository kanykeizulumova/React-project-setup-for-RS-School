import UncontrolledFrom from './forms/UncontrolledFrom';
import ReactHookForm from './forms/ReactHookForm';

export const FORMS = {
  UNCONTROLLED: 'UNCONTROLLED',
  RHF: 'RHF',
};

export const formsMap = {
  [FORMS.UNCONTROLLED]: <UncontrolledFrom />,
  [FORMS.RHF]: <ReactHookForm onClose={undefined} />,
};
