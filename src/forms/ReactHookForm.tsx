import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useUserStore from '../store/useUserStore';
import convertFileToBase64 from '../hooks/convertFileToBase64';
import schema from '../schema';

export type IFormInput = yup.InferType<typeof schema>;

export default function ReactHookForm({ onClose }: { onClose: () => void }) {
  const addUser = useUserStore((state) => state.addUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      let base64String: string | undefined;

      if (data.image && data.image.size > 0) {
        base64String = await convertFileToBase64(data.image[0]);
      }

      addUser({ ...data, image: base64String });
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
  const imageReg = register('image');
  const passwordReg = register('password');
  const confirmPasswordReg = register('confirmPassword');
  const countryReg = register('country');

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
        {errors.fullName && <p>{errors.fullName.message}</p>}
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
        {errors.age && <p>{errors.age.message}</p>}
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
        {errors.email && <p>{errors.email.message}</p>}
      </label>

      <label htmlFor="gender-input">
        Gender:
        <input
          id="gender-male"
          name="gender"
          type="radio"
          value="male"
          onChange={genderReg.onChange}
          onBlur={genderReg.onBlur}
          ref={(element) => genderReg.ref(element)}
          required
        />{' '}
        Male
        {errors.gender && <p>{errors.gender.message}</p>}
        <input
          id="gender-female"
          name="gender"
          type="radio"
          value="female"
          onChange={genderReg.onChange}
          onBlur={genderReg.onBlur}
          ref={(element) => genderReg.ref(element)}
          required
        />{' '}
        Female
        {errors.gender && <p>{errors.gender.message}</p>}
      </label>

      <label htmlFor="password-input">
        Password
        <input
          id="password-input"
          type="password"
          onChange={passwordReg.onChange}
          onBlur={passwordReg.onBlur}
          ref={(element) => passwordReg.ref(element)}
          required
        />
        {errors.password && <p>{errors.password.message}</p>}
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password
        <input
          id="confirmPassword"
          type="password"
          onChange={confirmPasswordReg.onChange}
          onBlur={confirmPasswordReg.onBlur}
          ref={(element) => confirmPasswordReg.ref(element)}
          required
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </label>

      <label htmlFor="userFiles">
        Upload image:
        <input
          id="userFiles"
          type="file"
          name={imageReg.name}
          onChange={imageReg.onChange}
          onBlur={imageReg.onBlur}
          ref={(element) => imageReg.ref(element)}
          placeholder="Upload your image"
        />
        {errors.image && <p>{errors.image.message}</p>}
      </label>

      <label htmlFor="country-input">
        Country:
        <select
          id="country-input"
          name={countryReg.name}
          onChange={countryReg.onChange}
          onBlur={countryReg.onBlur}
          ref={(element) => countryReg.ref(element)}
          required
        >
          <option value="">Select a country</option>
          <option value="US">USA</option>
          <option value="KZ">Kazakhstan</option>
        </select>
        {errors.country && <p>{errors.country.message}</p>}
      </label>

      <label
        htmlFor="terms-input"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <input
          id="terms-input"
          type="checkbox"
          name="terms"
          onChange={termsReg.onChange}
          onBlur={termsReg.onBlur}
          ref={(element) => termsReg.ref(element)}
        />
        {errors.terms && <p>{errors.terms.message}</p>}
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
