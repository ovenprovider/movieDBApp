// Libraries
import { FontAwesome } from '@expo/vector-icons'

type Props = {
  size: number
  color?: string
  selected?: boolean
}

export const HeartIcon: React.FC<Props> = ({ size, color = 'red', selected }) => {
  return <FontAwesome name={selected ? 'heart' : 'heart-o'} size={size} color={color} />
}
