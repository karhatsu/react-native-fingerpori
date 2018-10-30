import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ImageTitle from './ImageTitle'
import NavigationButton from './NavigationButton'
import ImageScraper from './ImageScraper'

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      index: 0
    }
  }

  render() {
    const ilImageUrlRegex = /<img alt="Fingerpori [0-9.]{10}" src="https:(\/\/assets.ilcdn.fi\/[a-f0-9]+\.gif)"/
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <NavigationButton title="Edellinen" left={true} onPress={this.showPrevious}/>
          <NavigationButton title="Seuraava" left={false} onPress={this.showNext} disabled={this.isToday()}/>
        </View>
        <ScrollView>
          <ImageTitle title="Iltalehti"/>
          <ImageScraper
            domain="https://www.iltalehti.fi"
            index={-this.state.index}
            imageUrlRegex={ilImageUrlRegex}
            initialUrl="https://www.iltalehti.fi/fingerpori"
            previousPagePathRegex={/<a href="(\/fingerpori\/[0-9.]{10})" class="prev">&lt;<\/a>/}
          />
          <ImageTitle title="Helsingin Sanomat"/>
          <ImageScraper
            domain="https://www.hs.fi"
            index={-this.state.index}
            imageUrlRegex={/(\/\/hs.mediadelivery.fi\/img\/1920\/[a-f0-9]+.(png|jpg))/}
            initialUrl="http://www.hs.fi/fingerpori"
            initialPagePathRegex={/href="(\/fingerpori\/car-[0-9]+\.html)"/}
            previousPagePathRegex={/<a class="article-navlink prev " href="(\/fingerpori\/car-[0-9]+.html)">/}
          />
        </ScrollView>
      </View>
    );
  }

  isToday() {
    return this.state.index === 0;
  }

  showPrevious = () => {
    this.setState({ index: this.state.index - 1 });
  };

  showNext = () => {
    this.setState({ index: this.state.index + 1 });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
