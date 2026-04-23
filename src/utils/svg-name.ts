
// function to validate the svg name
const validRegex = /^icon\/[a-z]+(?:-[a-z]+)*$/
const nameExample = 'icon/arrow-left'

export const getNameValidationMessage = (name: string): string | null => {
  const trimmedName = name.trim()

  if (trimmedName === '') {
    return `Name is required. Use ${nameExample}.`
  }

  const normalizedName = trimmedName.toLowerCase()

  if (!normalizedName.startsWith('icon/')) {
    return `Name must start with icon/. Example: ${nameExample}.`
  }

  if (!validRegex.test(normalizedName)) {
    return `Use lowercase kebab-case after icon/. Example: ${nameExample}.`
  }

  return null
}

export const validateName = (name: string): boolean => {
  return getNameValidationMessage(name) === null
}
