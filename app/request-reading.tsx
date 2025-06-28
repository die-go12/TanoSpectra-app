import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, StatusBar } from 'react-native';
import { ScanLine, BarChart3 } from 'lucide-react-native';
import { router } from 'expo-router';

export default function RequestReadingScreen() {
  const handleStartReading = () => {
    console.log('Lectura iniciada...');
    router.push('/status'); // Navega a la pantalla del semáforo
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#c8102e" />

      {/* Barra superior */}
      <View style={styles.navbar}>
        <Pressable style={styles.titleWrapper} onPress={() => router.push('/')}>
          <BarChart3 color="#fff" size={26} strokeWidth={2.2} />
          <Text style={styles.navbarTitle}>TanoSpectra</Text>
        </Pressable>
        <Pressable style={styles.aboutButton} onPress={() => router.push('/about')}>
          <Text style={styles.aboutButtonText}>Sobre Nosotros</Text>
        </Pressable>
      </View>

      {/* Contenido principal */}
      <View style={styles.card}>
        <View style={styles.header}>
          <ScanLine size={48} color="#c8102e" />
          <Text style={styles.title}>Iniciar Análisis Espectral</Text>
          <Text style={styles.description}>
            Prepare la muestra y comience la lectura.
          </Text>
        </View>

        <Image
          source={require('../assets/images/tano_inspecting_strawberry.png')}
          style={styles.image}
          resizeMode="contain"
          accessibilityLabel="Tano inspeccionando una fresa con una lupa"
        />

        <Text style={styles.instructions}>
          Coloque la muestra en el espectrómetro y presione el botón para
          solicitar una nueva lectura.
        </Text>

        <Pressable style={styles.button} onPress={handleStartReading}>
          <ScanLine size={20} color="#fff" />
          <Text style={styles.buttonText}>Solicitar Lectura</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce6eb',
  },
  navbar: {
    backgroundColor: '#c8102e',
    paddingTop: (StatusBar.currentHeight || 0) + 10,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navbarTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  aboutButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  aboutButtonText: {
    color: '#c8102e',
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginTop: 120,
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c8102e',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  image: {
    width: 340, //ancho de la imagen de tano
    height: 200, 
    borderRadius: 10,
    marginVertical: 20,
    alignSelf: 'center', 
  },
  instructions: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c8102e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

