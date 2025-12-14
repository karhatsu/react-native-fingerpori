import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const NavigationButton = ({ disabled, title, onPress }) => (
  <TouchableOpacity
    onPress={!disabled ? onPress : null}
    activeOpacity={disabled ? 1 : 0.7}
    style={[
      s.button,
      disabled ? s.buttonDisabled : s.buttonEnabled,
    ]}
    disabled={disabled}
  >
    <Text
      style={[
        s.buttonText,
        disabled ? s.textDisabled : s.textEnabled,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
)

NavigationButton.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

const s = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  buttonEnabled: {
    backgroundColor: '#a10e1f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textEnabled: {
    color: '#FFFFFF',
  },
  buttonDisabled: {
    backgroundColor: '#AAAAAA',
  },
  textDisabled: {
    color: '#F0F0F0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
})

export default NavigationButton
