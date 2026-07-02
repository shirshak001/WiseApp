import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const AUDIT_STEPS = [
  {
    id: 1,
    icon: 'scan-outline',
    title: 'Identity Scan',
    description: 'Scanning 250+ data broker databases for your personal information...',
    status: 'Scanning 2,847 records',
    color: Colors.accentIndigo,
    duration: 2000,
  },
  {
    id: 2,
    icon: 'globe-outline',
    title: 'Dark Web Analysis',
    description: 'Probing dark web marketplaces and encrypted forums for data leaks...',
    status: 'Probing 47 threat vectors',
    color: Colors.accentPurple,
    duration: 2500,
  },
  {
    id: 3,
    icon: 'shield-outline',
    title: 'Exposure Assessment',
    description: 'Computing your personal Exposure Score based on discovered data...',
    status: 'Calculating risk profile',
    color: Colors.warning,
    duration: 1800,
  },
  {
    id: 4,
    icon: 'checkmark-circle-outline',
    title: 'Defense Protocol',
    description: 'Initializing automated removal requests and active shields...',
    status: 'Activating 6 shields',
    color: Colors.success,
    duration: 2000,
  },
];

const SecurityAuditScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [stepProgress, setStepProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scanLineY = useRef(new Animated.Value(-80)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;
  const globalProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Scan line loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineY, { toValue: height * 0.45, duration: 1800, useNativeDriver: false }),
        Animated.timing(scanLineY, { toValue: -80, duration: 0, useNativeDriver: false }),
      ])
    ).start();

    // Pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScale, { toValue: 1.1, duration: 800, useNativeDriver: false }),
        Animated.timing(pulseScale, { toValue: 1, duration: 800, useNativeDriver: false }),
      ])
    ).start();

    runAudit(0);
  }, []);

  const runAudit = (stepIdx) => {
    if (stepIdx >= AUDIT_STEPS.length) {
      setCompleted(true);
      Animated.timing(globalProgress, { toValue: 1, duration: 600, useNativeDriver: false }).start();
      return;
    }
    setCurrentStep(stepIdx);
    const step = AUDIT_STEPS[stepIdx];

    Animated.timing(progressAnim, {
      toValue: (stepIdx + 1) / AUDIT_STEPS.length,
      duration: step.duration,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => runAudit(stepIdx + 1), 400);
    });
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <LinearGradient colors={[Colors.bgPrimary, '#0A1020', Colors.bgSecondary]} style={StyleSheet.absoluteFill} />

      {/* Grid */}
      <View style={styles.grid} style={{ pointerEvents: "none" }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <View key={`v${i}`} style={[styles.gridV, { left: `${i * 7.7}%` }]} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={`h${i}`} style={[styles.gridH, { top: `${i * 5.3}%` }]} />
        ))}
      </View>

      {/* Scan line */}
      {!completed && (
        <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanLineY }] }]} style={{ pointerEvents: "none" }} />
      )}

      {/* Header */}
      <View style={styles.header}>
        <LinearGradient colors={[Colors.accentIndigo, Colors.accentPurple]} style={styles.headerLogo}>
          <Ionicons name="shield-checkmark" size={18} color="#FFF" />
        </LinearGradient>
        <Text style={styles.headerBrand}>WISEGUARD</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {!completed ? (
          <>
            {/* Central icon */}
            <Animatable.View animation="pulse" iterationCount="infinite" style={styles.centralIconWrapper}>
              <LinearGradient
                colors={[AUDIT_STEPS[currentStep]?.color + '40' || Colors.accentIndigo + '40', 'transparent']}
                style={styles.centralIconGlow}
              />
              <LinearGradient
                colors={[AUDIT_STEPS[currentStep]?.color || Colors.accentIndigo, Colors.accentPurple]}
                style={styles.centralIcon}
              >
                <Ionicons
                  name={AUDIT_STEPS[currentStep]?.icon || 'scan-outline'}
                  size={40}
                  color="#FFF"
                />
              </LinearGradient>
            </Animatable.View>

            <Animatable.View key={currentStep} animation="fadeIn" duration={400} style={styles.stepTextArea}>
              <Text style={styles.stepBadge}>STEP {currentStep + 1} OF {AUDIT_STEPS.length}</Text>
              <Text style={styles.stepTitle}>{AUDIT_STEPS[currentStep]?.title}</Text>
              <Text style={styles.stepDescription}>{AUDIT_STEPS[currentStep]?.description}</Text>
              <View style={styles.statusChip}>
                <Animatable.View animation="flash" iterationCount="infinite" style={styles.statusDot} />
                <Text style={styles.statusText}>{AUDIT_STEPS[currentStep]?.status}</Text>
              </View>
            </Animatable.View>

            {/* Step dots */}
            <View style={styles.stepDots}>
              {AUDIT_STEPS.map((step, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.stepDot,
                    {
                      backgroundColor: idx < currentStep ? Colors.success :
                        idx === currentStep ? step.color : 'rgba(255,255,255,0.1)',
                      width: idx === currentStep ? 24 : 8,
                    },
                  ]}
                />
              ))}
            </View>

            {/* Progress */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>SECURITY AUDIT PROGRESS</Text>
                <Animated.Text style={styles.progressPercent}>
                  {progressAnim.interpolate ? '' : ''}
                </Animated.Text>
              </View>
              <View style={styles.progressTrack}>
                <Animated.View style={[styles.progressFill, { width: progressWidth }]}>
                  <LinearGradient
                    colors={[Colors.accentIndigo, Colors.accentPurple]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </Animated.View>
              </View>
            </View>
          </>
        ) : (
          /* Completed state */
          <Animatable.View animation="fadeIn" style={styles.completedSection}>
            <Animatable.View animation="bounceIn" delay={200} style={styles.successIconWrapper}>
              <LinearGradient colors={[Colors.success, '#059669']} style={styles.successIcon}>
                <Ionicons name="shield-checkmark" size={48} color="#FFF" />
              </LinearGradient>
              <View style={styles.successGlow} />
            </Animatable.View>

            <Animatable.Text animation="fadeInUp" delay={400} style={styles.completedTitle}>
              Defense Initialized
            </Animatable.Text>
            <Animatable.Text animation="fadeInUp" delay={500} style={styles.completedSubtitle}>
              Your WiseGuard shield is now active. Exposure Score set to 13 — monitoring 24/7.
            </Animatable.Text>

            <Animatable.View animation="fadeInUp" delay={600} style={styles.resultCards}>
              <ResultCard label="Exposure Score" value="13" icon="trending-down" color={Colors.success} />
              <ResultCard label="Shields Active" value="6" icon="shield" color={Colors.accentIndigo} />
              <ResultCard label="Threats Found" value="47" icon="warning" color={Colors.warning} />
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={800} style={styles.ctaWrapper}>
              <TouchableOpacity onPress={() => navigation.replace('MainApp')} activeOpacity={0.85}>
                <LinearGradient
                  colors={[Colors.accentIndigo, Colors.accentPurple]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.ctaBtn}
                >
                  <Ionicons name="shield-checkmark" size={20} color="#FFF" />
                  <Text style={styles.ctaText}>ENTER COMMAND CENTER</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          </Animatable.View>
        )}
      </View>
    </View>
  );
};

