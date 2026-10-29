import { homeEditorialShowcases } from '../data/homeEditorialShowcases'
import EditorialShowcase from './EditorialShowcase'

export default function HomeEditorialShowcases() {
  return (
    <div className="border-t border-line">
      {homeEditorialShowcases.map((showcase) => (
        <EditorialShowcase key={showcase.id} showcase={showcase} />
      ))}
    </div>
  )
}
