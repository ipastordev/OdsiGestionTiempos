import React, { Component } from 'react';
import { View, Button , Text, StyleSheet,TextInput,TouchableHighlight} from 'react-native';
//import  TitledInput  from '../component/TitledInput';

import { Toolbar } from 'react-native-material-ui';
import firebase from 'react-native-firebase';
import Container from './Container';


//const { user } = this.props.navigation.state.params
class prueba extends Component {
   
    render() {
        const { navigation } = this.props;
        const user = navigation.getParam('user', 'NO-ID');
        return (
            <Container>
                 <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.goBack()}
                    centerElement="Prueba"
                />
                <TextInput
                    placeholderTextColor="grey"
                    placeholder="sdfsdfsdf"
                    style={styles.inputText}
                    autoCapitalize='none'
                />
                <TextInput
                    placeholderTextColor="grey"
                    placeholder="Password"
                    style={styles.inputText}
                    password={true}
                    secureTextEntry={true}

                />
                <TouchableHighlight
                    style={[styles.loginButton, styles.button]}
                >
                    <Text 
                        style={styles.textButton}
                    >Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.singupButton, styles.button]}
                >
                    <Text style={styles.textButton}
                    >Registro</Text>
                </TouchableHighlight>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:30,
        marginHorizontal:10 
    },
    inputText:{
        height:50,
        borderWidth:1,
        borderColor:'#ccc',
        paddingHorizontal:20,
        paddingVertical:10,
        color:'black',
    },
    button:{
        backgroundColor:'#fff',
        paddingVertical:20,
        borderRadius:5,
        marginBottom:10,
        borderWidth:1,
        borderColor:'#ccc'
    },
    textButton:{
        textAlign:'center'
    }
})
export default prueba;
