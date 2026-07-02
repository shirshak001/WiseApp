import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Animated, Dimensions, StatusBar, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const ringScale1 = useRef(new Animated.Value(0)).current;
  const ringScale2 = useRef(new Animated.Value(0)).current;
  const ringOpacity1 = useRef(new Animated.Value(0.6)).current;
  const ringOpacity2 = useRef(new Animated.Value(0.4)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const scanLineY = useRef(new Animated.Value(-height / 2)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: false }),
      Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: false }),
    ]).start();

    setTimeout(() => {
      const pulseRing = (scale, opacity, initOpacity) => {
        Animated.loop(
          Animated.sequence([
            Animated.parallel([
              Animated.timing(scale, { toValue: 1.8, duration: 2000, useNativeDriver: false }),
              Animated.timing(opacity, { toValue: 0, duration: 2000, useNativeDriver: false }),
            ]),
            Animated.parallel([
              Animated.timing(scale, { toValue: 0, duration: 0, useNativeDriver: false }),
              Animated.timing(opacity, { toValue: initOpacity, duration: 0, useNativeDriver: false }),
            ]),
          ])
        ).start();
      };
      pulseRing(ringScale1, ringOpacity1, 0.6);
      setTimeout(() => pulseRing(ringScale2, ringOpacity2, 0.4), 800);
    }, 300);

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 700, useNativeDriver: false }),
        Animated.spring(textTranslateY, { toValue: 0, tension: 60, useNativeDriver: false }),
      ]).start();
    }, 600);

    setTimeout(() => {
      Animated.timing(taglineOpacity, { toValue: 1, duration: 800, useNativeDriver: false }).start();
    }, 1100);

    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineY, { toValue: height / 2, duration: 2500, useNativeDriver: false }),
        Animated.timing(scanLineY, { toValue: -height / 2, duration: 0, useNativeDriver: false }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <LinearGradient
        colors={[Colors.bgPrimary, Colors.bgSecondary, '#0D1530']}
        style={StyleSheet.absoluteFill}
      />

      {/* Grid lines */}
      <View style={styles.gridOverlay} style={{ pointerEvents: "none" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={`vl${i}`} style={[styles.gridLineV, { left: `${(i / 12) * 100}%` }]} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={`hl${i}`} style={[styles.gridLineH, { top: `${(i / 20) * 100}%` }]} />
        ))}
      </View>

      {/* Scan line */}
      <Animated.View
        style={[styles.scanLine, { transform: [{ translateY: scanLineY }] }]}
        style={{ pointerEvents: "none" }}
      />

      {/* Pulse rings */}
      <View style={styles.ringContainer} style={{ pointerEvents: "none" }}>
        <Animated.View
          style={[
            styles.ring,
            { opacity: ringOpacity1, transform: [{ scale: ringScale1 }], borderColor: Colors.accentIndigo },
          ]}
        />
        <Animated.View
          style={[
            styles.ring,
            { opacity: ringOpacity2, transform: [{ scale: ringScale2 }], borderColor: Colors.accentPurple },
          ]}
        />
      </View>

      {/* Logo */}
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <LinearGradient colors={[Colors.accentIndigo, Colors.accentPurple]} style={styles.logoCircle}>
          <Text style={styles.logoIcon}>⬡</Text>
        </LinearGradient>
      </Animated.View>

      {/* Brand text */}
      <Animated.View style={[styles.textContainer, { opacity: textOpacity, transform: [{ translateY: textTranslateY }] }]}>
        <Text style={styles.brandName}>WISEGUARD</Text>
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          AI-NATIVE PRIVACY DEFENSE
        </Animated.Text>
      </Animated.View>

      {/* Loading bar */}
      <Animated.View style={[styles.loadingBar, { opacity: taglineOpacity }]}>
        <View style={styles.loadingTrack}>
          <LoadingProgress />
        </View>
      </Animated.View>
    </View>
  );
};

const LoadingProgress = () => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, { toValue: 1, duration: 2400, delay: 1000, useNativeDriver: false }).start();
  }, []);
  const widthAnim = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  return (
    <Animated.View style={[styles.loadingFill, { width: widthAnim }]}>
      <LinearGradient colors={[Colors.accentIndigo, Colors.accentPurple]} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgPrimary,
  },
  gridOverlay: { ...StyleSheet.absoluteFillObject },
  gridLineV: {
    position: 'absolute', top: 0, bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(99,102,241,0.08)',
  },
  gridLineH: {
    position: 'absolute', left: 0, right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(99,102,241,0.06)',
  },
  scanLine: {
    position: 'absolute', left: 0, right: 0,
    height: 2,
    backgroundColor: 'rgba(99,102,241,0.15)',
  },
  ringContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 140, height: 140,
    borderRadius: 70,
    borderWidth: 1.5,
  },
  logoContainer: { marginBottom: 32 },
  logoCircle: {
    width: 90, height: 90,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: { fontSize: 44, color: '#FFFFFF' },
  textContainer: { alignItems: 'center' },
  brandName: {
    fontSize: 34, fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 10,
  },
  tagline: {
    fontSize: 11, fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 4,
    marginTop: 8,
  },
  loadingBar: {
    position: 'absolute',
    bottom: 60, left: 48, right: 48,
  },
  loadingTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  loadingFill: {
    height: '100%',
    borderRadius: 1,
  },
});

export default SplashScreen;

