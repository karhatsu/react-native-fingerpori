import React from 'react'
import PropTypes from 'prop-types'
import {ActivityIndicator} from "react-native"
import Comics from "./Comics"

export default class ImageScraper extends React.PureComponent {
  static propTypes = {
    domain: PropTypes.string.isRequired,
    imageUrlRegex: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    initialPagePathRegex: PropTypes.object.isRequired,
    initialUrl: PropTypes.string.isRequired,
    previousPagePathRegex: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      pageUrls: [],
      imageUrls: []
    }
  }

  render() {
    const { index } = this.props
    const { imageUrls } = this.state
    if (imageUrls[index]) {
      return <Comics imageUrl={imageUrls[index]}/>
    } else {
      return <ActivityIndicator size="large" color="#a10e1f"/>
    }
  }

  componentDidMount () {
    const { domain, initialUrl, initialPagePathRegex } = this.props
    fetch(initialUrl).then((response) => {
      response.text().then(text => {
        const match = initialPagePathRegex.exec(text);
        this.setState({ pageUrls: [`${domain}${match[1]}`] });
      });
    });
  }

  componentDidUpdate() {
    const { domain, index, imageUrlRegex, previousPagePathRegex } = this.props
    const { imageUrls, pageUrls } = this.state
    if (!imageUrls[index] && pageUrls[index]) {
      fetch(pageUrls[index]).then((response) => {
        response.text().then((text) => {
          const imageMatch = imageUrlRegex.exec(text);
          const prevMatch = previousPagePathRegex.exec(text);
          const imageUrl = `https:${imageMatch[1]}`
          const previousPageUrl = `${domain}${prevMatch[1]}`
          this.setState({
            imageUrls: [...imageUrls, imageUrl],
            pageUrls: [...pageUrls, previousPageUrl]
          });
        });
      });
    }
  }
}
