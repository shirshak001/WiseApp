import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity,
  Animated, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    icon: 'scan-outline',
    badge: 'AUTONOMOUS SCRUTINY',
    title: 'See Every\nShadow',
    subtitle: 'Continuous scanning across 250+ data broker databases and dark web marketplaces. Know your exposure before attackers do.',
    accent: Colors.accentIndigo,
  },
  {
    id: 2,
    icon: 'flash-outline',
    badge: 'ACTIVE INTERCEPTION',
    title: 'Block Before\nImpact',
    subtitle: 'Lumen AI screens every call. Stealth routing hides your digital footprint. Email aliases absorb phishing attempts.',
    accent: Colors.accentPurple,
  },
  {
    id: 3,
    icon: 'shield-checkmark-outline',
    badge: 'AUTOMATED REMEDIATION',
    title: 'Erase Your\nFootprint',
    subtitle: 'Legal takedown requests sent automatically to data brokers. Your Exposure Score drops while you sleep.',
    accent: Colors.success,
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const dotScale = useRef(slides.map((_, i) => new Animated.Value(i === 0 ? 1 : 0.6))).current;

  const goTo = (index) => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: -index * width,
        tension: 70,
        friction: 12,
        useNativeDriver: false,
      }),
      ...slides.map((_, i) =>
        Animated.spring(dotScale[i], {
          toValue: i === index ? 1 : 0.6,
          tension: 100,
          useNativeDriver: false,
        })
      ),
    ]).start();
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      goTo(currentIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => navigation.replace('Login');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <LinearGradient colors={[Colors.bgPrimary, Colors.bgSecondary]} style={StyleSheet.absoluteFill} />

      {/* Grid */}
      <View style={styles.grid} style={{ pointerEvents: "none" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} style={[styles.gridLine, { left: `${i * 11}%` }]} />
        ))}
      </View>

      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>SKIP</Text>
      </TouchableOpacity>

      {/* Slides */}
      <View style={styles.slidesWrapper}>
        <Animated.View style={[styles.slidesTrack, { transform: [{ translateX }] }]}>
          {slides.map((slide, idx) => (
            <SlideItem key={slide.id} slide={slide} isActive={currentIndex === idx} />
          ))}
        </Animated.View>
      </View>

      {/* Bottom controls */}
      <View style={styles.bottomControls}>
        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === currentIndex ? slides[currentIndex].accent : Colors.textDim,
                  transform: [{ scale: dotScale[i] }],
                  width: i === currentIndex ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity onPress={handleNext} activeOpacity={0.85}>
          <LinearGradient
            colors={[slides[currentIndex].accent, Colors.accentPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaBtn}
          >
            <Text style={styles.ctaText}>
              {currentIndex === slides.length - 1 ? 'INITIALIZE DEFENSE' : 'CONTINUE'}
            </Text>
            <Text style={styles.ctaArrow}>→</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const SlideItem = ({ slide, isActive }) => {
  return (
    <View style={styles.slide}>
      {/* Icon card */}
      <View style={[styles.iconCard, { borderColor: `${slide.accent}30` }]}>
        <LinearGradient
          colors={[`${slide.accent}22`, `${slide.accent}08`]}
          style={styles.iconGrad}
        >
          <Ionicons name={slide.icon} size={48} color={slide.accent} />
        </LinearGradient>
      </View>

      <View style={[styles.badgeRow]}>
        <View style={[styles.badge, { borderColor: `${slide.accent}44`, backgroundColor: `${slide.accent}15` }]}>
          <Text style={[styles.badgeText, { color: slide.accent }]}>{slide.badge}</Text>
        </View>
      </View>

      <Text style={styles.slideTitle}>{slide.title}</Text>
      <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(99,102,241,0.07)',
  },
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
  },
  slidesWrapper: {
    flex: 1,
    overflow: 'hidden',
    marginTop: 80,
  },
  slidesTrack: {
    flexDirection: 'row',
    flex: 1,
  },
  slide: {
    width,
    paddingHorizontal: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  iconCard: {
    borderWidth: 1,
    borderRadius: 28,
    marginBottom: 32,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
    overflow: 'hidden',
  },
  iconGrad: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 44,
  },
  badgeRow: {
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  slideTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 50,
    marginBottom: 20,
  },
  slideSubtitle: {
    fontSize: 15,
    color: Colors.textMuted,
    lineHeight: 24,
  },
  bottomControls: {
    paddingHorizontal: 32,
    paddingBottom: 48,
    gap: 24,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 14,
    gap: 10,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },
  ctaArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen;

