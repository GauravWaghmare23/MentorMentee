import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerLayout } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

// Get screen width for responsive image sizing
const { width } = Dimensions.get('window');

// --- Mock Data (Kept the same) ---
const posts = [
  {
    id: '1',
    title: 'College Fest 2025 Announced',
    description: 'Join us for the annual culture fest filled with fun, music and creativity!',
    image: 'https://source.unsplash.com/800x400/?college,event',
    author: 'College Admin',
    avatar: 'https://ui-avatars.com/api/?name=College+Admin&background=FF6B6B&color=fff',
  },
  {
    id: '2',
    title: 'Hackathon Registration Open',
    description: 'Show off your coding skills and win exciting prizes!',
    image: 'https://source.unsplash.com/800x400/?hackathon,code',
    author: 'Tech Club',
    avatar: 'https://ui-avatars.com/api/?name=Tech+Club&background=4ECDC4&color=fff',
  },
  {
    id: '3',
    title: 'Photography Contest 📸',
    description: 'Capture campus life and win a feature in the college magazine.',
    image: 'https://source.unsplash.com/800x400/?photography,contest',
    author: 'Media Team',
    avatar: 'https://ui-avatars.com/api/?name=Media+Team&background=556270&color=fff',
  },
  {
    id: '4',
    title: 'Guest Lecture: AI & Ethics',
    description: 'Join us for an insightful session with Dr. Mehta on the future of AI.',
    image: 'https://source.unsplash.com/800x400/?lecture,ai',
    author: 'Faculty',
    avatar: 'https://ui-avatars.com/api/?name=Faculty&background=FFE66D&color=000',
  },
  {
    id: '5',
    title: 'Sports Meet 2025',
    description: 'Get ready to compete and cheer in our annual sports extravaganza!',
    image: 'https://source.unsplash.com/800x400/?sports,competition',
    author: 'Sports Committee',
    avatar: 'https://ui-avatars.com/api/?name=Sports+Committee&background=C733FF&color=fff',
  },
];

