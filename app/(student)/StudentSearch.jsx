import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// --- Mock Suggested Students Data ---
const suggestedStudents = [
  {
    id: 's1',
    name: 'Sarah Chen',
    details: 'Computer Science, 2025',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: 's2',
    name: 'Alex Johnson',
    details: 'Business Admin, 2026',
    avatar: 'https://i.pravatar.cc/150?img=52',
  },
  {
    id: 's3',
    name: 'Priya Sharma',
    details: 'Electrical Eng, 2024',
    avatar: 'https://i.pravatar.cc/150?img=49',
  },
  {
    id: 's4',
    name: 'Marcus Bell',
    details: 'Creative Writing, 2027',
    avatar: 'https://i.pravatar.cc/150?img=53',
  },
];

// --- Student Item Component ---
const StudentItem = ({ item }) => (
  <TouchableOpacity style={styles.studentCard}>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View style={styles.studentInfo}>
      <Text style={styles.studentName}>{item.name}</Text>
      <Text style={styles.studentDetails}>{item.details}</Text>
    </View>
    <Text style={styles.viewProfileIcon}>→</Text>
  </TouchableOpacity>
);

const StudentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Minimal Header with Back Button --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find People</Text>
        <View style={{ width: 30 }} />{/* Spacer */}
      </View>

      {/* --- Search Bar --- */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search students by name, major, or ID..."
            placeholderTextColor="#888888"
            value={searchTerm}
            onChangeText={setSearchTerm}
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* --- Results/Suggestions Area --- */}
      <Text style={styles.sectionTitle}>
        {searchTerm ? `Results for "${searchTerm}"` : 'Suggested Students'}
      </Text>

      <FlatList
        data={suggestedStudents.filter(s =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.details.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StudentItem item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No matching students found.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default StudentSearch;

const styles = StyleSheet.create({
  // --- Global/Container Styles ---
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Soft off-white background
  },

  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    paddingRight: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#1A1A2E',
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
  },

  // --- Search Bar Styles ---
  searchBarContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#EDEDED',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0', // Light gray background
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 50,
  },
  searchIcon: {
    fontSize: 20,
    color: '#888888',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A2E',
    paddingVertical: 0, // Ensure consistent height
  },

  // --- List/Suggestions Styles ---
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#505050',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEEEEE',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 15,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  studentDetails: {
    fontSize: 14,
    color: '#888888',
  },
  viewProfileIcon: {
    fontSize: 20,
    color: '#FF6B6B', // Accent color
    fontWeight: '700',
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#A0A0A0',
  }
});