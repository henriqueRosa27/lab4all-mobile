import React, { FC } from "react"
import { SafeAreaView, StyleSheet, Text, StatusBar } from "react-native"

const App: FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={styles.sectionTitle}>Step One</Text>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000"
  }
})

export default App
