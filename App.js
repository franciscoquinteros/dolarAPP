import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, FlatList, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cotizacion dolar hoy" component={DolarEnArgentina} />
        <Stack.Screen name="Cotizacion dolar por Banco" component={DolarEnLosBancos} />
        <Stack.Screen name="Calculadora de Conversion" component={ButtonCalculadora} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Dolar en Argentina</Text>
        <View style={{ paddingTop: 50 }}>
          <Image
            style={styles.tinyLogo}
            source={require('../dolarARG/assets/dolar.png')

            }></Image>
        </View>
        <View style={styles.items}>
          <Button
            title="Dolar en Argentina"
            onPress={() => navigation.navigate('Cotizacion dolar hoy')}
          />
        </View>
        <View style={styles.items2}>
          <Button
            title="Dolar en los bancos"
            onPress={() => navigation.navigate('Cotizacion dolar por Banco')}
          />
        </View>
      </View>

    </View>
  );
}

function DolarEnLosBancos() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const renderItem = ({ item, index }) => {

    return (
      <View>
        <View style={styles.item} key={index}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>

            {imagesDolarPorBanco.map((img => <Image style={styles.imgItem} source={img} />), index)}

          </View>
          <Text style={styles.itemNombreBank}>{item.casa.nombre}</Text>
          <View style={styles.itemColumn}>
            <Text style={styles.itemVenta}>Venta: {item.casa.venta}</Text>
            <Text style={styles.itemCompra}>Compra: {item.casa.compra}</Text>

            <Text style={styles.itemVariacion}>{JSON.stringify(item.casa.horario)}</Text>

          </View>
        </View>
      </View>
    )
  }

  useEffect(() => {
    fetch('https://www.dolarsi.com/api/api.php?type=capital')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>

      {isLoading ? (<Text>Loading... </Text>) : (
        <View style={styles.itemContainer}>
          <FlatList data={data} renderItem={renderItem} />
        </View>
      )}


    </View>
  );
}

const imagesDolarEnArgentina = [
  require('./assets/dolar.png'),
]

const imagesDolarPorBanco = [
  require('./assets/bank-img.png')
]


const ButtonCalculadora = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [result, setResult] = useState("");


  const catchItem = ({ item, index }) => {

    if (index == 1) {
      const amountBlue = item.casa.venta;
      const amountBlueCompra = item.casa.compra;

      const handleInputA = (e) => {
        console.log(e);
        console.log(amountBlue);
        setCantidad(e);
        calculate();
      }


      const calculate = () => {
        if (cantidad !== "" && amountBlue !== "") {
          const res = parseFloat(cantidad) * parseFloat(amountBlue);
          console.log(res);
          setResult(res.toString());
        } else {
          setResult('');
        }
      }

      return (
        <View style={styles.containerCalculadora}>
          <Text style={styles.TextName} >Dolar Blue </Text>
          <Image
            style={styles.tinyLogoCalculator}
            source={require('../dolarARG/assets/dolar.png')}></Image>
          <Text style={styles.TextName} >Cantidad: </Text>
          <TextInput style={styles.TextInput} name="cantidad" onChangeText={handleInputA} value={cantidad} ></TextInput>
          <View style={styles.containerPrice}>
            <Text style={styles.TextNamePrice}>Venta:</Text>
            <TextInput style={styles.TextInput} editable={false} value={amountBlue}></TextInput>
            <Text style={styles.TextNamePrice}>Compra:</Text>
            <TextInput style={styles.TextInput} editable={false} value={amountBlueCompra}></TextInput>
          </View>
          <Text style={styles.TextName}>ARS</Text>
          <TextInput style={styles.TextInput} editable={false} value={result}></TextInput>
          <Text style={styles.SubName}>Precio actualizado al: {new Date().toLocaleString()}</Text>
        </View>
      )
    }
  }

  useEffect(() => {
    fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>

      {isLoading ? (<Text>Loading... </Text>) : (
        <View style={styles.itemContainer}>
          <FlatList data={data} renderItem={catchItem} />
        </View>
      )}


    </View>
  );
}

function DolarEnArgentina({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const renderItem = ({ item, index }) => {

    return (
      <ScrollView>
        <TouchableOpacity onPressIn={() => navigation.navigate('Calculadora de Conversion')}>
          <View style={styles.item} key={index}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>


              {imagesDolarEnArgentina.map((img => <Image style={styles.imgItem} source={img} />), index)}

            </View>

            <Text style={styles.itemNombre}>{item.casa.nombre}</Text>
            <View style={styles.itemColumn}>
              <Text style={styles.itemVenta}>Venta: {item.casa.venta}</Text>
              <Text style={styles.itemCompra}>Compra: {item.casa.compra}</Text>
              <Text style={styles.itemVariacion}>Ultima Varacion: {item.casa.variacion}%</Text>

            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  useEffect(() => {
    fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>

      {isLoading ? (<Text>Loading... </Text>) : (
        <View style={styles.itemContainer}>
          <FlatList data={data} renderItem={renderItem} />
        </View>
      )}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  itemContainer: {

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
  item: {
    backgroundColor: "white",
    color: "#15992b",
    padding: 15,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNombre: {
    flex: 0.8,
    alignItems: 'flex-start',
    padding: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemVenta: {
    flex: 0.5,
    alignItems: 'flex-end',
    fontWeight: 'bold',
    paddingTop: 25,
    color: '#e94e4e',
  },
  itemCompra: {
    flex: 0.5,
    alignItems: 'flex-end',
    fontWeight: 'bold',
    paddingTop: 25,
    color: '#15992b',
  },
  itemColumn: {
    flexDirection: 'column',
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
  itemVariacion: {
    paddingTop: 15,
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
  },
  imgItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },

  /* Button Style */



  /* STYLES FOR BANK */

  imgItemBank: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  itemNombreBank: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  /* STYLES COTIZADOR */
  containerCalculadora: {
    padding: 30,
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  containerPrice: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    padding: 5,
  },
  TextNamePrice: {
    fontSize: 15,
    paddingTop: 15,
  },
  TextName: {
    fontSize: 50,
  },
  tinyLogoCalculator: {
    width: 100,
    height: 100,
  },
  TextInput: {
    backgroundColor: '#d5e5a4',
    margin: 10,
    width: 100,
    borderRadius: 10,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});



export default App;