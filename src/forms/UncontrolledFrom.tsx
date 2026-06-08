import React, { useState } from 'react';
import * as yup from 'yup';
import useUserStore from '../store/useUserStore';
import convertFileToBase64 from '../hooks/convertFileToBase64';
import schema from '../schema';
import useCountryStore from '../store/useCountryStore';
import checkPasswordStrength from '../checkPasswordStrength';

export default function UncontrolledFrom({
  onClose,
}: {
  onClose?: () => void;
}) {
  const addUser = useUserStore((state) => state.addUser);
  const countries = useCountryStore((state) => state.countries);

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const strength = checkPasswordStrength(currentPassword);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    form.querySelectorAll('.error-message').forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.textContent = '';
    });
    const formData = new FormData(form);

    const data: Record<string, unknown> = {
      ...Object.fromEntries(formData.entries()),
      terms: (form.elements.namedItem('terms') as HTMLInputElement).checked,
      image: (form.elements.namedItem('image') as HTMLInputElement).files,
    };

    const imageEntry = formData.get('image');

    let base64String: string | undefined;
    if (imageEntry instanceof File && imageEntry.size > 0) {
      base64String = await convertFileToBase64(imageEntry);
    }

    try {
      const validData = await schema.validate(data, { abortEarly: false });

      const passwordStrengthAtSubmit = checkPasswordStrength(
        String(data.password)
      );

      if (passwordStrengthAtSubmit.score < 4) {
        const errorElement = form.querySelector('#error-password');
        if (errorElement) {
          errorElement.textContent = 'Password is too weak!';
        }
        return;
      }

      addUser({ ...validData, image: base64String });
      form.reset();
      setCurrentPassword('');

      if (onClose) {
        onClose();
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          const errorElement = form.querySelector(`#error-${error.path}`);
          if (errorElement) {
            errorElement.textContent = error.message;
          }
        });
      }
    }
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="modal-form"
      noValidate
    >
      <label htmlFor="fullName">
        Your full name:
        <input
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Enter Your Full Name"
          required
        />
        <p id="error-fullName" className="error-message" />
      </label>

      <label htmlFor="age">
        Your age:{' '}
        <input
          type="number"
          name="age"
          id="age"
          placeholder="Enter Your Age"
          required
        />
        <p id="error-age" className="error-message" />
      </label>

      <label htmlFor="email">
        Enter Email:
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          required
        />
        <p id="error-email" className="error-message" />
      </label>

      <div className="gender-group-container">
        <span
          style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}
        >
          Gender:
        </span>

        <label htmlFor="male">
          <input type="radio" name="gender" value="male" id="male" /> Male
        </label>

        <label htmlFor="female">
          <input type="radio" name="gender" value="female" id="female" /> Female
        </label>

        <p id="error-gender" className="error-message" />
      </div>

      <label htmlFor="password">
        Password
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            name="password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setCurrentPassword(e.target.value)}
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
        <p id="error-password" className="error-message" />
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
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          required
        />
        <p id="error-confirmPassword" className="error-message" />
      </label>

      <label htmlFor="image">
        Upload image:
        <input
          name="image"
          id="image"
          type="file"
          placeholder="Upload your image"
        />
        <p id="error-image" className="error-message" />
      </label>

      <label htmlFor="country-input">
        Country:
        <input
          id="country-input"
          name="country"
          type="text"
          list="countries-list"
          placeholder="Type to search country..."
          required
        />
        <datalist id="countries-list">
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </datalist>
        <p id="error-country" className="error-message" />
      </label>

      <label
        htmlFor="terms"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <input type="checkbox" name="terms" id="terms" />i agree to{' '}
        <a href="/terms" target="_blank" rel="noopener noreferrer">
          the terms of use and privacy
        </a>
        <p id="error-terms" className="error-message" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
