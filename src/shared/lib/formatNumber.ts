import { DIGIT_REGEX, INPUT_WIDTH, SPACE_REGEX } from "@/constants"

export function parseDigits(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits === '') return ''
  return digits.replace(/^0+(?=\d)/, '')
}

export function formatDigits(value: string | number): string {
  const digits = String(value).replace(/\D/g, '')
  if (digits === '') return ''
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
}

export function isInputActive(value: number): boolean {
  return value > 9
}
export function getInputWidth(value: string): number {
  const digitsCount = value.match(DIGIT_REGEX)?.length ?? 0
  const spacesCount = value.match(SPACE_REGEX)?.length ?? 0

  const calculatedWidth =
    digitsCount * INPUT_WIDTH.char +
    spacesCount * INPUT_WIDTH.space +
    INPUT_WIDTH.padding

  return Math.min(
    INPUT_WIDTH.max,
    Math.max(INPUT_WIDTH.min, calculatedWidth),
  )
}