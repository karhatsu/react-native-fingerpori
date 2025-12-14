import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {ActivityIndicator} from "react-native"
import Comics from './Comics'

const ImageScraper = ({ domain, index, imageUrlRegex, initialUrl, initialPagePathRegex, previousPagePathRegex }) => {
  const [pageUrls, setPageUrls] = useState(initialPagePathRegex ? [] : [initialUrl])
  const [imageUrls, setImageUrls] = useState([])
  const initialFetch = useRef(false)

  useEffect(() => {
    if (initialPagePathRegex && !initialFetch.current) {
      initialFetch.current = true
      fetch(initialUrl).then((response) => {
        response.text().then(text => {
          const match = initialPagePathRegex.exec(text)
          setPageUrls([`${domain}${match[1]}`])
        })
      })
    }
  }, [initialPagePathRegex, initialUrl, domain])

  useEffect(() => {
    if (!imageUrls[index] && pageUrls[index]) {
      fetch(pageUrls[index]).then((response) => {
        response.text().then((text) => {
          const imageMatch = imageUrlRegex.exec(text)
          const prevMatch = previousPagePathRegex.exec(text)
          const imageUrl = `https:${imageMatch[1]}`
          const previousPageUrl = `${domain}${prevMatch[1]}`
          setImageUrls([...imageUrls, imageUrl])
          setPageUrls([...pageUrls, previousPageUrl])
        })
      })
    }
  }, [imageUrls, pageUrls, index])

  if (imageUrls[index]) {
    return <Comics imageUrl={imageUrls[index]} />
  } else {
    return <ActivityIndicator size="large" color="#a10e1f" />
  }
}

ImageScraper.propTypes = {
  domain: PropTypes.string.isRequired,
  imageUrlRegex: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  initialPagePathRegex: PropTypes.object,
  initialUrl: PropTypes.string.isRequired,
  previousPagePathRegex: PropTypes.object.isRequired
}

export default ImageScraper
