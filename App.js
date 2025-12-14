import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageTitle from './src/ImageTitle'
import NavigationButton from './src/NavigationButton'
import ImageListScraper from "./src/ImageListScraper"
import HsScraper from "./src/HsScraper"

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
        <NavigationButton title="Edellinen" onPress={showPrevious} />
        <NavigationButton title="Seuraava" onPress={showNext} disabled={index === 0} />
      </View>
      <ScrollView>
        <ImageTitle title="Iltalehti"/>
        <ImageListScraper
          pageUrl="https://www.iltalehti.fi/fingerpori"
          imageUrlRegex={/img alt="Fingerpori [0-9.]{10}" src="(.*?)" class="list-image"/g}
          index={-index}
        />
        <ImageTitle title="Helsingin Sanomat"/>
        <HsScraper index={-index} />
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
