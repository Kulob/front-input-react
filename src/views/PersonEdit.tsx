import { Link, useParams } from 'react-router-dom'

import { PersonAgeField } from '@/shared/ui/PersonAgeField'
import { useStore } from '@/store'

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()
  const person = useStore((state) => state.people.find((p) => p.id === Number(id)))
  const updatePersonAge = useStore((state) => state.updatePersonAge)

  if (!person) {
    return (
      <div>
        <p className="text-gray-600">Person not found</p>
        <Link to="/" className="text-sm text-violet-600 hover:underline">
          Back to list
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-sm text-violet-600 hover:underline">
        &larr; Back
      </Link>

      <PersonAgeField
        name={person.name}
        value={person.ageInHours}
        onChange={(ageInHours) => updatePersonAge(person.id, ageInHours)}
        avatarSrc="/img.png"
      />
    </div>
  )
}
