import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = -width * 0.3;

type Item = {
  id: number;
  text: string;
};



// const isEmpty = data.length === 0;

const initialData: Item[] = [
  // { id: 1, text: 'First Item' },
  // { id: 2, text: 'Second Item' },
  // { id: 3, text: 'Third Item' },
];

const SlideScreen2: React.FC = () => {
  const [data, setData] = useState<Item[]>(initialData);
  const [input, setInput] = useState('');

  const persistData = useCallback(async (items: Item[]) => {
    try {
      await AsyncStorage.setItem('todoList', JSON.stringify(items));
    } catch (e) {
      // handle error
    }
  }, []);

  const handleAdd = useCallback(async () => {
    if (!input.trim()) return;
    const newItem = { id: Date.now(), text: input.trim() };
    const newData = [...data, newItem];
    setData(newData);
    setInput('');
    persistData(newData);
  }, [input, data, persistData]);

  const handleDelete = useCallback(
    async (id: number) => {
      const newData = data.filter(item => item.id !== id);
      setData(newData);
      persistData(newData);
    },
    [data, persistData]
  );

  useEffect(() => {
  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem('todoList');
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch (e) {
      // handle error
    }
  };
  loadData();
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {data.map(item => (
          <SwipeableListItem key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ScrollView>
    </View>

      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Add new item"
        style={styles.input}
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add New Item</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

type SwipeableListItemProps = {
  item: Item;
  onDelete: (id: number) => void;
};

const SwipeableListItem: React.FC<SwipeableListItemProps> = ({ item, onDelete }) => {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withSpring(-width, {}, () => {
          runOnJS(onDelete)(item.id);
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.listItem, animatedStyle]}>
        <Text style={styles.itemText}>{item.text}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  listItem: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#e0e0e0',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },

  listContainer: {
    flex: 1,
    marginBottom: 100,
    paddingBottom: 100 // Reserve space for input area
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default SlideScreen2;