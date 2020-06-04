import React from 'react'
import {
  Text, View, Image, StyleSheet, Dimensions
} from 'react-native'

const { width } = Dimensions.get('window')

export default function PostComponent({ name, location, image }) {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{location}</Text>
      <Image
        style={styles.image}
        source={{ uri: image }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: width - 30,
    height: width - 30
  }
})