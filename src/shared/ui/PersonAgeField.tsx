import clsx from 'clsx'

import { isInputActive } from '@/shared/lib/formatNumber'
import { Input } from '@/shared/ui/Input'

export interface PersonAgeFieldProps {
  name: string
  value: number
  onChange: (value: number) => void
  avatarSrc: string
  avatarAlt?: string
  suffix?: string
  inputId?: string
}

export function PersonAgeField({
  name,
  value,
  onChange,
  avatarSrc,
  avatarAlt,
  suffix = 'hours old',
  inputId = 'hours-input',
}: PersonAgeFieldProps) {
  const isActive = isInputActive(value)

  return (
    <div className="flex items-center gap-3">
      <img
        src={avatarSrc}
        alt={avatarAlt ?? name}
        className={clsx(
          'h-14 w-14 shrink-0 rounded-full object-cover',
          isActive && 'border-2 border-violet-500',
        )}
      />
      <div>
        <label
          htmlFor={inputId}
          className={clsx(
            'block text-sm font-bold tracking-wide uppercase',
            isActive ? 'text-violet-500' : 'text-indigo-950',
          )}
        >
          {name.toUpperCase()} IS
        </label>
        <div className="flex items-center gap-2">
          <Input
            id={inputId}
            value={value}
            onChange={onChange}
            aria-label={`${name} age in hours`}
          />
          <span className="text-indigo-950">{suffix}</span>
        </div>
      </div>
    </div>
  )
}
