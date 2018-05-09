/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import {NativeModules, StatusBar,
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid, ScrollView, Animated, Easing
} from 'react-native';
import Drawer from './src/Drawer';
import Container from './src/Container';
import MainTabNavigator from './src/routes';

// components
import {
    Avatar,
    Toolbar,
    Icon,
    COLOR, ThemeProvider,ActionButton,
    ListItem,
} from 'react-native-material-ui';

import Config from 'react-native-config';
import firebase from 'firebase';

const UIManager = NativeModules.UIManager;

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
        accentColor: COLOR.pink500,
    },
};
//import LoginForm from './src/login/LoginForm';


const UP = 1;
const DOWN = -1;

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};
type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
      super(props);

      this.offset = 0;
      this.scrollDirection = 0;

      this.state = {
          selected: [],
          searchText: '',
          active: 'people',
          moveAnimated: new Animated.Value(0),
          initialView:null,
          userLoaded:false
      };
  }

  static renderScene(route, navigator) {
      return (
          <Container>
              <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
              <View style={{ backgroundColor: COLOR.green500, height: 24 }} />
              <route.Page
                  route={route}
                  navigator={navigator}
              />
          </Container>
      );
  }

  static configureScene(route) {
      return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  onAvatarPressed = (value) => {
      const { selected } = this.state;

      const index = selected.indexOf(value);

      if (index >= 0) {
          // remove item
          selected.splice(index, 1);
      } else {
          // add item
          selected.push(value);
      }

      this.setState({ selected });
  }

  show = () => {
      Animated.timing(this.state.moveAnimated, {
          toValue: 0,
          duration: 225,
          easing: Easing.bezier(0.0, 0.0, 0.2, 1),
          useNativeDriver: Platform.OS === 'android',
      }).start();
  }
  hide = () => {
      Animated.timing(this.state.moveAnimated, {
          toValue: 56, // because the bottom navigation bar has height set to 56
          duration: 195,
          easing: Easing.bezier(0.4, 0.0, 0.6, 1),
          useNativeDriver: Platform.OS === 'android',
      }).start();
  }


  componentWillMount() {

    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    /*    firebase.initializeApp({
            apiKey: 'AIzaSyDoWGVZpr_u5SKVQk3zNaQ-t98i0JWdzvw',
            authDomain: 'odsi-gestiontiempos.firebaseapp.com',
            databaseURL: 'https://odsi-gestiontiempos.firebaseio.com',
            projectId: 'odsi-gestiontiempos',
            storageBucket: 'odsi-gestiontiempos.appspot.com',
            messagingSenderId: '921623046756'
        });
*/

    }
    renderToolbar = () => {
        if (this.state.selected.length > 0) {
            return (
                <Toolbar
                    key="toolbar"
                    leftElement="clear"
                    onLeftElementPress={() => this.setState({ selected: [] })}
                    centerElement={this.state.selected.length.toString()}
                    rightElement={['delete']}
                    style={{
                        container: { backgroundColor: 'white' },
                        titleText: { color: 'rgba(0,0,0,.87)' },
                        leftElement: { color: 'rgba(0,0,0,.54)' },
                        rightElement: { color: 'rgba(0,0,0,.54)' },
                    }}
                />
            );
        }
        return (
            <Toolbar
                key="toolbar"
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.goBack()}
                centerElement="Home"
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                    onChangeText: value => this.setState({ searchText: value }),
                    onSearchClosed: () => this.setState({ searchText: '' }),
                }}
            />
        );
    }
    renderItem = (title, route) => {
        const searchText = this.state.searchText.toLowerCase();

        if (searchText.length > 0 && title.toLowerCase().indexOf(searchText) < 0) {
            return null;
        }

        return (
            <ListItem
                divider
                leftElement={<Avatar text={title[0]} />}
                onLeftElementPress={() => this.onAvatarPressed(title)}
                centerElement={title}
                onPress={() => this.props.navigation.navigate(route)}
            />
        );
    }
  render() {
    return (

      <ThemeProvider uiTheme={uiTheme}>
      <MainTabNavigator ref={(nav) => { this.navigator = nav; }} />
      { /*<Navigator
          configureScene={App.configureScene}
          initialRoute={routes.home}
          ref={this.onNavigatorRef}
          renderScene={App.renderScene}
      /> */}


        {/*<Container>
          {this.renderToolbar()}
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to React Proyecto ODSI!
            </Text>
            <Text style={styles.instructions}>
              To get started, edit App.js
            </Text>
            <Text style={styles.instructions}>
              {instructions}
            </Text>
          </View>

        </Container>
      */}
      </ThemeProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
App.propTypes = propTypes;
