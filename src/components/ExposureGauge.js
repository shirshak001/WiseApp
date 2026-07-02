import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors } from '../theme/colors';

const ExposureGauge = ({ score = 13, size = 200 }) => {
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const [displayScore, setDisplayScore] = useState(0);
  const [arcOffset, setArcOffset] = useState(circumference);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800;
    const delay = 400;

    const timer = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - delay;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentScore = Math.round(eased * score);
        const targetOffset = circumference - (eased * score / 100) * (circumference * 0.85);

        setDisplayScore(currentScore);
        setArcOffset(targetOffset);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = () => {
    if (score <= 30) return Colors.success;
    if (score <= 60) return Colors.warning;
    return Colors.critical;
  };

  const cx = size / 2;
  const cy = size / 2;
  const scoreColor = getScoreColor();

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={Colors.accentIndigo} />
            <Stop offset="100%" stopColor={Colors.accentPurple} />
          </LinearGradient>
        </Defs>
        {/* Background track */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.15}
          transform={`rotate(135 ${cx} ${cy})`}
        />
        {/* Animated arc - driven by JS state */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="url(#gaugeGrad)"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={arcOffset}
          transform={`rotate(135 ${cx} ${cy})`}
        />
      </Svg>
      <View style={styles.centerContent}>
        <Text style={[styles.score, { color: scoreColor }]}>{displayScore}</Text>
        <Text style={styles.label}>EXPOSURE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 52,
    fontWeight: '700',
    letterSpacing: -2,
    color: Colors.textPrimary,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 4,
    color: Colors.textMuted,
    marginTop: 2,
  },
});

export default ExposureGauge;
