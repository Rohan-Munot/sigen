// "icon/settings-fill" -> "SettingsFill"
export const toComponentName = (name: string): string => {
  const trimmed = name.trim().toLowerCase()
  const parts = trimmed.split('/').slice(1).join('/').split('-')
  const capitalized = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  return capitalized.join('')
}


// "icon/settings-fill" -> "settings-fill"
export const toFileName = (name: string): string => {
  const trimmed = name.trim().toLowerCase()
  const parts = trimmed.split('/').slice(1).join('/').split('-')
  return parts.join('-')
}
