import React, { Component } from 'react';
import { View, Button , Text, StyleSheet,TextInput,TouchableHighlight} from 'react-native';
//import  TitledInput  from '../component/TitledInput';

import { COLOR, ThemeProvider,Toolbar } from 'react-native-material-ui';
import firebase from 'react-native-firebase';
import Container from '../Container';

class LoginForm extends Component {
    state = { email: '', password: '' };

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            response:'',
            isAuthenticated:false,
            user:null,
            msjError:''
        }
    }

    onLogin = () => {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser) => {
                console.log(`Login with user : ${JSON.stringify(loggedInUser)}`);
                
                    this.props.navigation.navigate('asignaturas',{user:loggedInUser})
                
            }).catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });
    }

    onRegister=()=>{

    {/*    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email,this.state.password)
        .then((loggedInUser) => {
                this.setState({ user: loggedInUser });
                console.log(`Register with user : ${JSON.stringify(loggedInUser)}`);
                    this.props.navigation.navigate('asignaturas',{user:loggedInUser})
            }).catch((error) => {
                console.log(`Register fail with error: ${error}`);
                this.setState({msj:error});
            });

        */}
        this.props.navigation.navigate('register',{});
    }

    render() {
        return (
            <Container>
                <Toolbar
                   
                    centerElement="Inicio de Sesión"
                />
                <TextInput
                    placeholderTextColor="grey"
                    placeholder="Email"
                    style={styles.inputText}
                    autoCapitalize='none'
                    onChangeText={(email) => {this.setState({email})}}
                />
                <TextInput
                    placeholderTextColor="grey"
                    placeholder="Password"
                    style={styles.inputText}
                    password={true}
                    secureTextEntry={true}
                    onChangeText={(password) => {this.setState({password})}}

                />
                <TouchableHighlight
                    style={[styles.loginButton, styles.button]}
                    onPress={this.onLogin}
                >
                    <Text 
                        style={styles.textButton}
                    >Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.singupButton, styles.button]}
                    onPress={this.onRegister}
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
export default LoginForm;
