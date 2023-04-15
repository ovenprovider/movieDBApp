// Libraries
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

// Styles
import styles from './styles/Star.scss'

type Props = {
  fillRatio: number // Between 0-1
  size: number
}
// Used to adjust the width of the icon since in between certain ratios, the star does not display well
const fixFillRatio = (fillRatio: number) => {
  if (fillRatio >= 0.1 && fillRatio <= 0.3) return fillRatio + 0.2
  if (fillRatio >= 0.4 && fillRatio <= 0.45) return fillRatio + 0.1
  if (fillRatio >= 0.7 && fillRatio < 0.9) return fillRatio - 0.1
  if (fillRatio >= 0.9 && fillRatio < 1) return fillRatio - 0.2
  return fillRatio
}

export const Star: React.FC<Props> = ({ fillRatio, size }) => {
  const fillRatioToUse = fixFillRatio(fillRatio)
  return (
    <View>
      <MaterialIcons name="star" size={size} style={styles.unfilledStar} />
      <MaterialIcons name="star" size={size} style={[styles.filledStar, { width: `${fillRatioToUse * 100}%` }]} />
    </View>
  )
}
