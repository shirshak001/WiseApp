import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Animated, StatusBar, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const shieldPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: false }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: false }),
      Animated.timing(logoAnim, { toValue: 1, duration: 600, useNativeDriver: false }),
    ]).start();

    // Shield pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(shieldPulse, { toValue: 1.08, duration: 1800, useNativeDriver: false }),
        Animated.timing(shieldPulse, { toValue: 1, duration: 1800, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const handleLogin = () => {
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <LinearGradient
        colors={[Colors.bgPrimary, '#0D1630', Colors.bgSecondary]}
        style={StyleSheet.absoluteFill}
      />

      {/* Grid bg */}
      <View style={styles.grid} style={{ pointerEvents: "none" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={`v${i}`} style={[styles.gridV, { left: `${i * 11}%` }]} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <View key={`h${i}`} style={[styles.gridH, { top: `${i * 7}%` }]} />
        ))}
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <Animated.View style={[styles.header, { opacity: logoAnim }]}>
            <Animated.View style={[styles.shieldContainer, { transform: [{ scale: shieldPulse }] }]}>
              <LinearGradient colors={[Colors.accentIndigo, Colors.accentPurple]} style={styles.shieldGradient}>
                <Ionicons name="shield-checkmark" size={32} color="#FFF" />
              </LinearGradient>
              <View style={styles.shieldGlow} />
            </Animated.View>
            <Text style={styles.brand}>WISEGUARD</Text>
            <Text style={styles.tagline}>SECURE AUTHENTICATION PORTAL</Text>
          </Animated.View>

          {/* Card */}
          <Animated.View
            style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.cardInner}>
              <Text style={styles.cardTitle}>Access Terminal</Text>
              <Text style={styles.cardSubtitle}>Enter your credentials to proceed</Text>

              {/* Email field */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>AGENT ID / EMAIL</Text>
                <View style={[styles.inputWrapper, emailFocused && styles.inputFocused]}>
                  <Ionicons name="mail-outline" size={18} color={emailFocused ? Colors.accentIndigo : Colors.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="agent@wiseguard.ai"
                    placeholderTextColor={Colors.textMuted}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    selectionColor={Colors.accentIndigo}
                  />
                </View>
              </View>

              {/* Password field */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>ACCESS KEY</Text>
                <View style={[styles.inputWrapper, passFocused && styles.inputFocused]}>
                  <Ionicons name="lock-closed-outline" size={18} color={passFocused ? Colors.accentIndigo : Colors.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="••••••••••••"
                    placeholderTextColor={Colors.textMuted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onFocus={() => setPassFocused(true)}
                    onBlur={() => setPassFocused(false)}
                    selectionColor={Colors.accentIndigo}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot */}
              <TouchableOpacity style={styles.forgotRow}>
                <Text style={styles.forgotText}>FORGOT ACCESS KEY?</Text>
              </TouchableOpacity>

              {/* Login button */}
              <TouchableOpacity onPress={handleLogin} activeOpacity={0.85} style={styles.loginBtnWrapper}>
                <LinearGradient
                  colors={[Colors.accentIndigo, Colors.accentPurple]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginBtn}
                >
                  <Ionicons name="shield-checkmark" size={18} color="#FFF" />
                  <Text style={styles.loginBtnText}>AUTHENTICATE</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social */}
              <View style={styles.socialRow}>
                {['logo-google', 'logo-apple', 'finger-print'].map((icon, i) => (
                  <TouchableOpacity key={i} style={styles.socialBtn} activeOpacity={0.7}>
                    <Ionicons name={icon} size={20} color={Colors.textSecondary} />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Sign up */}
              <View style={styles.signupRow}>
                <Text style={styles.signupText}>New agent? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signupLink}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          {/* Footer */}
          <Animated.Text style={[styles.footer, { opacity: fadeAnim }]}>
            WISEGUARD v4.2.0-STABLE · ENCRYPTED TUNNEL ACTIVE
          </Animated.Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60, paddingHorizontal: 24 },
  grid: { ...StyleSheet.absoluteFillObject },
  gridV: { position: 'absolute', top: 0, bottom: 0, width: StyleSheet.hairlineWidth, backgroundColor: 'rgba(99,102,241,0.07)' },
  gridH: { position: 'absolute', left: 0, right: 0, height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(99,102,241,0.05)' },
  header: { alignItems: 'center', marginBottom: 32 },
  shieldContainer: { marginBottom: 16, position: 'relative' },
  shieldGradient: { width: 72, height: 72, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  shieldGlow: { position: 'absolute', top: 4, left: 4, right: 4, bottom: 4, borderRadius: 20, backgroundColor: Colors.accentIndigo, opacity: 0.25, filter: undefined },
  brand: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 8 },
  tagline: { fontSize: 10, fontWeight: '600', color: Colors.textMuted, letterSpacing: 3, marginTop: 6 },
  card: { width: '100%', borderRadius: 20, borderWidth: 1, borderColor: Colors.borderCard, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.03)', marginBottom: 24 },
  cardInner: { padding: 24 },
  cardTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: 6 },
  cardSubtitle: { fontSize: 13, color: Colors.textMuted, marginBottom: 28 },
  fieldGroup: { marginBottom: 20 },
  fieldLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 2, marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, borderWidth: 1, borderColor: Colors.borderSubtle, paddingHorizontal: 14, height: 52 },
  inputFocused: { borderColor: Colors.accentIndigo, backgroundColor: 'rgba(99,102,241,0.06)' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: Colors.textPrimary, fontSize: 15 },
  eyeBtn: { padding: 4 },
  forgotRow: { alignItems: 'flex-end', marginBottom: 24, marginTop: -8 },
  forgotText: { fontSize: 11, color: Colors.accentIndigo, fontWeight: '600', letterSpacing: 1 },
  loginBtnWrapper: { borderRadius: 14, overflow: 'hidden', marginBottom: 24 },
  loginBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 10 },
  loginBtnText: { color: '#FFF', fontSize: 14, fontWeight: '700', letterSpacing: 2 },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.borderSubtle },
  dividerText: { fontSize: 10, color: Colors.textMuted, fontWeight: '600', letterSpacing: 1.5 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 24 },
  socialBtn: { width: 52, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.borderSubtle },
  signupRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signupText: { color: Colors.textMuted, fontSize: 13 },
  signupLink: { color: Colors.accentIndigo, fontSize: 13, fontWeight: '700', letterSpacing: 1 },
  footer: { fontSize: 10, color: Colors.textDim, letterSpacing: 2, textAlign: 'center' },
});

export default LoginScreen;

