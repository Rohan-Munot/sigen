
// function to validate the svg name
const validRegex = /^icon\/[a-z]+(?:-[a-z]+)*$/
export const validateName = (name: string): boolean => {
  if (name.trim() === '') return false;
  const testName = name.trim().toLowerCase();
  return validRegex.test(testName);
}

// function to generate a valid file name

export const generateFileName = (name: string, framework: string): string => {
  const isValid = validateName(name);
  if (!isValid) {
    throw new Error(`Invalid name: "${name}". Name must be in the format "icon/your-icon-name" and contain only lowercase letters and hyphens.`);
  }

  const testName = name.trim().toLowerCase();

  // TODO
  // will be based on the framework, for now default to .tsx
  return `${testName.replace(/^icon\//, '')}.tsx`;
}
