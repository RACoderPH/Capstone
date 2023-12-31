import { View,
  Text ,
  StyleSheet,
 ScrollView,
 ToastAndroid,
 TouchableOpacity,
 Dimensions,
 KeyboardAvoidingView,
 Alert,
 ActivityIndicator
} from 'react-native'
import Logo from '../../../assets/images/Mindmatters.png'
import React, {useState} from 'react'
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox, Modal, Portal,Button, PaperProvider } from 'react-native-paper';

 const {width,height} = Dimensions.get('window');
const SignUpScreen = () => {
  //Input Variable
  const [Fullname, setFullname] = useState('');
   const [Username, setUsername] = useState('');
   const [Email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [Cpassword, setCPassword] = useState('');
   const [StudID, setStudID] = useState('');
   const [phone,setPhone] = useState('');
   const [grade,setGrade] = useState('');
   const [section,setSection] = useState('');
  //End

   const navigation = useNavigation();
   const [isSubmitted,setIsSubmitted] = useState(false);
   const [checked, setChecked] = React.useState(false);
   const [isLoading, setIsLoading] = useState(false); 

   const [visible, setVisible] = React.useState(false);

   const showModal = () => setVisible(true);
   const hideModal = () => setVisible(false);
   const containerStyle = {backgroundColor: 'white', width:'90%',height:'80%' ,padding: 11,margin:20,alignItems:'center',borderRadius:10};


   const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const isPasswordStrong = (password) => {
    // Define your password strength criteria (e.g., at least 8 characters, including numbers, uppercase, and lowercase letters)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
  
  const isPhoneNumberValid = (phone) => {
    //Validate that the phone number has a length of 11
    return phone.length === 11;
  };
  
   //BTN Function
   const onSignInPressed = () => {
    if (Fullname.trim() === '' ||Username.trim() === '' || StudID.trim() === '' || phone.trim() === '' || grade.trim() === '' || section.trim() === '' ||Email.trim() === '' || password.trim() === '' || checked === false) {
      ToastAndroid.show('Fields must not be empty', ToastAndroid.SHORT);
      return;
    }
  
    if (!isEmailValid(Email)) {
      Alert.alert('Mind Matters', 'Please enter a valid email address');
      return;
    }
  
    if (!isPasswordStrong(password)) {
      Alert.alert('Mind Matters', 'Password is not strong enough');
      return;
    }
  
    if (!isPhoneNumberValid(phone)) {
      Alert.alert('Mind Matters', 'Phone number must be 11 characters');
      return;
    }
  
    if (password !== Cpassword) {
      Alert.alert('Mind Matters', 'Password not the same');
    } else {
      setIsLoading(true);

      axios
        .post('https://mindmatters-ejmd.onrender.com/register/app', {
          fullname: Fullname,
          username: Username,
          email: Email,
          password: password,
          stud_no: StudID,
          phone: phone,
          grade: grade,
          section: section,
        })
        .then((response) => {
          setIsLoading(false);
          console.log(response.data.message);
          if (response.data.message === 'Username already exists') {
            Alert.alert('Mind Matters', 'User Already Exists');
          } else if (response.data.message === 'Email already exists') {
            Alert.alert('Mind Matters', 'Email Already Exists');
          } else if (response.data.message === 'User registered successfully') {
            AsyncStorage.setItem('username', Username);
            ToastAndroid.show('Registered Successfully', ToastAndroid.SHORT);
            setIsSubmitted(true);
            navigation.navigate('verify');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };



   const onCreate = () =>{
     navigation.navigate('SignIn');
   };
    // Function to handle the "Agreed" button press
  const onAgreedPressed = () => {
    setChecked(true); // Update the checkbox state to checked
    hideModal(); // Close the modal after agreeing
  };

 
 return (
   <KeyboardAvoidingView style={{flex:1}}
   behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior as needed
   keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} >
   <ScrollView style={{height:height,backgroundColor:'white'}}>
   <View style={styles.root}>
   <View style={styles.circle} />
   <View style={styles.circle2} />
   <Text style={styles.title}>Sign Up</Text>
   {isLoading && (
        <View
          style={{
            position: 'absolute',
            width: width,
            height: '100%',
            justifyContent: 'center',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Transparent background
          }}
        >
          <ActivityIndicator
            size="large"
            color="#FBD148"
            style={{ marginTop: 20 }}
          />
        </View>
      )}
   <CustomInputs 
   onChangeText={(e) => setFullname(e)}
    mode="outlined"
    label="Fullname"
    placeholder="Enter Fullname"
  />

   <CustomInputs 
   onChangeText={(e) => setUsername(e)}
    mode="outlined"
    label="Username"
    placeholder="Enter Username"
  />
<CustomInputs 
   onChangeText={(e) => setEmail(e)}
    mode="outlined"
    label="Email"
    placeholder="Enter Email"
  />
  <CustomInputs 
     onChangeText={(e) => setStudID(e)}
    mode="outlined"
    label="Student ID"
    inputMode="numeric"
    placeholder="Enter Student ID"
  />
   <CustomInputs 
    onChangeText={(e) => setPhone(e)}
    mode="outlined"
    label="Phone"
    inputMode="numeric"
    placeholder="Contact Number"
    maxLength={11}
  />
<View style={{ flexDirection: 'row', width: '50%',justifyContent:'center',alignItems:'center' }}>
  <CustomInputs
    onChangeText={(e) => setGrade(e)}
    mode="outlined"
    label="Grade"
    inputMode="numeric"
    placeholder="Grade Level"
    style={{ width: 40 }}
  />
  <CustomInputs
    onChangeText={(e) => setSection(e)}
    mode="outlined"
    label="Section"
    placeholder="Section"
    style={{ width: 40 }}
  />
</View>


<CustomInputs
   onChangeText={(e) => setPassword(e)}
    mode="outlined"
    label="Password"
    placeholder="Enter Password"
    secureTextEntry={true}/>
<CustomInputs
    onChangeText={(e) => setCPassword(e)}
    mode="outlined"
    label="Confirm Password"
    placeholder="Enter Confirm Password"
    secureTextEntry={true}/>    
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
 <Checkbox
   status={checked ? 'checked' : 'unchecked'}
   onPress={() => {
     setChecked(!checked);
   }}
 />
 <Text style={{ fontSize: 15, marginLeft: 8 }} onPress={showModal}>I've read and agree to the Terms & Conditions and Privacy Policy</Text>
</View>
<TouchableOpacity onPress={onSignInPressed} disabled={isSubmitted}>
<CustomButton 
     style={styles.btn}
     mode="elevated" 
     text="Register"
     labelStyle={{ color: 'white' ,fontWeight:'bold',fontSize:20}}
     />
     </TouchableOpacity>
     <Text style={styles.text}>Already have an account?<Text style={{color:'#59C4CB'}} onPress={onCreate}> Sign In</Text></Text>
 </View>
   </ScrollView>
   <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
       {/* Wrap the content with a ScrollView */}
       <ScrollView >
         <Text style={styles.text}>Terms and Conditions for MindMatters: A Student Mental Health Assessment for St. Dominic Academy</Text>
         {/* Add your scrollable content here */}

         <Text style={styles.terms}>
         1. Acceptance of Terms
         </Text>
         <Text style={styles.other}>
         By downloading, installing, or using MindMatters App, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these Terms, please do not use the App.
         </Text>
         {/*2*/}
         <Text style={styles.terms}>
         2. Use of the App
         </Text>
         <Text style={styles.other}>
         The MindMatters App is intended for informational and educational purposes related to mental health. It is not a substitute for professional advice or treatment. Always seek the advice of qualified mental health professionals for any mental health concerns.
         </Text>
           {/*3*/}
         <Text style={styles.terms}>
         3. Privacy
         </Text>
         <Text style={styles.other}>
         We respect your privacy. Please refer to our Privacy Policy for information on how we collect, use, and protect your personal data.
         </Text>
           {/*4*/}
         <Text style={styles.terms}>
         4. User Content
         </Text>
         <Text style={styles.other}>
         4.1. You may have the opportunity to submit various forms of user-generated content within the App, including but not limited to self-assessment data, personal diary entries, records of breathing techniques, and chat interactions.
         </Text>
         <Text style={styles.other}>
         4.2. We do not claim ownership of your User Content, and you have the right to delete or modify it at any time.
         </Text>
           {/*5*/}
         <Text style={styles.terms}>
         5. Prohibited Activities
         </Text>
         <Text style={styles.other}>
         5.1. You agree not to engage in any of the following activities when using the App:
         
       - Attempt to access, modify, or hack the App's systems or servers.

       - Distribute or promote harmful or malicious content.

       - Violate any applicable laws or regulations.
         </Text>
            {/*6*/}
         <Text style={styles.terms}>
         6. Termination
         </Text>
         <Text style={styles.other}>
         We reserve the right to terminate or suspend your access to the App at our discretion, without notice, for any reason, including if we believe you have violated these Terms.
         </Text>
          {/*7*/}
         <Text style={styles.terms}>
         7. Disclaimers and Limitation of Liability
         </Text>
         <Text style={styles.other}>
         7.1. The App is provided "as is" without any warranties, express or implied.
         </Text>
         <Text style={styles.other}>
         7.2. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the App.
         </Text>
          {/*8*/}
         <Text style={styles.terms}>
         8. Changes to Terms
         </Text>
         <Text style={styles.other}>
         We may update these Terms from time to time. It is your responsibility to review them periodically. Your continued use of the App after any changes indicate your acceptance of the revised Terms.
         </Text>
          {/*9*/}
         <Text style={styles.terms}>
         9. Contact Information
         </Text>
         <Text style={styles.other}>
         If you have any questions or concerns about these Terms, please contact us at [mindmatters@gmail.com]
         </Text>

         <TouchableOpacity onPress={onAgreedPressed}>
          <CustomButton text="Agreed" style={{ width: '100%' }} />
        </TouchableOpacity>
         {/* Add more content as needed */}
       </ScrollView>
     </Modal>
   </KeyboardAvoidingView>
  
 )
}
const styles = StyleSheet.create({
   root:{
       alignItems:'center',
       padding: 20,
   },
   circle: {
     position: 'absolute',
     top: -150,
     right: -50,
     width: 224,
     height: 216,
     borderRadius: 110,
     backgroundColor: 'rgba(241, 204, 74, 0.45)',  // Adjust the color of the circle as desired
   },
   circle2: {
     position: 'absolute',
     top: -50,
     right: -100,
     width: 224,
     height: 216,
     borderRadius: 110,
     backgroundColor: 'rgba(241, 204, 74, 0.45)',  // Adjust the color of the circle as desired
   },
   text:{
   fontFamily:'poppins',
   color:'black',
   fontSize:14,
   letterSpacing:1.2,
   },
   title:{
       fontFamily:'sans-serif',
       fontSize:35,
       letterSpacing:1.5,
       marginVertical:15,
       fontWeight:'600',
       color:'black',
       margin:10,
   },
   btn:{
       marginVertical:20,
   },
   terms:{
       fontSize:16,
       fontWeight:'700',
       padding:2,
   },
   other:{
     padding:3,
     fontSize:14,
     fontWeight:'400'
   }
});

export default SignUpScreen