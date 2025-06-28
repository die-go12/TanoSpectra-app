import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, StatusBar } from 'react-native';
import { CheckCircle2, AlertTriangle, OctagonAlert, PieChart, FlaskConical, BarChart3 } from 'lucide-react-native';
import { router } from 'expo-router';

const levels = [
  {
    name: 'Sin señales espectrales inusuales',
    color: 'green',
    details: [
      { Icon: CheckCircle2, text: 'Estado seguro, sin señales espectrales inusuales detectadas.' },
      { Icon: PieChart, text: 'Coincidencia con muestras limpias: 92%' },
      { Icon: FlaskConical, text: 'El espectro es similar al de una muestra limpia, sin indicios de residuos.' },
    ],
    tanoMessage: 'Tano dice: “Todo se ve en orden, sin señales sospechosas.”',
    image: require('../assets/images/tano_happy.jpeg'),
  },
  {
    name: 'Desviación espectral moderada',
    color: 'orange',
    details: [
      { Icon: AlertTriangle, text: 'Estado moderado, desviación espectral detectada.' },
      { Icon: PieChart, text: 'Coincidencia con muestras ligeramente alteradas: 64%' },
      { Icon: FlaskConical, text: 'Se detectan variaciones en el espectro. Podrían deberse a residuos leves u otras causas.' },
    ],
    tanoMessage: 'Tano dice: “Hay algunas variaciones... mejor revisar con calma.”',
    image: require('../assets/images/tano_worried.jpeg'),
  },
  {
    name: 'Desviación espectral significativa',
    color: 'red',
    details: [
      { Icon: OctagonAlert, text: 'Estado crítico, desviación espectral significativa detectada.' },
      { Icon: PieChart, text: 'Coincidencia con muestras contaminadas: 86%' },
      { Icon: FlaskConical, text: 'El espectro tiene alteraciones notorias, compatibles con muestras contaminadas.' },
    ],
    tanoMessage: 'Tano dice: “¡Ojo! Este resultado se parece al de una muestra contaminada.”',
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
        <Image source={current.image} style={styles.image} />
        <Text style={[styles.level, { color: current.color }]}>{current.name}</Text>

        {/* Caja interna de detalles */}
        <View style={styles.detailsBox}>
          {current.details.map((detail, index) => (
            <View key={index} style={styles.detailRow}>
              <detail.Icon color={current.color} size={20} />
              <Text style={styles.detailText}>{detail.text}</Text>
            </View>
          ))}
        </View>
        {/* Caja del mensaje de Tano */}
        <View style={styles.tanoBox}>
          <Text style={styles.tanoMessage}>{current.tanoMessage}</Text>
        </View>

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#c8102e',
    textAlign: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  detailsBox: {
    backgroundColor: '#fce6eb',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  tanoBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fce6eb',
    alignItems: 'center',
    marginBottom: 15,
  },
  tanoMessage: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#555',
  },
  button: {
    backgroundColor: '#c8102e',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});






