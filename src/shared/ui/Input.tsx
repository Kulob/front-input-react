
import clsx from 'clsx'
import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  useCallback,
  useId,
} from 'react'

import { formatDigits, getInputWidth, isInputActive, parseDigits } from '@/shared/lib/formatNumber'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: number
  onChange: (value: number) => void
}

export function Input({
  value,
  onChange,
  id: externalId,
  className,
  disabled,
  onKeyDown,
  ...rest
}: InputProps) {
  const generatedId = useId()
  const id = externalId ?? generatedId

  const isActive = isInputActive(value)
  const displayValue = formatDigits(value)
  const width = getInputWidth(displayValue)

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(Number(parseDigits(event.target.value)) || 0)
    },
    [onChange],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (
        event.key.length === 1 &&
        !/\d/.test(event.key) &&
        !event.ctrlKey &&
        !event.metaKey
      ) {
        event.preventDefault()
      }
      onKeyDown?.(event)
    },
    [onKeyDown],
  )

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      disabled={disabled}
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      style={{ width, transition: 'width 100ms ease' }}
      className={clsx(
        'box-border inline-block max-w-62.5 min-w-18 overflow-x-auto rounded border px-2 py-1 text-lg font-normal tabular-nums leading-none outline-none transition-colors',
        isActive
          ? 'border-violet-500 text-gray-900'
          : 'border-gray-300 text-gray-400',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
      {...rest}
    />
  )
}