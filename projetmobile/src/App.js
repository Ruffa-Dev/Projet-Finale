import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Login from './assets/components/Login/Login';
import Client from './assets/components/Client/Client';
import Boutique from './assets/components/Boutique/Boutique';
import ListingClients from './assets/components/Listing/Listing-clients';
import styles from './styles';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = React.createContext({});

function App() {
  const Drawer = createDrawerNavigator();

  const [commercialToken, setCommercialToken] = useState('');
  const [commercialId, setCommercialId] = useState('');

  const contextContent = {
    commercialToken,
    setCommercialToken,
    commercialId,
    setCommercialId,
  };

  useEffect(() => {
    {
      /* useEffect = de repéter une fois l'action qu'on aimerait répéter */
    }
    getToken();
    getCommercialId();
  }, []);

  {
    /*  Asyncstorage c'est comme le LocalStorage ça permet de garder l'id de connexion et le mdp pour une nouvelle connexion */
  }

  async function getToken() {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      setCommercialToken(token);
    }
  }

  async function logout(props) {
    await AsyncStorage.removeItem('token');
    setCommercialToken('');
    await AsyncStorage.removeItem('id');
    setCommercialId('');
    props.navigation.navigate('Login');
  }

  async function getCommercialId() {
    const id = await AsyncStorage.getItem('id');

    if (id) {
      setCommercialId(id);
    }
  }

  function renderScreens() {
    {
      /* le Drawer = slide qui superpose l'application pour créér un menu pour naviguer entre les pages  */
    }
    if (commercialToken) {
      return [
        <Drawer.Screen name="Client" component={Client} key={1} />,
        <Drawer.Screen name="Boutique" component={Boutique} key={2} />,
        <Drawer.Screen
          name="Listing Clients"
          component={ListingClients}
          key={3}
        />,
      ];
    } else {
      return <Drawer.Screen name="Login" component={Login} />;
    }
  }

  {
    /* Scrollview = permet de faire défiler de haut en bas pour rentre visible tous les champs sur le téléphone */
  }
  return (
    <ScrollView>
      <View style={styles.header}>
        <NavigationContainer>
          <AppContext.Provider value={contextContent}>
            <Drawer.Navigator
              drawerStyle={{
                backgroundColor: '#d4d6d5',
                width: 200,
              }}
              initialRouteName={commercialToken ? 'Client' : 'Login'}
              openByDefault={false}
              drawerType="slide"
              drawerContent={(props) => (
                <DrawerContentScrollView {...props}>
                  {/* DrawerItemList =  */}
                  <DrawerItemList {...props} />
                  {/* DrawerItem = composant utilisé pour afficher un élément d'action avec une icône et une étiquette dans un tiroir de navigation. */}
                  <DrawerItem
                    label="Déconnexion"
                    onPress={() => logout(props)}
                  />
                </DrawerContentScrollView>
              )}>
              {renderScreens()}
            </Drawer.Navigator>
          </AppContext.Provider>
        </NavigationContainer>
      </View>
    </ScrollView>
  );
}

export default App;
