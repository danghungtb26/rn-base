export type ValidateType = {
  min: number
  max: number
  regex: RegExp
  format: any
  require: boolean
  emoji: boolean
  special: boolean
  error: {
    required?: string
    format?: string
    length?: string
  }
  space: boolean
}

export type V = (
  value: string,
  form?: ValidateType
) => {
  pass: boolean
  error?: string
}

/**
 *
 * func check validate theo 1 format nhất định
 * @param value
 * @param form
 */
const validator: V = (value, form) => {
  /**
   * check require
   */
  if (form?.require && value.length <= 0)
    return {
      pass: false,
      error: form?.error?.required,
    }
  /**
   * check length
   */
  if (value.length > (form?.max ?? 100000) || value.length < (form?.min || 0))
    return {
      pass: false,
      error: form?.error?.length,
    }
  /**
   * check format theo regex
   */
  if (!form?.regex?.test(value)) {
    return {
      pass: false,
      error: form?.error?.format,
    }
  }
  return {
    pass: true,
  }
}

export default validator
