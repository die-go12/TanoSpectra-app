import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router'; // Necesario para navegar

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/tano_spectra.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>TanoSpectra</Text>
        <Text style={styles.subtitle}>Universidad Peruana Cayetano Heredia</Text>

        <Pressable style={styles.button} onPress={() => router.push('/request-reading')}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce6eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#f49dad',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c8102e',
  },
  subtitle: {
    fontSize: 16,
    color: '#c8102e',
    marginTop: 8,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#c8102e',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

