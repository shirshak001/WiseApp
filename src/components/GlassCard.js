import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients } from '../theme/colors';

const GlassCard = ({ children, style, gradient = false, glowColor }) => {
  const borderColor = glowColor || Colors.borderCard;

  return (
    <View style={[styles.wrapper, { borderColor }, style]}>
      {gradient ? (
        <LinearGradient
          colors={Gradients.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.inner}
        >
          {children}
        </LinearGradient>
      ) : (
        <View style={styles.inner}>{children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  inner: {
    backgroundColor: Colors.bgCard,
    padding: 16,
  },
});

export default GlassCard;

