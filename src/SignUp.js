import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export function SignUp() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    // Check if email field is filled
    if (!email) {
      Alert.alert('Sign Up', 'Please enter your email address!');
      return;
    }
   
    setLoading(true); // Show loading indicator

    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setLoading(false); // Hide loading indicator

      if (!response.ok) {
        Alert.alert('Sign Up', data.error || 'Registration Failed');
      } else {
        // Navigate to verification screen
        setLoading(false);
        navigation.navigate('Home', { email });
      }
    } catch (error) {
      setLoading(false); // Hide loading indicator
      Alert.alert('Error', 'An error occurred during registration.');
      console.error('Registration error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {/* SignUp Image */}
      <View style={styles.imageContainer}>
        <LottieView
          style={{ width: 200, height: 180 }}
          source={require('../assets/Syringe.json')}
          autoPlay
          loop
        />
      </View>
      <View style={styles.contentContainer}>
        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Octicons name="mail" size={hp(2.7)} color="gray" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={'gray'}
            />
          </View>

          <View>
            {loading ? (
              <View style={styles.loadingContainer}>
                {/* You can include a loading indicator here if you have one */}
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            ) : (
              <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Sign in text */}
          <View style={styles.signInPrompt}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// Stylesheet for styling components
const styles = StyleSheet.create({
  // Styles for the main container
  container: {
    paddingTop: hp(7),
    paddingHorizontal: wp(5),
    flex: 1,
    gap: 12,
  },
  // Styles for the image container
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Styles for the content container
  contentContainer: {
    flex: 4,
    gap: 5,
  },
  // Styles for the title text
  title: {
    fontSize: hp(4),
    top: 35,
    fontWeight: 'bold',
    letterSpacing: 1.5, // Add letter spacing
    textAlign: 'center',
    color: '#333', // Dark gray color
  },
  // Styles for the container holding the input fields
  inputContainer: {
    gap: 4,
  },
  // Styles for each input row
  inputRow: {
    height: hp(7),
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0', // Light gray background
    alignItems: 'center',
    borderRadius: 30, // Rounded corners
  },
  // Styles for the input fields themselves
  input: {
    fontSize: hp(2),
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  // Loading Container (when loading is true)
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loadingText: {
    fontSize: hp(2),
    color: '#333',
  },
  // Sign Up Button
  signUpButton: {
    height: hp(6.5),
    backgroundColor: '#e7c8A0', // Customize your button color
    borderRadius: 20, // Slightly rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  // Button Text
  buttonText: {
    fontSize: hp(2.7),
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1.2, // Slightly wider letter spacing
  },
  // Sign In Prompt
  signInPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  signInText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#6b7280', // Neutral-500
  },
  signInLink: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#e7c8A0', // Customize your link color
  },
});

export default SignUp;