/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {WebView} from 'react-native-webview';

const Loading = () => (
  <ActivityIndicator
    style={[styles.container, styles.loading]}
    color="blue"
    size="large"
  />
);

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate('Web')}
        title="Go to Infinite"></Button>
    </View>
  );
};

const WebViewScreen = ({navigation}) => {
  const webviewref = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://infinite.red');

  const backAction = () => {
    if (canGoBack) {
      webviewref.current.goBack();
    } else {
      navigation.goBack();
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [canGoBack]);

  return (
    <WebView
      ref={webviewref}
      source={{uri: currentUrl}}
      startInLoadingState
      renderLoading={Loading}
      onNavigationStateChange={navState => {
        setCanGoBack(navState.canGoBack);
        setCanGoForward(navState.canGoForward);
        setCurrentUrl(navState.url);
      }}
    />
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Web" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default App;
