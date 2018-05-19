/**
 * Registra un usuario en la Realtime DB y lo crea con Firebase Authenticate
 *
 *
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Modal,
  ActivityIndicator,
  Keyboard
} from 'react-native';

import {
    COLOR,
    ThemeProvider,
    Dialog, 
    DialogDefaultActions,
    Toolbar
  } from 'react-native-material-ui';

import * as firebase from 'firebase';
import routes from '../routes';


const uiTheme = {
  palette: {
      primaryColor: COLOR.teal300,
      accentColor: COLOR.red500,
  },
};

const config = {
  apiKey: 'AIzaSyDoWGVZpr_u5SKVQk3zNaQ-t98i0JWdzvw',
  authDomain: 'odsi-gestiontiempos.firebaseapp.com',
  databaseURL: 'https://odsi-gestiontiempos.firebaseio.com',
  projectId: 'odsi-gestiontiempos',
  storageBucket: 'odsi-gestiontiempos.appspot.com',
  messagingSenderId: '921623046756'
  };

type Props = {};
export default class App extends Component<Props> {


  constructor(props){
    super(props)

    this.state = {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      msg_success:'',
      msg_name:'',
      msg_surname:'',
      msg_email:'',
      msg_password:'',
      msg_emailUsed:'',
      showNewDialog: false,
      isLoading: false,
      registerHeader: true,
    };

  }

 
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }
  
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  //Cuando aparece el teclado se esconde el Text de Registro y cuando desaparece el teclado vuelve a mostrarse
  _keyboardDidShow () {
    this.setState({ 
     registerHeader:false
    });
  }

  _keyboardDidHide () {
    this.setState({ 
      registerHeader:true
     });
  }

  _handlePress() {

    this.setState({ 
      isLoading: true
    });

    var urlRegisterUser = 'https://us-central1-odsi-gestiontiempos.cloudfunctions.net/usuarios/registrarUsuario';

    fetch(urlRegisterUser, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ODSI18',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uNombre: this.state.nombre,
      uApellido: this.state.apellidos,
      uEmail: this.state.email,
      uPassword: this.state.password,
      uProfesor: false,
    }),
  }).then((response) => response.json())
  .then((responseJson) => {

    this.setState({ 
      msg_success: responseJson.msg_success, 
      msg_name: responseJson.msg_name,
      msg_surname:responseJson.msg_surname,
      msg_email:responseJson.msg_email,
      msg_password:responseJson.msg_password,
      msg_emailUsed:responseJson.msg_emailUsed
    });

  //Si el ususario no se guardo en la DB, mostrar dialog con mensajes de error
  //si no recibo en la respuesta json la key msg_success, el state de msg_success sera undefined
  if(this.state.msg_success === undefined){
    this.setState({ 
      isLoading: false,
      showNewDialog: true
    });
  }else{
     //Si el ususario se guardo en la DB, crearlo con firebase authenticate y despues mostrar
     //mensaje con el dialog de que se creo correctamente 
      var email = this.state.email;
      var password = this.state.password;
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { 
        this.setState({ 
          isLoading: false,
          showNewDialog: true
        });
      })
      .catch(() => {
          this.setState({
            msg_success: 'Error al crear el usuario',
            showNewDialog: true
            });
      });
    }
  })
.catch((error) => {
    this.setState({
      isLoading: false, 
      msg_success: 'Error al crear el usuario'
      });
  });

 }

  render() {

    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicator}>
          <ActivityIndicator size={200} color={COLOR.teal300}/>
        </View>
      )
    }

    return (
      <View style={{flex:1}}>
        <ThemeProvider uiTheme={uiTheme}>
          <View style={{flex: 1}}>

            <View style={styles.container}>
                <Toolbar centerElement="Gestor de Tiempos" />
            </View>

            {this.state.registerHeader &&               
                  <View style={{flex: 1, marginTop: 0}} >
                    <Text style={styles.header}>
                      Registro
                    </Text>
                  </View>
                  
            }
            
            <TextInput style={styles.textinput}
              placeholder='Nombre' 
              keyboardType='default'
              onChangeText={(text) => this.setState({nombre:text})}/>
 
            <TextInput style={styles.textinput}
              placeholder='Apellidos' 
              keyboardType='default'
              onChangeText={(text) => this.setState({apellidos:text})}/>

            <TextInput style={styles.textinput}
              placeholder='Correo electronico' 
              keyboardType='email-address'
              onChangeText={(text) => this.setState({email:text})}/>

            <TextInput style={styles.textinput}
              placeholder='Contraseña' 
              onChangeText={(text) => this.setState({password:text})}
              autoCorrect={false}
              secureTextEntry={true}/>   
          
          
            {/* Pongo el Button dentro del View porque si no el margin y padding no funcionan
              Aplico los styles del Button al View */}
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button 
                  style={{width:300}}
                  onPress={() => this._handlePress()}
                  title="ENVIAR"
                  color="#d1d1d1"/>
                </View>
            </View>
            


            <Modal
            transparent={true}
            visible={this.state.showNewDialog}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
                <View style={styles.dialogContainer}>
                  <Dialog>
                  <Dialog.Title><Text>Mensaje</Text></Dialog.Title>
                  <Dialog.Content>
                    
                  {this.state.msg_success && <Text style={styles.textDialog}>{this.state.msg_success}</Text>}
                  {this.state.msg_emailUsed && <Text style={styles.textDialog}>{this.state.msg_emailUsed}</Text>}
                  {this.state.msg_name && <Text style={styles.textDialog}>{this.state.msg_name}</Text>}
                  {this.state.msg_surname && <Text style={styles.textDialog}>{this.state.msg_surname}</Text>}
                  {this.state.msg_email && <Text style={styles.textDialog}>{this.state.msg_email}</Text>}
                  {this.state.msg_password && <Text style={styles.textDialog}>{this.state.msg_password}</Text>}

                  </Dialog.Content>
                  <Dialog.Actions> 
                    <DialogDefaultActions
                      actions={['aceptar']}
                      options={{ ok: { disabled: true } }}
                      onActionPress={(action) => {
                        if(action === 'aceptar'){
                          this.setState({ showNewDialog: false })
                         
                          {/*Redirigir a login solo si el registro fue correcto */}
                          {this.state.msg_success &&  this.props.navigation.navigate('loginForm',{});}
                        }
                      }}
                    />
                  </Dialog.Actions>
                </Dialog>
                </View>
            </Modal>
      
        </View>
      </ThemeProvider>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //paddingTop: 24,
  },
  header: {
    color: 'rgb(204, 204, 0)',
    fontWeight: 'bold',
    fontSize: 20,
   // marginLeft: 20,
  },
  textinput: {
    flex: 8,
    marginBottom: 2,
    marginLeft:30,
    marginRight:30,
    height: 20,
  },
  buttonContainer: {
    flex:1,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    width: 100
  },
  dialogContainer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDialog: {
    padding: 5,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center'
  },
});