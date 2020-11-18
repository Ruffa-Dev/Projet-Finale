import React, {useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {useState} from 'react';
import {AppContext} from '../../../App';
import {apiUrl} from '../../config.json';

function Client(props) {
  const context = useContext(AppContext);

  const [client, setClient] = useState({});

  const handleClient = (value, name) => {
    setClient({...client, [name]: value});
  };
  /* Récupère les données clients */
  const Formclient = () => {
    const clientData = {
      ...client,
      id_commercial: context.commercialId,
      k: 'csk_a0b3c961d37ca460f8672c12ea22aff8ebe',
      level: 1,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    };
    fetch('https://cityshops.fr/api/v1/users', options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          setClient({});
          sendMail();
          props.navigation.navigate('Boutique', {id: data.data.id});
          alert('Formulaire envoyé, veuillez remplir la boutique');
        },
        (error) => {
          console.log(error);
        },
      );
  };
  /* envoyer un mail avec les identifiants */
  const sendMail = () => {
    const mailData = {
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      password: client.password,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mailData),
    };
    fetch(apiUrl + '/commercial/send-mail', options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        },
      );
  };
  /* mise en page du formulaire */
  return (
    <ImageBackground
      source={require('../../images/pattern2.png')}
      style={styles.backgroundImage}>
      <View style={styles.description}>
        <View style={styles.titre}>
          <Text style={styles.title}>Formulaire Client</Text>
        </View>

        <TextInput
          style={styles.nom}
          placeholder="Nom"
          value={client.nom}
          onChangeText={(value) => {
            handleClient(value, 'nom');
          }}></TextInput>
        <TextInput
          style={styles.prenom}
          placeholder="Prénom"
          value={client.prenom}
          onChangeText={(value) => {
            handleClient(value, 'prenom');
          }}></TextInput>
        <TextInput
          style={styles.societe}
          placeholder="Société"
          value={client.societe}
          onChangeText={(value) => {
            handleClient(value, 'societe');
          }}></TextInput>
        <TextInput
          style={styles.email}
          placeholder="Email"
          value={client.email}
          onChangeText={(value) => {
            handleClient(value, 'email');
          }}></TextInput>
        <TextInput
          style={styles.telephone}
          placeholder="Téléphone"
          value={client.tel}
          onChangeText={(value) => {
            handleClient(value, 'tel');
          }}></TextInput>
        <TextInput
          type="password"
          style={styles.mdp}
          placeholder="Mot de passe"
          value={client.password}
          onChangeText={(value) => {
            handleClient(value, 'password');
          }}></TextInput>
        <View style={styles.bouton}>
          <TouchableOpacity onPress={Formclient}>
            <Text style={styles.valide}>Valider</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Client;
