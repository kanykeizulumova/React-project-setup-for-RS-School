import { useForm, type SubmitHandler } from 'react-hook-form';
import useUserStore from './store/useUserStore';

interface IFormInput {
  fullName: string;
  age: number;
  gender: string;
  email: string;
  terms: boolean;
}

export default function ReactHookForm({ onClose }) {
  const addUser = useUserStore((state) => state.addUser);

  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    try {
      addUser(data);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const nameReg = register('fullName');
  const ageReg = register('age');
  const emailReg = register('email');
  const genderReg = register('gender');
  const termsReg = register('terms');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
      <label htmlFor="name-input">
        Your full name:
        <input
          id="name-input"
          name={nameReg.name}
          onChange={nameReg.onChange}
          onBlur={nameReg.onBlur}
          ref={(element) => nameReg.ref(element)}
          placeholder="Enter Your Full Name"
          required
        />
      </label>

      <label htmlFor="age-input">
        Your age:
        <input
          id="age-input"
          name={ageReg.name}
          onChange={ageReg.onChange}
          onBlur={ageReg.onBlur}
          ref={(element) => ageReg.ref(element)}
          placeholder="Enter Your Age"
          required
        />
      </label>

      <label htmlFor="email-input">
        Enter Email:
        <input
          id="email-input"
          name={emailReg.name}
          onChange={emailReg.onChange}
          onBlur={emailReg.onBlur}
          ref={(element) => emailReg.ref(element)}
          placeholder="Enter email"
          required
        />
      </label>

      <label htmlFor="gender-input">
        Gender:
        <input
          id="gender-input"
          type="radio"
          value="male"
          onChange={genderReg.onChange}
          onBlur={genderReg.onBlur}
          ref={(element) => genderReg.ref(element)}
          required
        />{' '}
        Male
        <input
          id="gender-input"
          type="radio"
          value="female"
          onChange={genderReg.onChange}
          onBlur={genderReg.onBlur}
          ref={(element) => genderReg.ref(element)}
          required
        />{' '}
        Female
      </label>

      <label
        htmlFor="terms-input"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <input
          id="terms-input"
          type="checkbox"
          onChange={termsReg.onChange}
          onBlur={termsReg.onBlur}
          ref={(element) => termsReg.ref(element)}
        />
        <span>
          i agree to{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            the terms of use and privacy
          </a>
        </span>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
