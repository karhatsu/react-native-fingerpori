import React, { useEffect, useState } from "react"
import Comics from "./Comics"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const HsScraper = ({ index }) => {
  const [imageUrls, setImageUrls] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const fetchImageUrls = async () => {
      const response = await fetch('https://www.hs.fi/api/laneitems/39221/list/normal/290')
      const json = await response.json()
      setImageUrls(json.map(item => item.picture.url))
    }
    fetchImageUrls().catch(err => setError(err.message))
  }, [])

  const imageUrl = imageUrls && imageUrls[index]
  if (imageUrl) return <Comics imageUrl={imageUrl} />

  const content = () => {
    if (error) return <Text style={s.error}>{error}</Text>
    if (!imageUrls) return <ActivityIndicator size="large" color="#a10e1f"/>
    return <Text style={s.notFound}>Sarjakuvaa ei löydy</Text>
  }

  return <View style={s.content}>{content()}</View>
}

const s = StyleSheet.create({
  content: {
    padding: 8,
  },
  error: {
    color: 'red',
  },
  notFound: {
    color: 'black',
  },
})

export default HsScraper
