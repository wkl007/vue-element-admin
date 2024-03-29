import dayjs from 'dayjs'
import numeral from 'numeral'
import nzh from 'nzh/cn'

/**
 * 格式化时间
 * @param date
 * @param format
 * @returns {string}
 */
export function dateFormat (date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return
  return dayjs(date).format(format)
}

/**
 * 格式化数字
 * @param number
 * @param format
 * @returns {*}
 */
export function numberFormat (number, format = '0,00.00') {
  return numeral(number).format(format)
}

/**
 * 阿拉伯数字转中文数字
 * @param number
 * @param format
 * @returns {*}
 */
export function nzhFormat (number, format = 'encodeS') {
  return nzh[format](number)
}

/**
 * 图像处理
 * @param imageUrl
 * @param options
 * @returns {string|*}
 */
export function imageFormat (imageUrl, options = {}) {
  if (!imageUrl) return
  if (!imageUrl.includes(process.env.VUE_APP_BUCKET)) return imageUrl

  const { scale, width, height } = options
  const rootUrl = `https://${process.env.VUE_APP_BUCKET}.image.myqcloud.com${imageUrl.split('.com')[1]}`

  if (scale) {
    return `${rootUrl}?imageMogr2/thumbnail/!${scale}p`
  } else if (width && height) {
    return `${rootUrl}?imageMogr2/thumbnail/${width}x${height}`
  } else if (width && !height) {
    return `${rootUrl}?imageMogr2/thumbnail/${width}x`
  } else if (!width && height) {
    return `${rootUrl}?imageMogr2/thumbnail/x${height}`
  } else {
    return imageUrl
  }
}