const StudentHome = () => {
  const router = useRouter();
  const drawerRef = useRef(null);

  // Helper component for drawer items (to keep renderDrawer clean)
  const DrawerItem = ({ icon, label, route, current }) => (
    <TouchableOpacity
      style={[styles.drawerItem, current && styles.drawerItemCurrent]}
      onPress={() => {
        drawerRef.current?.closeDrawer();
        // In a real app, you'd navigate here
        // router.push(route); 
      }}
    >
      <Text style={[styles.drawerItemText, current && styles.drawerItemTextCurrent]}>{icon} {label}</Text>
    </TouchableOpacity>
  );

  // --- LIGHT-THEMED DRAWER ---
  const renderDrawer = () => (
    <View style={styles.drawer}>
      <Text style={styles.drawerTitle}>Campus.Feed 💡</Text>
      <View style={styles.drawerItemsContainer}>
        {/* Pass props to the helper component */}
        <DrawerItem icon="🏠" label="Home" route="StudentHome" current />
        <DrawerItem icon="👤" label="Profile" route="StudentProfile" />
        <DrawerItem icon="💬" label="Messages" route="StudentChats" />
        <DrawerItem icon="🔍" label="Explore" route="StudentSearch" />
      </View>
      <TouchableOpacity
        style={styles.drawerActionButton}
        onPress={() => {
          drawerRef.current?.closeDrawer();
          // router.push('StudentPostAdd');
        }}
      >
        <Text style={styles.drawerActionButtonText}>➕ Create Post</Text>
      </TouchableOpacity>
    </View>
  );

  // --- REFINED POST LAYOUT ---
  const renderPost = ({ item }) => (
    <View style={styles.postCardWrapper}>
      <View style={styles.postCard}>

        {/* Post Header: Minimalist Avatar and Author */}
        <View style={styles.postHeader}>
          <Image source={{ uri: item.avatar }} style={styles.postAvatar} />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.postAuthor}>{item.author}</Text>
            <Text style={styles.postTime}>1h ago • Campus</Text>
          </View>
          <Text style={styles.moreIcon}>•••</Text>
        </View>

        {/* Post Image: The core content */}
        <Image source={{ uri: item.image }} style={styles.postImage} />

        {/* Post Content & Actions (Combined for a cleaner look) */}
        <View style={styles.postContent}>
          {/* Minimal Action Icons */}
          <View style={styles.postActionsMinimal}>
            <Text style={styles.minimalActionIcon}>❤️</Text>
            <Text style={styles.minimalActionIcon}>💬</Text>
            <Text style={styles.minimalActionIcon}>✈️</Text>
          </View>

          {/* Engagement Summary */}
          <Text style={styles.engagementSummary}>
            Liked by <Text style={styles.boldText}>randybchtr</Text> and <Text style={styles.boldText}>348 others</Text>
          </Text>

          {/* Text Body */}
          <Text style={styles.postDescription}>
            <Text style={styles.postAuthorInline}>{item.author}</Text> {item.description} <Text style={styles.readMore}>...more</Text>
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={width * 0.75}
      drawerPosition="left"
      renderNavigationView={renderDrawer}
      drawerBackgroundColor="rgba(0, 0, 0, 0.2)" // Lighter overlay
    >
      <SafeAreaView style={styles.container}>
        {/* --- Minimal Header/Top Bar --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => drawerRef.current?.openDrawer()}>
            <Text style={styles.headerIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>campus.feed</Text> {/* Minimal logo/name */}
          <TouchableOpacity onPress={() => router.push('StudentProfile')}>
            {/* Profile icon in the top right for quick access */}
            <Text style={styles.headerIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Feed */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          contentContainerStyle={styles.feedContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </DrawerLayout>
  );
};

export default StudentHome;

const styles = StyleSheet.create({
  // --- Global/Container Styles ---
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Soft off-white background
  },
  boldText: {
    fontWeight: '700',
    color: '#1A1A2E',
  },

  // --- Minimal Header Styles (Top Navigation Bar) ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 0.5, // Thinner border
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800', // Very bold
    color: '#FF6B6B', // Accent color for the logo
    letterSpacing: 0.5,
  },
  headerIcon: {
    fontSize: 24,
    color: '#1A1A2E', // Dark icons
  },

  // --- Feed and Post Styles ---
  feedContainer: {
    paddingVertical: 8,
    // Note: Removed horizontal padding here to let the wrapper handle it
  },
  postCardWrapper: {
    // This wrapper adds the horizontal space around each card
    paddingHorizontal: 16,
    marginBottom: 20, // Increased vertical space between cards
  },
  postCard: {
    // Card itself
    backgroundColor: '#FFFFFF',
    borderRadius: 16, // Added rounded corners to the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden', // Essential to respect border radius
  },

  // Post Header (New social media style)
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FF6B6B', // Accent border
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  postTime: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  moreIcon: {
    fontSize: 18,
    fontWeight: '900',
    color: '#505050',
    paddingHorizontal: 8,
  },

  postImage: {
    width: '100%',
    height: width * 0.9 - 32, // Adjusted height to account for postCardWrapper padding
  },

  // Post Content
  postContent: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    paddingTop: 8,
  },
  postActionsMinimal: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  minimalActionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  engagementSummary: {
    fontSize: 14,
    color: '#505050',
    marginBottom: 6,
  },
  postDescription: {
    fontSize: 14,
    color: '#505050',
    lineHeight: 20,
  },
  postAuthorInline: {
    fontWeight: '700',
    color: '#1A1A2E',
    marginRight: 4,
  },
  readMore: {
    color: '#A0A0A0',
    fontWeight: '600',
  },

  // --- LIGHT-THEMED Drawer Styles (Navigation Menu) ---
  drawer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White drawer background
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  drawerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 40,
    color: '#1A1A2E', // Dark text for light background
    letterSpacing: 0.5,
  },
  drawerItemsContainer: {
    marginBottom: 40,
  },
  drawerItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  drawerItemCurrent: {
    backgroundColor: '#F0F0F0', // Very light highlight for active item
  },
  drawerItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#505050', // Gray text
  },
  drawerItemTextCurrent: {
    color: '#FF6B6B', // Accent color for current text
    fontWeight: '700',
  },
  drawerActionButton: {
    backgroundColor: '#FF6B6B', // Primary accent color
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  drawerActionButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF', // White text on accent button
  },
});