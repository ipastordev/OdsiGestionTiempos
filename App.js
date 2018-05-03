import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, StatusBar } from 'react-native';
import { COLOR, ThemeProvider, Toolbar, Subheader, Card, ListItem } from 'react-native-material-ui';

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
        accentColor: COLOR.pink500,
    },
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    textContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});

export default class Asignaturas extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
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
              <Toolbar centerElement="Asignaturas" />
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
                keyExtractor={(item, index) => 'index'}
              />
            </View>
          </View>
        </ThemeProvider>
      </View>
    );
  }
}