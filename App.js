import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import ImageTitle from './ImageTitle'
import NavigationButton from './NavigationButton'
import ImageScraper from './ImageScraper'
import ImageListScraper from "./ImageListScraper";

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      index: 0
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttons}>
          <NavigationButton title="Edellinen" left={true} onPress={this.showPrevious}/>
          <NavigationButton title="Seuraava" left={false} onPress={this.showNext} disabled={this.isToday()}/>
        </View>
        <ScrollView>
          <ImageTitle title="Iltalehti"/>
          <ImageListScraper
            pageUrl="https://www.iltalehti.fi/fingerpori"
            imageUrlRegex={/img alt="Fingerpori [0-9.]{10}" src="(.*?)" class="list-image"/g}
            index={-this.state.index}
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
      </SafeAreaView>
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
