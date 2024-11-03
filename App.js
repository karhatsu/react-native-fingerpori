import React, { useCallback, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import ImageTitle from './ImageTitle'
import NavigationButton from './NavigationButton'
import ImageScraper from './ImageScraper'
import ImageListScraper from "./ImageListScraper"

const App = () => {
  const [index, setIndex] = useState(0)

  const showPrevious = useCallback(() => {
    setIndex(i => i - 1)
  }, [])

  const showNext = useCallback(() => {
    setIndex(i => i + 1)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        <NavigationButton title="Edellinen" left={true} onPress={showPrevious} />
        <NavigationButton title="Seuraava" left={false} onPress={showNext} disabled={index === 0} />
      </View>
      <ScrollView>
        <ImageTitle title="Iltalehti"/>
        <ImageListScraper
          pageUrl="https://www.iltalehti.fi/fingerpori"
          imageUrlRegex={/img alt="Fingerpori [0-9.]{10}" src="(.*?)" class="list-image"/g}
          index={-index}
        />
        <ImageTitle title="Helsingin Sanomat"/>
        <ImageScraper
          domain="https://www.hs.fi"
          index={-index}
          imageUrlRegex={/(\/\/images\.sanoma-sndp\.fi\/[a-f0-9]+\/normal\/1920\.jpg)/}
          initialUrl="https://www.hs.fi/fingerpori"
          initialPagePathRegex={/href="(\/fingerpori\/car-[0-9]+\.html)"/}
          previousPagePathRegex={/<a class="article-navlink prev " href="(\/fingerpori\/car-[0-9]+.html)">/}
        />
      </ScrollView>
    </SafeAreaView>
  )
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
})

export default App
