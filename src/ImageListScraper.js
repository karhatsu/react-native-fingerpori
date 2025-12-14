import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text } from "react-native"
import Comics from "./Comics"

const ImageListScraper = ({ pageUrl, imageUrlRegex, index }) => {
  const [imageUrls, setImageUrls] = useState([])

  useEffect(() => {
    fetch(pageUrl).then(response => {
      response.text().then(text => {
        const urls = []
        let match
        do {
          match = imageUrlRegex.exec(text)
          if (match) {
            urls.push(match[1])
          }
        } while (match)
        setImageUrls(urls)
      })
    }).catch(console.error)
  }, [pageUrl])

  if (imageUrls[index]) {
    return <Comics imageUrl={imageUrls[index]} />
  } else if (index !== 0) {
    return <Text style={s.notFound}>Sarjakuvaa ei löydy</Text>
  } else {
    return <ActivityIndicator size="large" color="#a10e1f"/>
  }
}

const s = StyleSheet.create({
  notFound: {
    marginVertical: 8,
  },
})

export default ImageListScraper
