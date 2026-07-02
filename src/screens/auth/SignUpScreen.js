import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Animated, StatusBar, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

const STEPS = ['Identity', 'Security', 'Protocol'];

const SignUpScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    password: '', confirmPassword: '',
    agentHandle: '', clearanceLevel: '1',
  });
  const [showPassword, setShowPassword] = useState(false);

  const slideX = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const goToStep = (nextStep) => {
    Animated.parallel([
      Animated.timing(slideX, { toValue: -nextStep * 400, duration: 350, useNativeDriver: true }),
      Animated.timing(progressAnim, {
        toValue: nextStep / (STEPS.length - 1),
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start(() => setStep(nextStep));
  };

  const updateField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleComplete = () => navigation.replace('SecurityAudit');

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <LinearGradient colors={[Colors.bgPrimary, '#0D1630']} style={StyleSheet.absoluteFill} />

      {/* Grid */}
      <View style={styles.grid} style={{ pointerEvents: "none" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} style={[styles.gridLine, { left: `${i * 11}%` }]} />
        ))}
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>

            {/* Top bar */}
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => step > 0 ? goToStep(step - 1) : navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
              <Text style={styles.topTitle}>AGENT REGISTRATION</Text>
              <Text style={styles.stepCount}>{step + 1}/{STEPS.length}</Text>
            </View>

            {/* Progress bar */}
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, { width: progressWidth }]}>
                <LinearGradient colors={[Colors.accentIndigo, Colors.accentPurple]} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
              </Animated.View>
            </View>

            {/* Step labels */}
            <View style={styles.stepLabels}>
              {STEPS.map((s, i) => (
                <Text key={i} style={[styles.stepLabel, i === step && styles.stepLabelActive, i < step && styles.stepLabelDone]}>
                  {i < step ? '✓ ' : ''}{s}
                </Text>
              ))}
            </View>

            {/* Form card */}
            <View style={styles.card}>
              <View style={styles.cardInner}>

                {step === 0 && (
                  <StepIdentity form={form} updateField={updateField} />
                )}
                {step === 1 && (
                  <StepSecurity form={form} updateField={updateField} showPassword={showPassword} setShowPassword={setShowPassword} />
                )}
                {step === 2 && (
                  <StepProtocol form={form} updateField={updateField} />
                )}

                <TouchableOpacity
                  onPress={() => step < STEPS.length - 1 ? goToStep(step + 1) : handleComplete()}
                  activeOpacity={0.85}
                  style={styles.nextBtnWrapper}
                >
                  <LinearGradient
                    colors={[Colors.accentIndigo, Colors.accentPurple]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.nextBtn}
                  >
                    <Text style={styles.nextBtnText}>
                      {step === STEPS.length - 1 ? 'INITIALIZE PROFILE' : 'CONTINUE'}
                    </Text>
                    <Ionicons name={step === STEPS.length - 1 ? 'shield-checkmark' : 'arrow-forward'} size={18} color="#FFF" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already an agent? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const InputField = ({ label, icon, placeholder, value, onChangeText, secure, keyboardType, rightEl }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={sf.fieldGroup}>
      <Text style={sf.fieldLabel}>{label}</Text>
      <View style={[sf.inputWrapper, focused && sf.inputFocused]}>
        <Ionicons name={icon} size={17} color={focused ? Colors.accentIndigo : Colors.textMuted} style={sf.inputIcon} />
        <TextInput
          style={sf.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          keyboardType={keyboardType || 'default'}
          autoCapitalize="none"
          selectionColor={Colors.accentIndigo}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {rightEl}
      </View>
    </View>
  );
};

const StepIdentity = ({ form, updateField }) => (
  <View>
    <Text style={sf.stepTitle}>Identity Verification</Text>
    <Text style={sf.stepSubtitle}>Establish your secure identity profile</Text>
    <InputField label="FULL NAME" icon="person-outline" placeholder="John Doe" value={form.fullName} onChangeText={v => updateField('fullName', v)} />
    <InputField label="EMAIL ADDRESS" icon="mail-outline" placeholder="agent@domain.com" value={form.email} onChangeText={v => updateField('email', v)} keyboardType="email-address" />
    <InputField label="PHONE NUMBER" icon="call-outline" placeholder="+1 (555) 000-0000" value={form.phone} onChangeText={v => updateField('phone', v)} keyboardType="phone-pad" />
  </View>
);

