import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    padding: 20,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  description: {
    flex: 1,

    borderTopEndRadius: 4,
    borderTopStartRadius: 4,
  },

  titre: {
    backgroundColor: '#589442',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderWidth: 0,
    marginBottom: 20,
  },

  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    justifyContent: 'center',
  },

  container: {
    flex: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    maxHeight: 30,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },

  containerList: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
  },

  contentId: {
    flex: 1,
    backgroundColor: '#589442',
    margin: 1,
  },

  contentTel: {
    flex: 3,
    backgroundColor: '#589442',
    margin: 1,
    alignItems: 'center',
  },

  content: {
    flex: 2,
    backgroundColor: '#589442',
    margin: 1,

    alignItems: 'center',
  },

  th: {
    color: 'white',
    padding: 5,
  },

  listingId: {
    backgroundColor: 'white',
    flex: 1,
    margin: 1,
  },

  listingTel: {
    backgroundColor: 'white',
    flex: 3,
    margin: 1,
  },

  listing: {
    backgroundColor: 'white',
    flex: 2,
    margin: 1,
  },

  listingText: {
    padding: 4,
  },
});
export default styles;