const ResultCard = ({ label, value, icon, color }) => (
  <View style={[rcStyles.card, { borderColor: `${color}30`, backgroundColor: `${color}0A` }]}>
    <Ionicons name={icon} size={16} color={color} />
    <Text style={[rcStyles.value, { color }]}>{value}</Text>
    <Text style={rcStyles.label}>{label}</Text>
  </View>
);

const rcStyles = StyleSheet.create({
  card: { flex: 1, borderRadius: 14, borderWidth: 1, padding: 14, alignItems: 'center', gap: 6 },
  value: { fontSize: 24, fontWeight: '800' },
  label: { fontSize: 10, color: Colors.textMuted, textAlign: 'center', letterSpacing: 0.5 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  grid: { ...StyleSheet.absoluteFillObject },
  gridV: { position: 'absolute', top: 0, bottom: 0, width: StyleSheet.hairlineWidth, backgroundColor: 'rgba(99,102,241,0.07)' },
  gridH: { position: 'absolute', left: 0, right: 0, height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(99,102,241,0.05)' },
  scanLine: { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: 'rgba(99,102,241,0.25)', zIndex: 2 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 24, paddingTop: 56 },
  headerLogo: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerBrand: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 4 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  centralIconWrapper: { marginBottom: 40, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  centralIconGlow: { position: 'absolute', width: 160, height: 160, borderRadius: 80 },
  centralIcon: { width: 100, height: 100, borderRadius: 30, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.accentIndigo, shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.5, shadowRadius: 32, elevation: 24 },
  stepTextArea: { alignItems: 'center', marginBottom: 32 },
  stepBadge: { fontSize: 10, fontWeight: '700', color: Colors.accentIndigo, letterSpacing: 3, marginBottom: 10 },
  stepTitle: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center', marginBottom: 12 },
  stepDescription: { fontSize: 14, color: Colors.textMuted, textAlign: 'center', lineHeight: 22, marginBottom: 16 },
  statusChip: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(99,102,241,0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: Colors.borderGlow },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.accentIndigo },
  statusText: { fontSize: 12, color: Colors.accentIndigo, fontWeight: '600', letterSpacing: 0.5 },
  stepDots: { flexDirection: 'row', gap: 8, marginBottom: 40, alignItems: 'center' },
  stepDot: { height: 8, borderRadius: 4 },
  progressSection: { width: '100%' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 2 },
  progressPercent: { fontSize: 12, color: Colors.accentIndigo, fontWeight: '700' },
  progressTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  completedSection: { alignItems: 'center', width: '100%' },
  successIconWrapper: { marginBottom: 28, position: 'relative' },
  successIcon: { width: 110, height: 110, borderRadius: 34, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.success, shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.5, shadowRadius: 32, elevation: 24 },
  successGlow: { position: 'absolute', top: -20, left: -20, right: -20, bottom: -20, borderRadius: 80, backgroundColor: Colors.success, opacity: 0.08 },
  completedTitle: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center', marginBottom: 12 },
  completedSubtitle: { fontSize: 14, color: Colors.textMuted, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  resultCards: { flexDirection: 'row', gap: 10, marginBottom: 28, width: '100%' },
  ctaWrapper: { width: '100%' },
  ctaBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, borderRadius: 16, gap: 12 },
  ctaText: { fontSize: 14, fontWeight: '700', color: '#FFF', letterSpacing: 2 },
});

export default SecurityAuditScreen;

