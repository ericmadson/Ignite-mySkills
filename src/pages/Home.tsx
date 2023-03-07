import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillDataProps {
  id: string;
  name: string;
}

export default function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillDataProps[]>([]);
  const [greeting, setGreeting] = useState('');

  /* Use handle to name functions when the function is triggered by user's interaction */
  function handleAddNewSkill() {
    const data = {id: String(new Date().getTime()), name: newSkill};
    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(skill => skill.id !== id));
  }

  useEffect(() => {
    const currentHours = new Date().getHours();

    if (currentHours < 12) {
      setGreeting('Good Morning');
    } else if(currentHours >=12 && currentHours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Night');
    }
  }, [])

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Welcome, Eric</Text>

      <Text style={styles.greetings}>{greeting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button title='Add' onPress={handleAddNewSkill} />

      <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>

      {/* FlatList is utilized when the array is extense, whereas in case of short arrays, ScrollView is more suitable */}
      <FlatList
        data={mySkills}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: '#fff',
  },
});