const StepSecurity = ({ form, updateField, showPassword, setShowPassword }) => (
  <View>
    <Text style={sf.stepTitle}>Security Credentials</Text>
    <Text style={sf.stepSubtitle}>Create your encrypted access key</Text>
    <InputField
      label="ACCESS KEY (PASSWORD)"
      icon="lock-closed-outline"
      placeholder="Min 12 characters"
      value={form.password}
      onChangeText={v => updateField('password', v)}
      secure={!showPassword}
      rightEl={
        <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.textMuted} />
        </TouchableOpacity>
      }
    />
    <InputField label="CONFIRM ACCESS KEY" icon="shield-outline" placeholder="Re-enter password" value={form.confirmPassword} onChangeText={v => updateField('confirmPassword', v)} secure={!showPassword} />
    <View style={sf.strengthBar}>
      <Text style={sf.strengthLabel}>KEY STRENGTH</Text>
      <View style={sf.strengthTrack}>
        <LinearGradient colors={[Colors.success, Colors.accentIndigo]} style={[sf.strengthFill, { width: `${Math.min(form.password.length * 8, 100)}%` }]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
      </View>
    </View>
  </View>
);

const StepProtocol = ({ form, updateField }) => (
  <View>
    <Text style={sf.stepTitle}>Operational Protocol</Text>
    <Text style={sf.stepSubtitle}>Configure your agent profile settings</Text>
    <InputField label="AGENT HANDLE" icon="at-outline" placeholder="agent_codename" value={form.agentHandle} onChangeText={v => updateField('agentHandle', v)} />
    <View style={sf.fieldGroup}>
      <Text style={sf.fieldLabel}>CLEARANCE LEVEL</Text>
      <View style={sf.levelRow}>
        {['1', '2', '3', '4'].map(level => (
          <TouchableOpacity
            key={level}
            onPress={() => updateField('clearanceLevel', level)}
            style={[sf.levelBtn, form.clearanceLevel === level && sf.levelBtnActive]}
          >
            <Text style={[sf.levelBtnText, form.clearanceLevel === level && sf.levelBtnTextActive]}>
              LVL {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    <View style={sf.agreementRow}>
      <Ionicons name="shield-checkmark" size={16} color={Colors.success} />
      <Text style={sf.agreementText}>
        By proceeding, you agree to the{' '}
        <Text style={{ color: Colors.accentIndigo }}>Privacy Protocol</Text>
        {' '}and{' '}
        <Text style={{ color: Colors.accentIndigo }}>Defense Agreement</Text>
      </Text>
    </View>
  </View>
);

const sf = StyleSheet.create({
  fieldGroup: { marginBottom: 18 },
  fieldLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 2, marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, borderWidth: 1, borderColor: Colors.borderSubtle, paddingHorizontal: 14, height: 52 },
  inputFocused: { borderColor: Colors.accentIndigo, backgroundColor: 'rgba(99,102,241,0.06)' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: Colors.textPrimary, fontSize: 15 },
  stepTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: 6 },
  stepSubtitle: { fontSize: 13, color: Colors.textMuted, marginBottom: 24 },
  strengthBar: { marginTop: 4, marginBottom: 8 },
  strengthLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 2, marginBottom: 6 },
  strengthTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' },
  strengthFill: { height: '100%', borderRadius: 2 },
  levelRow: { flexDirection: 'row', gap: 10 },
  levelBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: Colors.borderSubtle, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center' },
  levelBtnActive: { borderColor: Colors.accentIndigo, backgroundColor: 'rgba(99,102,241,0.15)' },
  levelBtnText: { fontSize: 12, fontWeight: '600', color: Colors.textMuted, letterSpacing: 1 },
  levelBtnTextActive: { color: Colors.accentIndigo },
  agreementRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 8 },
  agreementText: { flex: 1, fontSize: 12, color: Colors.textMuted, lineHeight: 18 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flexGrow: 1, paddingVertical: 56, paddingHorizontal: 24 },
  grid: { ...StyleSheet.absoluteFillObject },
  gridLine: { position: 'absolute', top: 0, bottom: 0, width: StyleSheet.hairlineWidth, backgroundColor: 'rgba(99,102,241,0.07)' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  topTitle: { fontSize: 12, fontWeight: '700', color: Colors.textMuted, letterSpacing: 3 },
  stepCount: { fontSize: 12, color: Colors.accentIndigo, fontWeight: '700' },
  progressTrack: { height: 3, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden', marginBottom: 12 },
  progressFill: { height: '100%', borderRadius: 2 },
  stepLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  stepLabel: { fontSize: 11, color: Colors.textDim, fontWeight: '600', letterSpacing: 0.5 },
  stepLabelActive: { color: Colors.accentIndigo },
  stepLabelDone: { color: Colors.success },
  card: { borderRadius: 20, borderWidth: 1, borderColor: Colors.borderCard, backgroundColor: 'rgba(255,255,255,0.03)', overflow: 'hidden', marginBottom: 20 },
  cardInner: { padding: 24 },
  nextBtnWrapper: { borderRadius: 14, overflow: 'hidden', marginTop: 8 },
  nextBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 10 },
  nextBtnText: { color: '#FFF', fontSize: 14, fontWeight: '700', letterSpacing: 2 },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { color: Colors.textMuted, fontSize: 13 },
  loginLink: { color: Colors.accentIndigo, fontSize: 13, fontWeight: '700', letterSpacing: 1 },
});

export default SignUpScreen;

