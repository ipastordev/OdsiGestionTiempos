import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, StatusBar, Modal, TextInput} from 'react-native';
import { COLOR, ThemeProvider, Toolbar, Subheader, Card, ListItem, 
          ActionButton, Dialog, DialogDefaultActions } from 'react-native-material-ui';

const uiTheme = {
    palette: {
        primaryColor: COLOR.teal300,
        accentColor: COLOR.red500,
    },
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
    },
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
});

export default class Asignaturas extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, showNewDialog: false}
  }

  componentDidMount(){
    return fetch('https://us-central1-odsi-gestiontiempos.cloudfunctions.net/usuariosAsignaturas/usuario-asignatura?idUsuario=us6',
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
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  saveNew() {
    
    jsonArray = this.state.dataSource
    jsonArray.push(
      {
        Nombre_asignatura: this.state.abreviatura,
        Descripcion: this.state.nombre
      })
    console.log(jsonArray)
    this.setState({ showNewDialog: false})

    return fetch('https://us-central1-odsi-gestiontiempos.cloudfunctions.net/asignaturas/addAsignatura', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idAsignatura: this.state.abreviatura,
        idNombre: this.state.abreviatura,
        idDescripcion: this.state.nombre
      }),
    }).then(response => this.setState({ showNewDialog: false, dataSource: jsonArray }), alert('SAVED'))
  }



  render(){

    if(this.state.isLoading){
      return(
        <View>
           <StatusBar
                barStyle = "light-content" 
           />
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1}}>
        <ThemeProvider uiTheme={uiTheme}>
          <View style={{flex: 1}}>
            <View style={styles.container}>
              <Toolbar centerElement="Gestor de Tiempos" />
            </View>
            <View style={{flex: 1}}>
              <FlatList
                data={this.state.dataSource}
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
            <ActionButton onPress={() => this.setState({ showNewDialog: true, abreviatura: null, nombre: null, alumnos: null })}/>
            
          </View>
        </ThemeProvider>
      </View>
    );
  }
}