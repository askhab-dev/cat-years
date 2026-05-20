import { Link, useParams } from 'react-router-dom'
import { useStore } from '@/store'
import { NumericInput } from '@/components/NumericInput/NumericInput'

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()
  const person = useStore((state) => state.people.find((p) => p.id === Number(id)))
  const updatePersonAge = useStore((state) => state.updatePersonAge)

  if (!person) {
    return (
      <div>
        <p className="text-gray-600">Person not found</p>
        <Link to="/" className="text-violet-600 hover:underline text-sm">
          Back to list
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-violet-600 hover:underline text-sm">
        &larr; Back
      </Link>

      <NumericInput
        value={String(person.ageInHours)}
        onChange={(newValue) => updatePersonAge(person.id, Number(newValue) || 0)}
        imgPath="/cat.jpg"
        label={`${person.name.toUpperCase()} IS`}
        suffix="hours old"
      />
    </div>
  )
}
