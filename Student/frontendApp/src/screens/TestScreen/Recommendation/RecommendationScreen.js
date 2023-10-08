import { View, 
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton/CustomButton';
const { width,height } = Dimensions.get('window');

const RecommendationScreen = () => {

  const [userStress, setUserStress] = useState(0);
  const [userAnxiety, setUserAnxiety] = useState(0);
  const [id,setID] = useState();
  const [userDepression, setUserDepression] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('id');
          setID(userId);
        // Fetch Stress data
        const stressResponse = await fetch(`https://mindmatters-ejmd.onrender.com/stress/${userId}`);
        if (stressResponse.ok) {
          const stressData = await stressResponse.json();
          setUserStress(parseInt(stressData[0]?.total_stress_value) || 0);
        }

        // Fetch Anxiety data
        const anxietyResponse = await fetch(`https://mindmatters-ejmd.onrender.com/anxiety/${userId}`);
        if (anxietyResponse.ok) {
          const anxietyData = await anxietyResponse.json();
          setUserAnxiety(parseInt(anxietyData[0]?.total_anxiety_value) || 0);
        }

        // Fetch Depression data
        const depressionResponse = await fetch(`https://mindmatters-ejmd.onrender.com/depression/${userId}`);
        if (depressionResponse.ok) {
          const depressionData = await depressionResponse.json();
          setUserDepression(parseInt(depressionData[0]?.total_depress_value) || 0);
        }

        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setIsLoading(false); // Set loading to false even on error
      }
    };

    fetchUserData();
  }, []);
  const Homepage = () =>{
    navigation.navigate('Homes');
  };
  return (
    <ScrollView style={{width:width,height:height,backgroundColor: 'white'}}>
      <View style={{ flex: 1 }}>
        <View style={styles.boxContainer}>
          <Text style={styles.text}>Recommendations</Text>
          <Text style={styles.text}>Depression</Text>
          <Text style={styles.contentText}>
          {userDepression >= 28
      ? "1. Call some professional to lessen your depression.\n2. Stay where you are: stay where you are to avoid suicidal\n3. Don’t let you’ll be alone so you can talk to someone and avoid the worst\n4. Medicate: you can use sleeping pills so you can avoid suicidal Be positive so you can control your self and be safe\n5. Think positive: don’t think about suicidal and relax your self"
      : userDepression >= 21
      ? '1. Meditation: Starting a regular habit of meditation can help us to improve concentration, reduce stress & anxiety, alleviate depression and generally improve our mental health \n2. Call someone: call someone that can help you\n3. Watch something: watch you favorite video so it can help you less your depression\n4. Be with your favorite person: so you can be comfortable and be calm\n5. Relaxing place: go somewhere to have unwind with someone'
      : userDepression >= 14
      ? '1. Reach out to a licensed therapist, psychiatrist, or counselor who specializes in treating depression. They can provide an accurate diagnosis and create a personalized treatment plan.\n2. Antidepressant medications can help regulate brain chemicals and alleviate symptoms. Always consult a medical professional before starting or discontinuing any medication.\n3. Dialectical-Behavior Therapy (DBT), or Interpersonal Therapy (IPT), can be effective in treating depression. Regular sessions with a therapist can help individuals address underlying issues and develop coping strategies.\n4.  Physical activity, in particular, can stimulate the release of endorphins, which can improve mood.\n5. You may also consider joining a support group for individuals experiencing depression. Having a strong support system can provide a sense of belonging and understanding.'
      : userDepression >= 10
      ? '1. Breathing exercise: practice breathing exercise\n2.	Have a good circle of friends: to communicate what you feel\n3.	Communicate with relatives: communicate with the relatives that you feel comfortable\n4. Have a complete sleep: sleep 8hrs a day to be feel good a day\n5. Do what you want: to be calm '
      : userDepression >= 0
      ? `1. Avoid thinking negatively about yourself.\n2. Communicate: Always talk to family and friends.\n3. Practice healthy routine: healthy routine everyday and exercise to have a peaceful mind\n4. Healthy lifestyle: eat healthy and regularly and have a water therapy.\n5. Avoid bad habit: avoid drinking alcohol And cigarettes.`
      : ''}
          </Text>
          <Text style={styles.text}>Anxiety</Text>
          <Text style={styles.contentText}>
          {userAnxiety >= 20
      ? '1. Contact emergency services or visit an emergency room if anxiety poses an immediate danger to your well-being.\n2. Admit yourself to a psychiatric hospital for intensive care and stabilization.\n3. Work closely with a multidisciplinary treatment team, including psychiatrists, therapists, and nurses.\n4. Focus on building a strong support system and consider group therapy for peer support.\n5. Follow through with all prescribed treatments and therapies, even after discharge, to prevent relapse.'
      : userAnxiety >= 15
      ? '1. Consult with a psychiatrist for medication management and evaluation of your condition.\n2. Participate in intensive therapy programs, possibly in a partial hospitalization or intensive outpatient setting.\n3. Create a crisis plan for managing severe anxiety episodes, including emergency contacts.\n4. Explore holistic approaches like yoga, acupuncture, or aromatherapy alongside conventional treatment.\n5. Consider involving family members in therapy or seeking family therapy to address potential triggers.'
      : userAnxiety >= 10
      ? '1. Seek therapy from a licensed mental health professional, such as cognitive-behavioral therapy (CBT) or exposure therapy.\n2. Discuss the possibility of medication with a psychiatrist if recommended.\n3. Develop a structured daily routine to provide stability and reduce uncertainty.\n4. Engage in regular physical activity to release pent-up tension and improve mood.\n5. Build a support network of friends, family, and support groups to share experiences and coping strategies.'
      : userAnxiety >= 8
      ? '1. Consider self-help resources like books or apps that offer anxiety-reducing techniques.\n2. Talk to a friend or family member about your feelings to gain support and perspective.\n3. Explore relaxation exercises and implement them into your daily routine.\n4. Identify triggers and work on strategies to manage specific anxiety-inducing situations.\n5. Consider counseling or therapy for additional guidance and coping skills.'
      : userAnxiety >= 0
      ? `1. Practice stress management techniques like deep breathing, progressive muscle relaxation, or mindfulness meditation. \n2. Maintain a regular exercise routine to help reduce anxiety symptoms.\n3. Develop healthy sleep habits to ensure you're well-rested.\n4. Limit caffeine and alcohol intake, as they can exacerbate anxiety.\n5. Engage in enjoyable hobbies and activities to distract from anxious thoughts.`
      : ''}
          </Text>

          <Text style={styles.text}>Stress</Text>
          <Text style={styles.contentText}>
          {userStress >= 34
      ? '1. If you need assistance dont hesitate to reach out to a mental health crisis hotline or emergency services.\n 2. If recommended by a health professional consider admitting yourself to a hospital or treatment facility where you can receive comprehensive care.\n3. Its crucial to comply with medications and attend all therapy sessions as directed by your healthcare team.\n4. Collaborating closely, with your treatment team—including psychiatrists, therapists and support workers—can greatly contribute to your recovery journey.Make sure to prioritize your long term goals, for recovery and make any adjustments, to your lifestyle to support your well being.'
      : userStress >= 26
      ? '1. Prioritize your safety if youre having thoughts of self harm or suicide; reach out for help from a crisis helpline. Visit an emergency room.\n 2. Consider starting intensive therapy, which could involve participating in an inpatient or outpatient treatment program.\n3. Make sure to follow your prescribed medication regimen and attend regular appointments with mental health professionals.\n 4. Involving family members in the treatment process and considering family therapy may be valuable.\n 5. Exploring holistic approaches such as yoga, meditation or art therapy can complement treatments.'
      : userStress >= 19
      ? '1. It would be helpful to seek guidance, from a health expert who can conduct a thorough evaluation and create a personalized treatment plan.\n2. If recommended you might want to discuss the possibility of using medication with a psychiatrist.\n3. Engaging in therapy sessions like cognitive behavioral therapy (CBT) or dialectical behavior therapy (DBT) can address issues.\n4. Building a support network and openly communicating your needs to friends and family is important.\n5. Creating a routine that includes self care practices, exercise and stress management techniques can be beneficial.'
      : userStress >= 15
      ? '1.	Deep Breathing: Practice deep breathing exercises when you feel stressed.\n2.	Hobbies and Relaxation: Engage in hobbies and relaxation techniques to divert your focus.\n3.	Limit Caffeine and Alcohol: Reduce or eliminate caffeine and alcohol intake.\n4.	Limit Screen Time: Set boundaries on screen time to prevent information overload.\n5.	Gratitude Journaling: Write down things youre grateful for to shift your perspective.'
      : userStress >= 0
      ? `1. Self-Care: Prioritize self-care by getting enough sleep, eating well, and staying hydrated.\n2. Exercise Regularly: Engage in regular physical activity to release endorphins and reduce stress.\n3. Practice Mindfulness: Incorporate mindfulness or meditation into your daily routine to stay grounded.\n4. Time Management: Organize your tasks and set achievable goals to prevent feeling overwhelmed.\n5. Healthy Social Connections: Maintain a strong support network by talking to friends and family about your`
      : ''}
          </Text>
          {/* Repeat this pattern for other sections */}
          <TouchableOpacity onPress={Homepage}>
          <CustomButton text={'Next'}/>
          </TouchableOpacity>
        </View>
       
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    width: width,
    borderWidth: 0.2,
    borderColor: '#FFFBEB',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    backgroundColor: '#ECF9FF',
  },
  text: {
    fontSize: 25,
    color: '#161a1d',
    fontWeight: '600',
    marginTop: 10,
  },
  contentText: {
    color: '#161a1d',
    fontSize: 16,
    textAlign: 'justify',
    fontWeight: 'bold',
    padding: 15,
  },
})
export default RecommendationScreen