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
  form?: ValidateType,
) => {
  pass: boolean
  error?: string
}

/**
 *
 *
 * @param value
 * @param form
 */
const validator: V = (value, form) => {
  if (form?.require && value.length <= 0) {
    return {
      pass: false,
      error: form?.error?.required,
    }
  }

  if (value.length > (form?.max ?? 100000) || value.length < (form?.min || 0)) {
    return {
      pass: false,
      error: form?.error?.length,
    }
  }
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
