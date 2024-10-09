import React from 'react'
import PropTypes from 'prop-types'
import { Button, View } from 'react-native'

const NavigationButton = ({ disabled, left, title, onPress }) => {
  const marginRight = left ? 20 : 0
  const marginLeft = left ? 0 : 20
  return (
    <View style={{ flex: 1, marginRight, marginLeft }}>
      <Button title={title} onPress={onPress} color="#a10e1f" disabled={disabled} />
    </View>
  )
}

NavigationButton.propTypes = {
  disabled: PropTypes.bool,
  left: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default NavigationButton
