import React from 'react';
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

// --- Mock Chat Data ---
const chatThreads = [
  {
    id: 'c1',
    name: 'Sebastian Rudiger',
    lastMessage: 'Perfect! Will check it out 🔥',
    time: '09:34 PM',
    avatar: 'https://i.pravatar.cc/150?img=6',
    unreadCount: 0,
    online: true,
  },
  {
    id: 'c2',
    name: 'Caroline Varsaha',
    lastMessage: 'Thanks, Jimmy! Talk later',
    time: '08:12 PM',
    avatar: 'https://i.pravatar.cc/150?img=3',
    unreadCount: 2,
    online: false,
  },
  {
    id: 'c3',
    name: 'Darshan Patelchi',
    lastMessage: 'Sound good for me too!',
    time: '02:29 PM',
    avatar: 'https://i.pravatar.cc/150?img=5',
    unreadCount: 3,
    online: true,
  },
  {
    id: 'c4',
    name: 'Mohammed Arnold',
    lastMessage: '✔ No rush, mate! Just let...',
    time: '01:08 PM',
    avatar: 'https://i.pravatar.cc/150?img=1',
    unreadCount: 0,
    online: false,
  },
  {
    id: 'c5',
    name: 'Tamara Schipchinskaya',
    lastMessage: '✔ Okay. I’ll tell him about it',
    time: '11:15 AM',
    avatar: 'https://i.pravatar.cc/150?img=7',
    unreadCount: 0,
    online: true,
  },
  {
    id: 'c6',
    name: 'Ariana Amberline',
    lastMessage: 'Good nite, Honey! ❤',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/150?img=8',
    unreadCount: 0,
    online: false,
  },
];

// --- Chat Thread Item Component ---
const ChatThreadItem = ({ item, router }) => {
  const isUnread = item.unreadCount > 0;

  // Custom checkmark for read status
  const ReadIndicator = () => (
    <Text style={styles.readCheck}>{item.lastMessage.startsWith('✔') ? '✔ ' : ''}</Text>
  );

  return (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() => {
        // In a real app, this would navigate to the specific chat screen
        // router.push(`ChatDetail/${item.id}`); 
        console.log(`Opening chat with ${item.name}`);
      }}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
        {/* Online status indicator */}
        {item.online && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.chatContent}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text
          style={[styles.lastMessage, isUnread && styles.unreadMessage]}
          numberOfLines={1}
        >
          <ReadIndicator />
          {item.lastMessage.replace('✔ ', '')}
        </Text>
      </View>

      <View style={styles.chatMeta}>
        <Text style={[styles.chatTime, isUnread && styles.unreadTime]}>{item.time}</Text>
        {isUnread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const StudentChats = () => {
  const router = useRouter(); // Using useRouter from expo-router (assuming context)

  return (
    <SafeAreaView style={styles.container}>
      {/* Header/Search Bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor="#A0A0A0"
          />
          <TouchableOpacity style={styles.newChatButton}>
            <Text style={styles.newChatIcon}>✍️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={chatThreads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatThreadItem item={item} router={router} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default StudentChats;

const styles = StyleSheet.create({
  // --- Global/Container Styles ---
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Soft off-white background
  },

  // --- Header/Search Styles ---
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#EDEDED',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 18,
    color: '#A0A0A0',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A2E',
  },
  newChatButton: {
    paddingLeft: 10,
  },
  newChatIcon: {
    fontSize: 20,
  },

  // --- Chat List Styles ---
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  // --- Avatar and Status ---
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ECDC4', // Secondary vibrant accent (online status)
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  // --- Chat Content ---
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#1A1A2E',
  },
  readCheck: {
    fontSize: 14,
    color: '#A0A0A0', // Subtly gray checkmark
  },

  // --- Metadata (Time and Badge) ---
  chatMeta: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  chatTime: {
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 5,
  },
  unreadTime: {
    color: '#FF6B6B', // Highlight time for unread chats
    fontWeight: '700',
  },
  unreadBadge: {
    backgroundColor: '#FF6B6B', // Primary accent color
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  unreadCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});