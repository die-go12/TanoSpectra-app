import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, StatusBar } from 'react-native';
import { BarChart3 } from 'lucide-react-native';
import { router } from 'expo-router'; // ✅ Importar router

const levels = [
  {
    name: 'Seguro',
    color: 'green',
    message: 'Nivel seguro de organofosfatos.',
    image: require('../assets/images/tano_happy.jpeg'),
  },
  {
    name: 'Advertencia',
    color: 'orange',
    message: 'Nivel moderado. Se recomienda precaución.',
    image: require('../assets/images/tano_worried.jpeg'),
  },
  {
    name: 'Peligro',
    color: 'red',
    message: 'Nivel alto de organofosfatos. ¡Actúa inmediatamente!',
    image: require('../assets/images/tano_scared.jpeg'),
  },
];

export default function StatusScreen() {
  const [current, setCurrent] = useState(levels[0]);

  const simulateReading = () => {
    const random = levels[Math.floor(Math.random() * levels.length)];
    setCurrent(random);
  };

  useEffect(() => {
    simulateReading();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#c8102e" />
      
      {/* Barra superior con ícono */}
      <View style={styles.navbar}>
          <Pressable style={styles.titleWrapper} onPress={() => router.push('/')}>
            <BarChart3 color="#fff" size={26} strokeWidth={2.2} />
            <Text style={styles.navbarTitle}>TanoSpectra</Text>
          </Pressable>
        <Pressable style={styles.aboutButton} onPress={() => router.push('/about')}>
          <Text style={styles.aboutButtonText}>Sobre Nosotros</Text>
        </Pressable>
      </View>

      {/* Tarjeta principal */}
      <View style={styles.card}>
        <Text style={styles.title}>Nivel Detectado</Text>
        <View style={styles.trafficLight}>
          {levels.map((item) => (
            <View
              key={item.name}
              style={[
                styles.circle,
                {
                  backgroundColor: current.name === item.name ? item.color : '#ccc',
                  opacity: current.name === item.name ? 1 : 0.4,
                },
                current.name === item.name && styles.activeCircle,
              ]}
            />
          ))}
        </View>
        <Text style={[styles.level, { color: current.color }]}>{current.name}</Text>
        <Image source={current.image} style={styles.image} />
        <Text style={styles.message}>{current.message}</Text>
        <Pressable style={styles.button} onPress={simulateReading}>
          <Text style={styles.buttonText}>Simular Nueva Lectura</Text>
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
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#c8102e',
  },
  trafficLight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#999',
    marginHorizontal: 8,
  },
  activeCircle: {
    transform: [{ scale: 1.2 }],
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  level: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#c8102e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
