import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

const ImageTitle = ({ title }) => <Text style={styles.title}>{title}</Text>

const styles = StyleSheet.create({
  title: {
    color: '#a10e1f',
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 5,
    fontSize: 30
  }
})

ImageTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default ImageTitle
