import React, {useContext, useEffect} from 'react';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import styles from './styles';
import {useState} from 'react';
import {AppContext} from '../../../App';

function ListingClients() {
  const context = useContext(AppContext);

  const [list, setList] = useState({});
  const [listGlobal, setListGlobal] = useState({
    data: [{}],
  });

  useEffect(() => {
    getList();
  }, []);
  /* Récupère les données de list */
  /* "...list = recupérer tout le contenu dans le tableau"  */
  function getList() {
    const listData = {
      ...list,
      id_commercial: context.commercialId,
      k: 'csk_a0b3c961d37ca460f8672c12ea22aff8ebe',
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    };

    fetch('https://cityshops.fr/api/v1/listusers', options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          setListGlobal(data);
        },
        (error) => {
          console.log(error);
        },
      );
  }
  /* une boucle d'affichage affiche les éléments contenus du tableau showlist */
  const showList = listGlobal.data.map((value, index) => (
    <View style={styles.containerList} key={index}>
      <View style={styles.listingId}>
        <Text style={styles.listingText}>{value.id}</Text>
      </View>
      <View style={styles.listing}>
        <Text style={styles.listingText}>{value.nom}</Text>
      </View>
      <View style={styles.listing}>
        <Text style={styles.listingText}>
          {value.shop ? value.shop.name : '-'}
        </Text>
      </View>
      <View style={styles.listingTel}>
        <Text style={styles.listingText}>{value.tel}</Text>
      </View>
    </View>
  ));

  return (
    <ImageBackground
      source={require('../../images/pattern2.png')}
      style={styles.backgroundImage}>
      <View style={styles.description}>
        <View style={styles.titre}>
          <Text style={styles.title}>Listing Global</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.contentId}>
            <Text style={styles.th}>ID</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.th}>Nom</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.th}>Boutique</Text>
          </View>
          <View style={styles.contentTel}>
            <Text style={styles.th}>Téléphone</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView} nestedScrollEnabled>
          {showList}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default ListingClients;
