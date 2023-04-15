// Libraries
import { Pressable, Image, type GestureResponderEvent } from 'react-native'

// Styles
import styles from './styles/SearchIcon.scss'

type Props = {
  onPress?: (event: GestureResponderEvent) => void
}

export const SearchIcon: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable style={styles.searchIcon} onPress={onPress}>
      <Image
        style={styles.searchIcon}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEU0lEQVRoQ+2ZWahVVRjHtUEcSi0DzahwKqdCbXgII4gk0hweRKzwITRNUHNAUksMzAohGh+yyIn0TVBTXywFU1PUypxQQ1GsiDItMyvL+v1kn7ht9jlnrX3OPZwLffBjn3vPWt9a/7XX8H3rNG/WxK15E+9/s2oKaM1gXANXwy/wUy0GpxIB19PBR2E43AM3pzp8lr/3wXpYDYcbQ1AeAbfTkRdhBFzVoFPf8vlH+AMU1zl5G4Uie/kwFz6sppAYAe1o+BUYl3Tczq6DNfAR/JzqmFPJNzMsEatw7ROYDAqq2EIFdKOltdAbzsPb8FJGp0t16CG+fA36wm/wFHxQqYIQAffTiHPYafExPAHf5WzYt/I8OJW0eTA/p6/L1coJ6EqZnXADvAuT4GIlDSZ1R/JcCm3gaViU12cpAW1xuh36wFswJW8jReoN4v8b4G94GDbn8V9KwHs4dMFuhMHwZ54GytRxUN6AU3AbXIhto5gAF+uX4IHUHX6IdRxR3nPCAZoN7nJRVkyAi9YDag68HOUxvvAdVPkczoG7ndtzsGUJ6Ejtb5JR78Lz12Bv+Qsup+oYmAavx7jJEuD+7I7jGhgf46yCsm7VW+BTuC/GT5YAT9chYJzj/KyFXZG88Wt5doD0qV60D1kCvqf0daCz6F2hArWFxezb2BrqJy2gPRXPwDFwQdXSXqWx6fAkLA1tOC3ARWvnd8G9oU6qVM4db0EiwpgpyNICelDrCEQvpqDWSheaydcL4dnkGeQyLeBGarmFHgCjxlqaQZ2B3kR4J7ThtIArqejp+xe4iI1TamUraOhxcAc0RgqyrF3oM2r2B0/I/UFeqlPoEG56ghHw8VCXWQJMF59LXqeLqhZmPn0y4daYBrME3I0Dd6HdYEpYC3PhGsiZ6ZluBluWAP/3VfIqjdnNdxvTvIo5CsZgDp5TONiKRaMGVgZYJt4D4FKwx/iCL1DF1HIVmKlFWTEBxiZ7oB88A29GeQ0vbN5hytoS3Laj745KZWQDcbgJLPMIVHsqGbTZeUMWcw5P4mgrl9RPwKOHikmG+/OO6BayK3jD4X2Sg2QY/SB49kRbOQE6NMFwGlXrLqcXvrxjMlU9Dd6pDgWvbKItRIBO3ea8yHJtrASP/ODDJumVHZ0Ks8BT3n3/luQ7sz5v8KJFhAqwHUdpCTh3fwcztvfhizLD1onvH4MZcBM4VZbBaFBUwRRhG667YIsRoFPvRx1Bp1SrpJWveW4DdxCnhBdfJkSG5nfBneCb07zYtf5BMHEx5vEcKFj0m4gVUGjIm+exMArKRa1eQzrnF0N6E6hYRF4BDQbt8gnqeeHFlHO7BXhFcgIMyw3SSllFIqohoEz/gr7OLaJeBKgyl4h6EpBLRL0JiBZRjwKiRNSrgGAR9SxAEQZ5Hn4NT2yDvwcKe1u9C0i/Ca/h/bHw3yv4piCgIMILBn+b/s/vB01FQNHT8H8BQYFCIxb6B7quzDGJddU4AAAAAElFTkSuQmCC'
        }}
      />
    </Pressable>
  )
}
