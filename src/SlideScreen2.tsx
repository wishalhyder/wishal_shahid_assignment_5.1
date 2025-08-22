import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
// import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = -width * 0.3;

type Item = {
  id: number;
  text: string;
};

const initialData: Item[] = [
  { id: 1, text: 'First Item' },
  { id: 2, text: 'Second Item' },
  { id: 3, text: 'Third Item' },
];

const SlideScreen2: React.FC = () => {
  const [data, setData] = useState<Item[]>(initialData);

  const handleDelete = (id: number) => {
    setData(items => items.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {data.map(item => (
        <SwipeableListItem key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </View>
  );
};

type SwipeableListItemProps = {
  item: Item;
  onDelete: (id: number) => void;
};

const SwipeableListItem: React.FC<SwipeableListItemProps> = ({ item, onDelete }) => {
  const translateX = useSharedValue(0);

  // const gestureHandler = useAnimatedGestureHandler({
  //   onStart: (_, ctx: any) => {
  //     ctx.startX = translateX.value;
  //   },
  //   onActive: (event, ctx: any) => {
  //     translateX.value = ctx.startX + event.translationX;
  //   },
  //   onEnd: () => {
  //     if (translateX.value < SWIPE_THRESHOLD) {
  //       translateX.value = withSpring(-width, {}, () => {
  //         runOnJS(onDelete)(item.id);
  //       });
  //     } else {
  //       translateX.value = withSpring(0);
  //     }
  //   },
  // });

  const panGesture = Gesture.Pan()
      .onStart(() => {
        // No context needed
      })
      .onUpdate((event) => {
        translateX.value = event.translationX;
      })
      .onEnd(() => {
        if (translateX.value > width / 3) {
          translateX.value = withSpring(width);
        } else if (translateX.value < -width / 3) {
          translateX.value = withSpring(-width);
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
});

export default SlideScreen2;