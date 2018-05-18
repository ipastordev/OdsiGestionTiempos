import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ToastAndroid, StyleSheet,ScrollView,
Platform, Animated,Text, Easing,View,ActivityIndicator } from 'react-native';

import routes from '../routes';
import firebase from 'react-native-firebase'

import Container from '../Container';
// components
import {
    ActionButton,
    Avatar,
    ListItem,
    Toolbar,
    BottomNavigation,
    Icon,
    Button, Subheader,
} from 'react-native-material-ui';

const UP = 1;
const DOWN = -1;

const styles = StyleSheet.create({
    rowContainer: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        marginHorizontal: 8,
    },
});

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

class Home extends Component {
   
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'asignaturas' : 'loginForm')
        })
      }
    render() {
        return (
            <Container>
                {/**this.renderToolbar()*/}

                <View style={styles.rowContainer}>
                    <Text>Loading</Text>
                    <ActivityIndicator size="large" />
                </View>


            </Container>
        );
    }
}

Home.propTypes = propTypes;

export default Home;
