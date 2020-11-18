import React from 'react';
import {View, Text, ImageBackground, Image, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config.json';
import {AppContext} from '../../../App';

/* connection à un compte commercial */
function Login(props) {
  const [account, setAccount] = useState({});
  const context = useContext(AppContext);

  const handleAccount = (value, name) => {
    setAccount({...account, [name]: value});
  };
  const loggingIn = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    };
    fetch(apiUrl + '/commercial/login', options)
      .then((response) => {
        return response.json();
      })
      .then(
        async (data) => {
          if (data.token) {
            try {
              await AsyncStorage.setItem('token', data.token);
              context.setCommercialToken(data.token);
              await AsyncStorage.setItem('id', data.id);
              context.setCommercialId(data.id);
              alert('Connexion réussie');
              props.navigation.navigate('Client');
              console.log('success');
            } catch (error) {
              console.log(error);
            }
          }
        },
        (error) => {
          console.log(error);
        },
      );
  };

  return (
    <ImageBackground
      source={require('../../images/pattern2.png')}
      style={styles.backgroundImage}>
      <View style={styles.monde1}>
        <View style={styles.niveau1}>
          <Image
            source={require('../../images/cityshops1.png')}
            style={styles.cityshops}></Image>
        </View>

        <View style={styles.level1}>
          <View style={styles.niveau2}>
            <Text style={styles.login}>Connexion</Text>
          </View>
          <View style={styles.niveau3}>
            <View style={styles.margin}>
              <TextInput
                style={styles.text}
                placeholder="Email"
                value={account.email}
                onChangeText={(value) => {
                  handleAccount(value, 'email');
                }}></TextInput>
              <TextInput
                type="password"
                secureTextEntry={true}
                style={styles.text1}
                placeholder="Mot de passe"
                value={account.password}
                onChangeText={(value) => {
                  handleAccount(value, 'password');
                }}></TextInput>
            </View>
            <View style={styles.niveau4}>
              <TouchableOpacity onPress={loggingIn}>
                <Text style={styles.connexion}>Connexion</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Login;
