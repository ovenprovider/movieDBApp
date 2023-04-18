// Libraries
import { Feather } from '@expo/vector-icons'

type Props = {
  size: number
  color?: string
}

export const MenuIcon: React.FC<Props> = ({ size, color = 'black' }) => {
  return <Feather name="menu" size={size} color={color} />
}
