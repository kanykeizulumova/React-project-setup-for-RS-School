import useUserStore from '../store/useUserStore';
import convertFileToBase64 from '../hooks/convertFileToBase64';
import handleFileChange from '../hooks/handleFileChange';

export default function UncontrolledFrom({
  onClose,
}: {
  onClose?: () => void;
}) {
  const addUser = useUserStore((state) => state.addUser);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const fullName = data.fullName as string;
    const email = data.email as string;
    const imageEntry = formData.get('image');

    let base64String: string | undefined;
    if (imageEntry instanceof File && imageEntry.size > 0) {
      base64String = await convertFileToBase64(imageEntry);
    }

    if (!fullName?.trim() || !email?.trim()) return;

    addUser({ ...data, image: base64String });
    form.reset();

    if (onClose) {
      onClose();
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit} className="modal-form">
      <label htmlFor="fullName">
        Your full name:
        <input
          type="text"
          name="fullName"
          placeholder="Enter Your Full Name"
          required
        />
      </label>

      <label htmlFor="age">
        Your age:{' '}
        <input type="number" name="age" placeholder="Enter Your Age" required />
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
      </label>

      <label htmlFor="gender">
        Gender:
        <input type="radio" name="gender" value="male" id="male" />
        Male
        <input type="radio" name="gender" value="female" id="female" />
        Female
      </label>

      <label htmlFor="password">
        Password
        <input name="password" type="password" required />
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password
        <input name="confirmPassword" type="password" required />
      </label>

      <label htmlFor="image">
        Upload image:
        <input
          name="image"
          type="file"
          onChange={(e) => {
            handleFileChange(e);
          }}
          placeholder="Upload your image"
        />
      </label>

      <label
        htmlFor="terms"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <input type="checkbox" name="terms" id="terms" />i agree to{' '}
        <a href="/terms" target="_blank" rel="noopener noreferrer">
          the terms of use and privacy
        </a>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
