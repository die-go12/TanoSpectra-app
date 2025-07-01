import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar, Alert, FlatList, PermissionsAndroid, Platform } from 'react-native';
import { ScanLine, BarChart3 } from 'lucide-react-native';
import { router } from 'expo-router';
import { BleManager, Device } from 'react-native-ble-plx';

const bleManager = new BleManager();

export default function RequestReadingScreen() {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 31) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
        return (
          granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };

  const handleStartScan = async () => {
    const permissionsGranted = await requestPermissions();
    if (!permissionsGranted) {
      Alert.alert('Permisos requeridos', 'Los permisos de Bluetooth son necesarios para escanear dispositivos.');
      return;
    }

    setScanning(true);
    setDevices([]); // Resetea la lista de dispositivos encontrados

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        Alert.alert('Error', `Error al escanear dispositivos: ${error.message}`);
        setScanning(false);
        return;
      }

      if (device && !devices.find((d) => d.id === device.id)) {
        setDevices((prev) => [...prev, device]); // Evita duplicados
      }
    });
  };

  const handleStopScan = () => {
    bleManager.stopDeviceScan();
    setScanning(false);
  };

  const handleConnectToDevice = async (device: Device) => {
    try {
      const connected = await bleManager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      Alert.alert('Conexión exitosa', `Conectado a: ${device.name || 'Dispositivo'}`);
    } catch (error: any) {
      Alert.alert('Error', `No se pudo conectar al dispositivo: ${error.message}`);
    }
  };

  const startStreamingData = async (device: Device) => {
    if (!device) {
      console.log('No hay ningún dispositivo conectado');
      return;
    }
    const UUID_SERVICE = '19b10000-e8f2-537e-4f6c-d104768a1214';
    const UUID_CHARACTERISTIC = '19b10001-e8f2-537e-4f6c-d104768a1217';

    device.monitorCharacteristicForService(UUID_SERVICE, UUID_CHARACTERISTIC, (error, characteristic) => {
      if (error) {
        console.error('Error al recibir datos:', error.message);
        return;
      }
      if (!characteristic?.value) {
        console.log('No se recibieron datos');
        return;
      }
      const value = atob(characteristic.value); // Decodifica la base64
      console.log('Datos recibidos:', value);
    });
  };

  useEffect(() => {
    return () => {
      bleManager.stopDeviceScan();
      bleManager.destroy();
    };
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

      {/* Contenido principal */}
      <View style={styles.card}>
        <View style={styles.header}>
          <ScanLine size={48} color="#c8102e" />
          <Text style={styles.title}>Escaneo de Dispositivos</Text>
          <Text style={styles.description}>
            Escanee y conéctese a un dispositivo compatible.
          </Text>
        </View>

        {scanning ? (
          <Text style={styles.instructions}>Escaneando dispositivos...</Text>
        ) : (
          <FlatList
            data={devices}
            keyExtractor={(item, index) => `${item.id}_${index}`} // Claves únicas combinando ID e índice
            renderItem={({ item }) => (
              <Pressable
                style={styles.deviceItem}
                onPress={() => handleConnectToDevice(item)}
              >
                <Text style={styles.deviceName}>
                  {item.name || 'Dispositivo desconocido'}
                </Text>
                <Text style={styles.deviceId}>{item.id}</Text>
              </Pressable>
            )}
          />
        )}

        <Pressable
          style={styles.button}
          onPress={scanning ? handleStopScan : handleStartScan}
        >
          <ScanLine size={20} color="#fff" />
          <Text style={styles.buttonText}>
            {scanning ? 'Detener Escaneo' : 'Escanear Dispositivos'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fce6eb' },
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
  titleWrapper: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navbarTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginLeft: 8 },
  aboutButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  aboutButtonText: { color: '#c8102e', fontSize: 14, fontWeight: 'bold' },
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
  header: { alignItems: 'center', marginBottom: 20 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c8102e',
    marginTop: 10,
    textAlign: 'center',
  },
  description: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 5 },
  instructions: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 20 },
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
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  deviceItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceName: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  deviceId: { fontSize: 12, color: '#666' },
});

