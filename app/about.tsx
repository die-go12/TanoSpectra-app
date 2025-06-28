import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Lightbulb, Cpu, Users, UserCircle } from 'lucide-react-native';
import { useNavigation } from 'expo-router';
import { StackNavigationOptions } from '@react-navigation/stack';

export default function AboutScreen() {
  const navigation = useNavigation();

  // Personalizar el header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#C8102E',
      },
      headerTintColor: '#fff',
      headerTitle: 'Volver',
      headerBackTitleVisible: false,
    } as StackNavigationOptions);
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre TanoSpectra</Text>
      <Text style={styles.subtitle}>
        Innovando el análisis espectral para un futuro más saludable.
      </Text>

      <Section title="Nuestra Misión" icon={<Lightbulb size={28} color="#D92D1A" />}>
        <Text style={styles.paragraph}>
          TanoSpectra se dedica a proporcionar detección accesible y rápida de organofosfatos mediante el análisis avanzado de datos espectrales. Nuestro objetivo es empoderar a comunidades e industrias con herramientas que aseguren la seguridad ambiental y alimentaria.
        </Text>
      </Section>

      <Section title="La Tecnología" icon={<Cpu size={28} color="#D92D1A" />}>
        <Text style={styles.paragraph}>
          Nuestra plataforma utiliza algoritmos sofisticados para interpretar datos espectrales, identificando marcadores clave asociados a los organofosfatos. Las visualizaciones interactivas permiten una comprensión intuitiva de conjuntos de datos complejos.
        </Text>
        <View style={styles.imageRow}>
          <Image source={{ uri: 'https://placehold.co/300x200.png' }} style={styles.image} />
          <Image source={{ uri: 'https://placehold.co/300x200.png' }} style={styles.image} />
        </View>
      </Section>

      <Section title="El Equipo" icon={<Users size={28} color="#D92D1A" />}>
        <Text style={styles.paragraph}>
          Somos un equipo apasionado de desarrolladores, diseñadores y científicos comprometidos con generar un impacto positivo a través de la tecnología.
        </Text>

        <TeamMember name="Andrés Rodas" role="Diseñador 3D y documentación técnica" />
        <TeamMember name="Juan Diego López" role="Diseñador 3D y desarrollador de la app" />
        <TeamMember name="Darío Huerta" role="Hardware y ensamblaje electrónico" />
        <TeamMember name="Harriet Mamani" role="Investigación química y pesticidas" />
        <TeamMember name="Jheyson Castañeda" role="Soporte técnico y pruebas en campo" />
      </Section>
    </ScrollView>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        {icon}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function TeamMember({ name, role }: { name: string; role: string }) {
  return (
    <View style={styles.teamMember}>
      <View style={styles.avatar}>
        <UserCircle size={48} color="#C8102E" />
      </View>
      <View>
        <Text style={styles.memberName}>{name}</Text>
        <Text style={styles.memberRole}>{role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F2E2E5',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C8102E',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#FDF8F9',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#C8102E',
  },
  paragraph: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.9)',
    lineHeight: 22,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 12,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FCE6EB',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C8102E',
  },
  memberRole: {
    fontSize: 14,
    color: '#888',
  },
});



