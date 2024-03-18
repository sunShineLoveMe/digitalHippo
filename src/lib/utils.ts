import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 格式化价格
 * @param price 
 * @param options 
 * @returns 
 */
export function formatePrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR'| 'GBP'| 'BDT',
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'USD', notation = 'compact' } = options
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  /**
   * style: 'currency' 表示格式化为货币
   * currency: 'USD' 表示货币类型: 当style 设置为 'currency' 时，currency 是必须的
   * localeMatcher: 'best fit' 表示使用最佳适配的货币符号
   * notation: 'compact' 表示使用紧凑的符号
   * minimumFractionDigits: 2 表示最小小数位数
   */
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}
