import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

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
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.IdAsignatura}</Text>}
          keyExtractor={(item, index) => 'index'}
        />
      </View>
    );
  }
}