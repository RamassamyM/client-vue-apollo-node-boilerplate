// const regex = /^[#\\w@_-]{8,20}$/

export function isPasswordStrong(value) {
  // return regex.test(value)
  return (
    /[a-z]/.test(value) && // checks for a-z
    /[0-9]/.test(value) && // checks for 0-9
    /\W|_/.test(value) // && // checks for special char
    // value.length >= 6
  )
}
