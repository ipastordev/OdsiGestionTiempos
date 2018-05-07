import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, StatusBar, Modal } from 'react-native';
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
        paddingTop: 20,
    },
    textContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16
    }
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
                  <Card style={{ titleText: { color: 'rgba(200,0,0,.87)' },}}>
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
              <View style={{marginTop: 22}}>
                <Dialog>
                <Dialog.Title><Text>Nueva asignatura</Text></Dialog.Title>
                <Dialog.Content>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <DialogDefaultActions
                     actions={['cancelar', 'guardar']}
                     options={{ ok: { disabled: true } }}
                     onActionPress={(action) => {
                        if(action === 'cancelar'){
                          this.setState({ showNewDialog: false })
                        }else if(action === 'guardar'){
                          this.setState({ showNewDialog: false })
                        }
                     }}
                  />
                </Dialog.Actions>
              </Dialog>
              </View>
            </Modal>
            <ActionButton onPress={() => this.setState({ showNewDialog: true })}/>
            
            
          </View>
        </ThemeProvider>
      </View>
    );
  }
}