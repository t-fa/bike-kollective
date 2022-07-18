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
  emptySpace: {
    paddingHorizontal: 40,
    paddingVertical: 40
  }
});

export default styles;
