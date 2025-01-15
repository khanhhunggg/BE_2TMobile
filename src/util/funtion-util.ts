export const checkPassword = (password: string) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/;
  return regex.test(password);
};
export const checkEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
export const checkPhoneNumber = (phoneNumber: string) => {
  const regex = /^[0-9]{10,11}$/;
  return regex.test(phoneNumber);
};
export const checkBirthDate = (birthDate: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(birthDate);
};
