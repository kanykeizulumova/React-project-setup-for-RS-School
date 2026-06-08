import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import useUserStore from '../store/useUserStore';
import convertFileToBase64 from '../hooks/convertFileToBase64';
import schema from '../schema';
import checkPasswordStrength from '../checkPasswordStrength';
import useCountryStore from '../store/useCountryStore';

export type IFormInput = yup.InferType<typeof schema>;

export default function ReactHookForm({ onClose }: { onClose: () => void }) {
  const addUser = useUserStore((state) => state.addUser);
  const countries = useCountryStore((state) => state.countries);

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const strength = checkPasswordStrength(currentPassword);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      let base64String: string | undefined;
      if (data.image instanceof FileList && data.image.length > 0) {
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
  const passwordReg = register('password', { deps: ['confirmPassword'] });
  const confirmPasswordReg = register('confirmPassword', {
    deps: ['password'],
  });
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
        {errors.fullName && (
          <p className="error-message">{errors.fullName.message}</p>
        )}
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
        {errors.age && <p className="error-message">{errors.age.message}</p>}
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
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
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
        {errors.gender && (
          <p className="error-message">{errors.gender.message}</p>
        )}
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
        {errors.gender && (
          <p className="error-message">{errors.gender.message}</p>
        )}
      </label>

      <label htmlFor="password-input">
        Password
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            id="password-input"
            name={passwordReg.name}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              const { value } = e.target;
              setValue('password', value);
              setCurrentPassword(value);
              trigger(['password', 'confirmPassword']);
            }}
            onBlur={passwordReg.onBlur}
            ref={(element) => passwordReg.ref(element)}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {showPassword ? (
              <svg
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                className="icon__1Md2"
              >
                <path
                  fillRule="evenodd"
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                className="icon__1Md2"
              >
                <path
                  fillRule="evenodd"
                  d="M7.119 14.563L5.982 16.53l-1.732-1 1.301-2.253A8.97 8.97 0 0 1 3 7h2a7 7 0 0 0 14 0h2a8.973 8.973 0 0 1-2.72 6.448l1.202 2.083-1.732 1-1.065-1.845A8.944 8.944 0 0 1 13 15.946V18h-2v-2.055a8.946 8.946 0 0 1-3.881-1.382z"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
        {currentPassword && (
          <div style={{ marginTop: '8px' }}>
            <div
              style={{
                height: '6px',
                width: '100%',
                backgroundColor: '#e0e0e0',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${(strength.score / 5) * 100}%`,
                  backgroundColor: strength.color,
                  transition: 'width 0.3s ease, background-color 0.3s ease',
                }}
              />
            </div>
            <span
              style={{
                fontSize: '12px',
                color: strength.color,
                fontWeight: 'bold',
              }}
            >
              Strength: {strength.label}
            </span>
          </div>
        )}
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password
        <input
          id="confirmPassword"
          type="password"
          name={confirmPasswordReg.name}
          onChange={(e) => {
            setValue('confirmPassword', e.target.value);
            trigger(['password', 'confirmPassword']);
          }}
          onBlur={confirmPasswordReg.onBlur}
          ref={(element) => confirmPasswordReg.ref(element)}
          required
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword.message}</p>
        )}
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
        {errors.image && (
          <p className="error-message">{errors.image.message}</p>
        )}
      </label>

      <label htmlFor="country-input">
        Country:
        <input
          id="country-input"
          type="text"
          list="countries-list-hook-form"
          name={countryReg.name}
          onChange={countryReg.onChange}
          onBlur={countryReg.onBlur}
          ref={(element) => countryReg.ref(element)}
          placeholder="Type to search country..."
          required
        />
        <datalist id="countries-list-hook-form">
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </datalist>
        {errors.country && (
          <p className="error-message">{errors.country.message}</p>
        )}
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
        {errors.terms && (
          <p className="error-message">{errors.terms.message}</p>
        )}
        <span>
          i agree to{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            the terms of use and privacy
          </a>
        </span>
      </label>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
