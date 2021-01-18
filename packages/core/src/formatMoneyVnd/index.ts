import isNaN from 'lodash/isNaN'

/**
 * func này dùng để chèn thêm `.` vào cho đoan string hiển thị giá tiền
 * đơn vị VND
 *
 * @example
 * ```
 *   const money = formatMoneyVnd(1000000)
 * ```
 *
 * @param value
 */
const formatMoneyVnd: (value: string | number) => string = value => {
  const formatNumber = Number(value)
  if (isNaN(formatNumber)) return '0'
  return formatNumber.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')
}

export default formatMoneyVnd
