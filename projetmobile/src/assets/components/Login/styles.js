import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  monde1: {
    flex: 1,

    justifyContent: 'center',
    marginHorizontal: 50,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  niveau1: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: -30,
    marginRight: -30,
    flexDirection: 'row',
  },

  logo: {
    color: 'black',
    fontSize: 40,
    textAlign: 'center',
  },

  niveau2: {
    height: 60,
    backgroundColor: '#589442',
    justifyContent: 'center',
    borderTopEndRadius: 4,
    borderTopStartRadius: 4,
    borderWidth: 0,
  },

  login: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },

  niveau3: {
    backgroundColor: 'white',
    borderWidth: 0,
  },

  margin: {
    marginTop: 10,
  },

  text: {
    color: 'black',
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 5,
    top: 25,
    borderRadius: 4,
  },
  text1: {
    color: 'black',
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    top: 40,
    borderRadius: 4,
  },

  niveau4: {
    backgroundColor: '#589442',
    borderRadius: 4,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 9,
    marginLeft: 9,
    marginBottom: 9,
    marginTop: 70,
    height: 45,
  },
  connexion: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default styles;
