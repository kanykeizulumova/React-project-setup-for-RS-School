import useUserStore from './store/useUserStore';

// eslint-disable-next-line react/require-default-props
export default function UncontrolledFrom({
  onClose,
}: {
  onClose?: () => void;
}) {
  const addUser = useUserStore((state) => state.addUser);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const fullName = data.fullName as string;
    const email = data.email as string;

    if (!fullName?.trim() || !email?.trim()) return;

    addUser(data);

    event.currentTarget.reset();

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

      <label
        htmlFor="terms"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <input type="checkbox" name="terms" />
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
