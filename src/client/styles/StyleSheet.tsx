import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  bikeListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '20%',
    paddingTop: '3.5%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },
  buttonContainer: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  bikeDetailButton: {
    backgroundColor: 'blue',
    width: '30%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  bikeDetailButtonOutlined: {
    backgroundColor: 'white',
    width: '30%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'blue'
  },
  button: {
    backgroundColor: 'blue',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'blue',
    borderWidth: 2
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  buttonOutlineText: {
    color: 'blue',
    fontWeight: '700',
    fontSize: 16
  },
  row: {
    flexDirection: 'row',
    marginTop: 4
  },
  link: {
    fontWeight: 'bold',
    color: 'darkblue'
  },
  scrollViewWaiver: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  scrollViewText: {
    fontSize: 30,
    marginHorizontal: 20,
    marginVertical: 20
  },
  smallEmptySpace: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  emptySpace: {
    paddingHorizontal: 40,
    paddingVertical: 40
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    color: '#065C00'
  },
  flatListItem: {
    marginTop: 1,
    paddingTop: 1,
    paddingLeft: 22
  },
  viewBikesCard: {
    backgroundColor: 'whitesmoke'
  }
});

export default styles;
