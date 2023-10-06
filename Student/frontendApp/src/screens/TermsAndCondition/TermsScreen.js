import { View, Text ,ScrollView,StyleSheet,Dimensions,Image} from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');
const TermsScreen = () => {
  return (
    <ScrollView style={styles.main}>
    <View style={styles.content}>

      <View style={styles.header}>
        <Text style={styles.txt}>Terms and Conditions for MindMatters:
           A Student Mental Health Assessment for St. Dominic Academy
        </Text>
      </View>
      <View>
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
      </View>
    </View>
</ScrollView>
  )
}
const styles = StyleSheet.create({
  main: {
    width:width,
    height:height,
    backgroundColor:'white',
  },
  content:{
      marginTop:20,
      width:'100%',
      height:'100%',
      padding:10,
      marginBottom:20
  },
  header:{
      alignItems:'center'
  },
  txt:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'500'
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

export default TermsScreen