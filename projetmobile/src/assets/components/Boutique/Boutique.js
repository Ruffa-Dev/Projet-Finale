import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import styles from './styles';
import {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

function Boutique(props) {
  const [boutique, setBoutique] = useState({});

  const [useLivraison, setUseLivraison] = useState(false);

  const [useClickAndCollect, setUseClickAndCollect] = useState(false);

  const [listingSecteur, setListingSecteur] = useState([]);
  const [secteurs, setSecteurs] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      let id = props.route.params ? props.route.params.id : null;
      if (id === null) {
        /* navigation.navigate = lien vers la page client  */
        props.navigation.navigate('Client');
      } else {
        ListSecteur();
      }
    });
    return unsubscribe;
  }, []);

  const handleBoutique = (value, name) => {
    setBoutique({...boutique, [name]: value});
  };
  const Formboutique = () => {
    const idUser = props.route.params ? props.route.params.id : null; // Récupération de l'id utilisateur

    /* Si l'id utilisateur n'existe pas, ne pas envoyer les données */
    if (!idUser) {
      return;
    }

    const boutiqueData = {
      ...boutique,
      can_prepa: useClickAndCollect ? 1 : 0,
      can_delivery: useLivraison ? 1 : 0,
      k: 'csk_a0b3c961d37ca460f8672c12ea22aff8ebe',
      id_user: idUser,
      id_secteur: secteurs,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boutiqueData),
    };
    fetch('https://cityshops.fr/api/v1/shops', options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          console.log(data);
          alert('Formulaire envoyé avec succès');
          setBoutique({});
          setUseLivraison(false);
          setUseClickAndCollect(false);
          setSecteurs('');
          props.navigation.navigate('Client');
        },
        (error) => {
          console.log(error);
        },
      );
  };
  /* Récupération des données 'secteur'*/
  const ListSecteur = () => {
    const secteur = {
      k: 'csk_a0b3c961d37ca460f8672c12ea22aff8ebe',
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(secteur),
    };
    fetch('https://cityshops.fr/api/v1/secteurs', options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          setListingSecteur(data.data);
        },
        (error) => {
          console.log(error);
        },
      );
  };

  const handleSecteur = (value) => {
    setSecteurs(value);
  };
  /* ".map" =  une boucle d'affichage qui permet d'afficher les éléments contenus dans le tableau  */
  const secteurData = listingSecteur.map((element, index) => (
    <Picker.Item key={index} label={element.name} value={element.id} />
  ));

  const renderClickAndCollectInputs = () => {
    if (useClickAndCollect) {
      return (
        <View>
          <TextInput
            style={styles.prepacommande}
            placeholder="Temps(min)"
            value={boutique.time_prepa}
            onChangeText={(value) => {
              handleBoutique(value, 'time_prepa');
            }}></TextInput>
        </View>
      );
    }
  };

  const renderLivraisonInputs = () => {
    if (useLivraison) {
      return (
        <View>
          {/* Value = valeur, en l'occurrence ici la valeur et mise dans le switch Livraison afin d'apparaitre s'il y a une demande */}
          {/* TextInput = un text peut être visible pour identifier le champ et peut être écrit par dessus*/}
          {/* PlaceHolder = Permet de remplir avec le texte qu'on choisit */}
          {/* onChangeText = appelé à chaque fois que l'utilisateur saisit un caractère */}

          <TextInput
            style={styles.tempslivraison}
            placeholder="Temps(min)"
            value={boutique.time_delivery}
            onChangeText={(value) => {
              handleBoutique(value, 'time_delivery');
            }}></TextInput>
          <TextInput
            style={styles.prixlivraison}
            placeholder="Prix livraison"
            value={boutique.delivery_cost}
            onChangeText={(value) => {
              handleBoutique(value, 'delivery_cost');
            }}></TextInput>
          <TextInput
            style={styles.livgratuite}
            placeholder="Livraison gratuite > X"
            value={boutique.delivery_offer}
            onChangeText={(value) => {
              handleBoutique(value, 'delivery_offer');
            }}></TextInput>
          <TextInput
            style={styles.livmin}
            placeholder="Livraison montant > X"
            value={boutique.delivery_min}
            onChangeText={(value) => {
              handleBoutique(value, 'delivery_min');
            }}></TextInput>
        </View>
      );
    }
  };

  return (
    <ImageBackground
      source={require('../../images/pattern2.png')}
      style={styles.backgroundImage}>
      <View style={styles.description}>
        <View style={styles.titre}>
          <Text style={styles.title}>Formulaire Boutique</Text>
        </View>
        <ScrollView style={styles.formulaire} nestedScrollEnabled>
          <TextInput
            style={styles.nom}
            placeholder="Nom du magasin"
            value={boutique.name}
            onChangeText={(value) => {
              handleBoutique(value, 'name');
            }}></TextInput>
          <TextInput
            style={styles.adresse}
            placeholder="Adresse"
            value={boutique.adresse}
            onChangeText={(value) => {
              handleBoutique(value, 'adresse');
            }}></TextInput>
          <TextInput
            style={styles.ville}
            placeholder="Ville"
            value={boutique.ville}
            onChangeText={(value) => {
              handleBoutique(value, 'ville');
            }}></TextInput>
          <TextInput
            style={styles.cp}
            placeholder="Code postal"
            value={boutique.cp}
            onChangeText={(value) => {
              handleBoutique(value, 'cp');
            }}></TextInput>
          <View>
            {/* Picker = menu déroulant => selecteur du ''secteur''*/}
            <Picker selectedValue={secteurs} onValueChange={handleSecteur}>
              {secteurData}
            </Picker>
          </View>
          <View style={styles.un}>
            <View style={styles.deux}>
              <Text style={styles.clickcollect}>Click&collect</Text>
            </View>
            <View style={styles.trois}>
              {/* Switch = le switch est un bouton qui permet de faire apparaitre des champs lexicaux (Inputtext)  */}
              <Switch
                style={styles.switch}
                trackColor={{false: '#767577', true: '#767577'}}
                thumbColor={useClickAndCollect ? '#589442' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setUseClickAndCollect(!useClickAndCollect)}
                value={useClickAndCollect}
              />
            </View>
          </View>
          {renderClickAndCollectInputs()}

          <View style={styles.un}>
            <View style={styles.deux}>
              <Text style={styles.livraison}>Livraison</Text>
            </View>
            <View style={styles.trois}>
              <Switch
                style={styles.switch}
                trackColor={{false: '#767577', true: '#767577'}}
                thumbColor={useLivraison ? '#589442' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setUseLivraison(!useLivraison)}
                value={useLivraison}
              />
            </View>
          </View>
          {renderLivraisonInputs()}

          <View style={styles.bouton}>
            {/* touchableOpacity = permet de mettre un bouton exemple valider en l'occurrence ici  */}
            {/* OnPress = Quand on appuie sur le bouton cela va nous emmener dans le formulaire boutique */}
            <TouchableOpacity onPress={Formboutique}>
              <Text style={styles.valide}>Valider</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default Boutique;
