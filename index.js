import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image, } from 'react-native'; 
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Dolar en Argentina</Text>
        <Image
          style={styles.tinyLogo}
          source={require('../dolarARG/assets/dolar.png')

          }></Image>
        <View style={styles.items}>
          <Button
            title="Dolar en Argentina"
            onPress={() =>  window.location.href=("../")}
          />
        </View>
        <View style={styles.items2}>
          <Button
            title="Dolar en los bancos"
            onPress={() => this.props.navigation.navigate('DolarEnArgentina')}
          />
        </View>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  items: {
    height: 50,
    backgroundColor: '#65e78e',
    fontSize: 16,
     
    borderRadius: 20,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    marginTop: 100,
  },
  items2: {
    height: 50,
    backgroundColor: '#65e78e',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 20,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  }

});
