import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Avatar, Drawer, Toolbar } from 'react-native-material-ui';
import Container from '../Container';
import firebase from 'react-native-firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 260,
        elevation: 4,
        backgroundColor: 'white',
    },
});

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired,
};

class DrawerSpec extends Component {
    state = { currentUser: null }


    componentWillMount(){
        const { currentUser } = firebase.auth()
    
        this.setState({ currentUser })
      }

logOut(){
    try {
        firebase.auth().signOut()
        this.props.navigation.navigate('loginForm')
    } catch (error) {
    console.log(error)
}

    }
    render() {

        const { currentUser } = this.state
    //alert(JSON.stringify(currentUser))
        return (
            <Container>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.goBack()}
                    centerElement="Menú"
                />
                <View style={styles.container}>
                    <Drawer>
                        <Drawer.Header >
                            <Drawer.Header.Account
                                avatar={<Avatar text="A" />}
                               
                                footer={{
                                    dense: true,
                                    centerElement: {
                                        primaryText: currentUser.displayName != null?currentUser.displayName.toString():'',
                                        secondaryText: currentUser.email.toString(),
                                    },
                                    rightElement: 'arrow-drop-down',
                                }}
                            />
                        </Drawer.Header>
                        <Drawer.Section
                            divider
                            items={[
                                { icon: 'bookmark-border', value: 'Notifications' },
                                { icon: 'today', value: 'Calendar', active: true },
                            ]}
                        />
                        <Drawer.Section
                            title="Personal"
                            items={[
                                { icon: 'settings', value: 'Settings' },
                                { icon: 'info', value: 'Cerrar Sesión',onPress:this.logOut },
                            ]}
                        />
                    </Drawer>
                </View>
            </Container>
        );
    }
}

DrawerSpec.propTypes = propTypes;

export default DrawerSpec;
