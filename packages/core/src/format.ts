import isNaN from 'lodash/isNaN'

export const formatMoney: (value: string | number) => string = (value) => {
  const formatNumber = Number(value)
  if (isNaN(formatNumber)) return '0'
  return formatNumber.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')
}

// export const a = ''

export const removeVietnamese = (value: string) => {
  let newStr = value
  newStr = newStr.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  newStr = newStr.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  newStr = newStr.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  newStr = newStr.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  newStr = newStr.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  newStr = newStr.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  newStr = newStr.replace(/đ/g, 'd')
  newStr = newStr.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  newStr = newStr.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  newStr = newStr.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  newStr = newStr.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  newStr = newStr.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  newStr = newStr.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  newStr = newStr.replace(/Đ/g, 'D')
  newStr = newStr.replace(/\s/g, '')

  return newStr
}
