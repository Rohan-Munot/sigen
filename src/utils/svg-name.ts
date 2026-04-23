
// function to validate the svg name
const validRegex = /^icon\/[a-z]+(?:-[a-z]+)*$/
export const validateName = (name: string): boolean => {
  if (name.trim() === '') return false;
  const testName = name.trim().toLowerCase();
  return validRegex.test(testName);
}
