import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import { Colors } from '../theme/colors';

const AnimatedToggle = ({ value, onValueChange, activeColor = Colors.accentIndigo }) => {
  const translateX = useRef(new Animated.Value(value ? 22 : 2)).current;
  const bgOpacity = useRef(new Animated.Value(value ? 1 : 0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? 22 : 2,
        useNativeDriver: false,
        tension: 80,
        friction: 8,
      }),
      Animated.timing(bgOpacity, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.95, useNativeDriver: false, tension: 200 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: false, tension: 200 }),
    ]).start();
    onValueChange && onValueChange(!value);
  };

  const bgColor = bgOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0.1)', activeColor],
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Animated.View style={[styles.track, { backgroundColor: bgColor, transform: [{ scale }] }]}>
        {value && (
          <View style={[styles.glow, { backgroundColor: activeColor }]} />
        )}
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              elevation: value ? 6 : 0,
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
    borderRadius: 14,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
});

export default AnimatedToggle;

