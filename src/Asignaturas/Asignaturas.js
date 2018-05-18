import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ToastAndroid,FlatList, ActivityIndicator, Text, StyleSheet, StatusBar, Modal, TextInput,Platform,Animated, Easing,View} from 'react-native';
import { COLOR, Toolbar, Subheader, Card, ListItem, 
          ActionButton, Dialog, DialogDefaultActions } from 'react-native-material-ui';
import Container from '../Container';
import firebase from 'react-native-firebase';


const uiTheme = {
    palette: {
        primaryColor: COLOR.teal300,
        accentColor: COLOR.red500,
    },
};

const styles = StyleSheet.create({
    textContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    dialogContainer: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    },
});

const UP = 1;
const DOWN = -1;


const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default class Asignaturas extends Component {
  state = { currentUser: null }
  constructor(props){
   
    super(props);
    this.state ={ 
      isLoading: true, 
      showNewDialog: false,
      selected: [],  
      searchText: '',
      active: 'people',
      moveAnimated: new Animated.Value(0),
      userData:[],
    }
  }

  componentWillMount(){
    const { currentUser } = firebase.auth()

    this.setState({ currentUser })
  }

  componentDidMount(){
    /*const { userData } = this.state;
    const { navigation } = this.props;
    const userObj = navigation.getParam('user', 'NO-ID');
    const user = userObj.user._auth._user.providerData[0].uid;
    */
   
    /*userData.push(user); 
    this.setState({ userData });*/

    return fetch('https://us-central1-odsi-gestiontiempos.cloudfunctions.net/usuariosAsignaturas/usuario-asignatura?idUsuario='+this.state.currentUser,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ODSI18',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          isProfesor: true,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  
  saveNew() {
    
    var asignaturas = this.state.dataSource;
    asignaturas.push(
      {
        Nombre_asignatura: this.state.abreviatura,
        Descripcion: this.state.nombre
      })
    this.setState({ showNewDialog: false, dataSource: asignaturas});
    return fetch('https://us-central1-odsi-gestiontiempos.cloudfunctions.net/asignaturas/addAsignatura', {
      method: 'POST',
      headers: {
                'Authorization': 'Bearer ODSI18',
                'Content-Type': 'application/json',
              },
      body: JSON.stringify({
        idAsignatura: this.state.abreviatura,
        idNombre: this.state.abreviatura,
        idDescripcion: this.state.nombre
      }),
    }).then(response => {
        
        var usuarioAsignaturas = [];
        var abreviatura = this.state.abreviatura;
        usuarioAsignaturas.push({"idUsuario": user, "idAsignatura": abreviatura});
        var alumnos = this.state.alumnos.split(',');
        alumnos.forEach(function(alumno) {
          usuarioAsignaturas.push({"idUsuario": alumno, "idAsignatura": abreviatura});
        });


        return fetch('https://us-central1-odsi-gestiontiempos.cloudfunctions.net/usuariosAsignaturas/usuario-asignatura-multiple', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ODSI18',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(usuarioAsignaturas),
            })
        }
      )

  
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
onScroll = (ev) => {
    const currentOffset = ev.nativeEvent.contentOffset.y;

    const sub = this.offset - currentOffset;

    // don't care about very small moves
    if (sub > -2 && sub < 2) {
        return;
    }

    this.offset = ev.nativeEvent.contentOffset.y;

    const currentDirection = sub > 0 ? UP : DOWN;

    if (this.scrollDirection !== currentDirection) {
        this.scrollDirection = currentDirection;

        this.setState({
            bottomHidden: currentDirection === DOWN,
        });
    }
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
  renderToolbar = () => {
    const { currentUser } = this.state
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
            onLeftElementPress={() => this.props.navigation.navigate('drawer')}
            centerElement="Gestor de Tiempos"
            searchable={{
                autoFocus: true,
                placeholder: 'Search',
                onChangeText: value => this.setState({ searchText: value }),
                onSearchClosed: () => this.setState({ searchText: '' }),
            }}
        />
    );
}

  render(){
    /*const { currentUser } = this.state
    alert(JSON.stringify(currentUser))*/
    if(this.state.isLoading){
      return(
        <View style={{flex: 1}}>
          <Container>
            <View style={{flex: 1}}>
              <View style={styles.container}>
                <Toolbar centerElement="Gestor de Tiempos" />
              </View>
              <View style={styles.activityIndicator}>
                <ActivityIndicator size={100} color={COLOR.teal300}/>
              </View>
            </View>
          </Container>
        </View>
      )
    }

    return(
      <View style={{flex: 1}}>
        <Container>
           {this.renderToolbar()}
          <View style={{flex: 1}}>
            
            <View style={{flex: 1}}>
              <FlatList
                data={this.state.dataSource}
                extraData={this.state}
                renderItem={({item}) => 
                  <Card>
                      <ListItem
                          centerElement={{
                              primaryText: item.Nombre_asignatura,
                              secondaryText: item.Descripcion,
                          }}
                      />
                  </Card>
                }
                keyExtractor={(item, index) => 'item'+index}
              />
            </View>
            <Modal
              transparent={true}
              visible={this.state.showNewDialog}
              onRequestClose={() => {
                alert('Modal has been closed.');
              }}>
              <View style={styles.dialogContainer}>
                <Dialog>
                <Dialog.Title><Text>Nueva asignatura</Text></Dialog.Title>
                <Dialog.Content>
                  <Text>Abreviatura</Text>
                  <TextInput value={this.state.abreviatura} onChangeText={(text) => this.setState({abreviatura: text})} maxLength={5}/>
                  <Text>Nombre</Text>
                  <TextInput value={this.state.nombre} onChangeText={(text) => this.setState({nombre: text})}/>
                  <Text>Alumnos</Text>
                  <TextInput value={this.state.alumnos} onChangeText={(text) => this.setState({alumnos: text})}/>
                </Dialog.Content>
                <Dialog.Actions>
                  <DialogDefaultActions
                     actions={['cancelar', 'guardar']}
                     options={{ ok: { disabled: true } }}
                     onActionPress={(action) => {
                        if(action === 'cancelar'){
                          this.setState({ showNewDialog: false })
                        }else if(action === 'guardar'){
                          this.saveNew()
                        }
                     }}
                  />
                </Dialog.Actions>
              </Dialog>
              </View>
            </Modal>
            {
                this.state.isProfesor ?

                <ActionButton onPress={() => this.setState({ showNewDialog: true, abreviatura: null, nombre: null, alumnos: null })}/>
                : null

            }
            
            
          </View>
        </Container>
      </View>
    );
  }
}