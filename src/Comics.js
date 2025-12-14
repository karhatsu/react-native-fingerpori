import React from 'react'
import PropTypes from 'prop-types'
import { Image, ScrollView, View } from 'react-native'

const width = 800
const height = 248

const Comics = ({ imageUrl }) => (
  <View style={{height}}>
    <ScrollView horizontal={true}>
      <Image source={{ uri: imageUrl }} style={{ width, height }} />
    </ScrollView>
  </View>
)

Comics.propTypes = {
  imageUrl: PropTypes.string.isRequired
}

export default Comics
