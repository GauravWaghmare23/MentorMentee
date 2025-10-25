import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data for suggested tags
const suggestedTags = [
  '#CollegeLife',
  '#Hackathon',
  '#CampusEvent',
  '#StudyTips',
  '#SportsMeet',
  '#QOTD',
  '#Photography',
  '#GuestLecture',
];

const StudentPostAdd = () => {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to simulate image picking (replace with ImagePicker in a real app)
  const handleImagePick = () => {
    // In a real app, you'd use a library like expo-image-picker
    // For now, we'll use a placeholder image
    setSelectedImage('https://source.unsplash.com/800x600/?abstract,design');
  };

  // Function to add a tag to the description
  const handleTagPress = (tag) => {
    setDescription(prev => (prev + ' ' + tag).trim());
  };

  const handlePost = () => {
    console.log('Posting:', { description, selectedImage });
    // Add logic for API call and navigation back to feed
    // router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Minimal Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.headerActionText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity
          onPress={handlePost}
          style={styles.postButton}
          disabled={!description.trim() && !selectedImage}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>

        {/* --- Image Selection Area --- */}
        <TouchableOpacity style={styles.imagePlaceholder} onPress={handleImagePick}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <>
              <Text style={styles.imageIcon}>🖼️</Text>
              <Text style={styles.imageText}>Tap to Add Photo/Video</Text>
            </>
          )}
        </TouchableOpacity>

        {/* --- Description Input --- */}
        <TextInput
          style={styles.descriptionInput}
          placeholder="Write a captivating description..."
          placeholderTextColor="#A0A0A0"
          multiline
          value={description}
          onChangeText={setDescription}
          maxLength={500}
        />

        {/* --- Suggested Tags/Topics --- */}
        <Text style={styles.tagsTitle}>Quick Tags & Topics:</Text>
        <View style={styles.tagsContainer}>
          {suggestedTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.tagBadge}
              onPress={() => handleTagPress(tag)}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- Bottom Details (Optional) --- */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Location</Text>
          <Text style={styles.settingValue}>Add Location...</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Tag Students</Text>
          <Text style={styles.settingValue}>@_</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentPostAdd;

const styles = StyleSheet.create({
  // --- Global/Container Styles ---
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Clean white background
  },

  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  headerActionText: {
    fontSize: 16,
    color: '#505050',
  },
  postButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: '#FF6B6B', // Accent color
    borderRadius: 8,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  backButton: {
    paddingRight: 10,
  },

  // --- Content Styles ---
  contentContainer: {
    padding: 16,
  },

  // Image Placeholder
  imagePlaceholder: {
    width: '100%',
    height: width * 0.5, // Responsive height
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  imageIcon: {
    fontSize: 40,
    color: '#A0A0A0',
  },
  imageText: {
    fontSize: 16,
    color: '#A0A0A0',
    marginTop: 5,
    fontWeight: '600',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },

  // Description Input
  descriptionInput: {
    minHeight: 100,
    fontSize: 16,
    color: '#1A1A2E',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingBottom: 10,
    paddingTop: 0,
    marginBottom: 15,
  },

  // Suggested Tags
  tagsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tagBadge: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tagText: {
    fontSize: 14,
    color: '#505050',
    fontWeight: '600',
  },

  // Other Settings
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEEEEE',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  settingValue: {
    fontSize: 16,
    color: '#FF6B6B',
  }
});