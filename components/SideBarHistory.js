import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const SideBarHistory = ({ onClose }) => {
  const screenWidth = Dimensions.get('window').width;
  const slideAnim = useRef(new Animated.Value(-screenWidth * 0.7)).current; // Adjusted for 70% width
  const [expandedItemId, setExpandedItemId] = useState(null); // State to track expanded item

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth * 0.7,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onClose();
    });
  };

  // Updated diagnoses data with subtitles and dates
  const diagnoses = [
    {
      id: 1,
      subtitle: 'Common Cold',
      date: 'Sep 15, 2023',
      brief: 'Common cold symptoms include sneezing, runny nose...',
      full:
        'Common cold symptoms include sneezing, runny nose, sore throat, coughing, and mild fever. It is usually caused by a viral infection and resolves on its own within a week.',
    },
    {
      id: 2,
      subtitle: 'Influenza',
      date: 'Aug 28, 2023',
      brief: 'Influenza presents with high fever, muscle aches...',
      full:
        'Influenza presents with high fever, muscle aches, chills, fatigue, and dry cough. It is more severe than the common cold and may require antiviral medication.',
    },
    {
      id: 3,
      subtitle: 'Allergic Rhinitis',
      date: 'Jul 12, 2023',
      brief: 'Allergic rhinitis causes itchy eyes, nasal congestion...',
      full:
        'Allergic rhinitis causes itchy eyes, nasal congestion, sneezing, and runny nose due to allergens like pollen, dust, or pet dander. Treatment includes antihistamines and avoiding triggers.',
    },
    // Add more diagnoses as needed
  ];

  const toggleItemExpansion = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  return (
    <>
      {/* Overlay */}
      <TouchableOpacity style={styles.overlay} onPress={handleClose} />

      {/* Sidebar */}
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        {/* Sidebar Content */}
        <View style={styles.content}>
          {/* Header with Title and Close Button */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <MaterialCommunityIcons
                name="history"
                size={28}
                color="white"
                style={styles.headerIcon}
              />
              <Text style={styles.headerText}>History</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>

          {/* Diagnoses List */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {diagnoses.map((item) => (
              <View key={item.id} style={styles.diagnosisItem}>
                {/* Subtitle and Date */}
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                {/* Brief Description and Expand Icon */}
                <View style={styles.diagnosisHeader}>
                  <Text style={styles.diagnosisBrief}>{item.brief}</Text>
                  <TouchableOpacity
                    onPress={() => toggleItemExpansion(item.id)}
                    style={styles.expandButton}
                  >
                    <Entypo
                      name={
                        expandedItemId === item.id ? 'chevron-up' : 'chevron-down'
                      }
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
                {/* Full Description */}
                {expandedItemId === item.id && (
                  <View style={styles.fullDescriptionContainer}>
                    <Text style={styles.fullDescriptionText}>{item.full}</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%', // Updated width to 70%
    height: '100%',
    backgroundColor: '#18181b',
    borderTopRightRadius: 20, // Rounded top-right corner
    borderBottomRightRadius: 20, // Rounded bottom-right corner
    overflow: 'hidden', // Ensure content stays within rounded corners
    borderRightWidth: 2, // Cream-colored border
    borderColor: '#fffdd0', // Cream color
    zIndex: 1000,
  },
  content: {
    flex: 1,
    paddingTop: 60, // Increased padding at the top
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items horizontally
    marginBottom: 30,
    backgroundColor: '#1f1f23', // Slightly lighter background for the header
    borderRadius: 15, // Rounded corners for the header box
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#fffdd0', // Cream border for the header
    shadowColor: '#000', // Shadow for a professional look
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    fontFamily:
      Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'Roboto-Medium',
  },
  closeButton: {
    // No additional styles needed
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: '70%', // Adjusted to match sidebar width
    width: '30%', // Remaining screen width
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 900,
  },
  diagnosisItem: {
    marginBottom: 20,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)', // Slightly darker text
    fontSize: 14, // Smaller font size
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
  },
  date: {
    color: 'rgba(255, 255, 255, 0.7)', // Same color as subtitle
    fontSize: 14, // Same font size as subtitle
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
  },
  diagnosisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5, // Added margin for spacing
  },
  diagnosisBrief: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
  },
  expandButton: {
    padding: 5,
  },
  fullDescriptionContainer: {
    marginTop: 10,
    backgroundColor: '#1f1f23',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#fffdd0', // Cream border
  },
  fullDescriptionText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
  },
});

export default SideBarHistory;