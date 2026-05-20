import { Link } from 'react-router-dom'

import { isInputActive } from '@/shared/lib/formatNumber'
import { Input } from '@/shared/ui/Input'
import { useStore } from '@/store'
import clsx from 'clsx'

export default function Settings() {
  const minimumAgeInMonths = useStore((state) => state.minimumAgeInMonths)
  const setMinimumAgeInMonths = useStore((state) => state.setMinimumAgeInMonths)
  const isActive = isInputActive(minimumAgeInMonths)

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-sm text-violet-600 hover:underline">
        &larr; Back
      </Link>

      <h1 className="text-xl font-bold text-gray-700">Settings</h1>

      <div>
        <label
          htmlFor="min-age-input"
          className={clsx(
            'block text-sm font-bold tracking-wide uppercase',
            isActive ? 'text-violet-500' : 'text-indigo-950',
          )}
        >
          MINIMUM AGE
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="min-age-input"
            value={minimumAgeInMonths}
            onChange={setMinimumAgeInMonths}
            aria-label="Minimum age in months"
          />
          <span className="text-indigo-950">months</span>
        </div>
      </div>
    </div>
  )
}
