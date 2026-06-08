const checkPasswordStrength = (
  password: string
): { score: number; label: string; color: string } => {
  if (!password) return { score: 0, label: 'Too short', color: '#e0e0e0' };

  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  if (score <= 2) return { score, label: 'Weak', color: '#d32f2f' };
  if (score <= 4) return { score, label: 'Medium', color: '#f57c00' };
  return { score, label: 'Strong', color: '#388e3c' };
};

export default checkPasswordStrength;
