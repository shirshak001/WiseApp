import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../theme/colors';
import GlassCard from '../../components/GlassCard';
import AnimatedToggle from '../../components/AnimatedToggle';

const ProfileScreen = ({ navigation }) => {
  const [stealthMode, setStealthMode] = useState(false);

  const handleSignOut = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <LinearGradient colors={[Colors.bgPrimary, Colors.bgSecondary]} style={StyleSheet.absoluteFill} />
      <View style={styles.grid} style={{ pointerEvents: "none" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} style={[styles.gridV, { left: `${i * 11}%` }]} />
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <LinearGradient colors={[Colors.accentIndigo, Colors.accentPurple]} style={styles.headerLogo}>
              <Ionicons name="shield-checkmark" size={18} color="#FFF" />
            </LinearGradient>
            <Text style={styles.headerBrand}>WISEGUARD</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Agent Profile Card */}
        <Animatable.View animation="fadeInDown" delay={100}>
          <LinearGradient
            colors={['rgba(99,102,241,0.18)', 'rgba(139,92,246,0.06)']}
            style={[styles.agentCard, { borderColor: Colors.borderGlow }]}
          >
            <View style={styles.agentRow}>
              <View style={styles.avatarWrapper}>
                <LinearGradient colors={[Colors.accentIndigo, Colors.accentPurple]} style={styles.avatarGrad}>
                  <Ionicons name="person" size={28} color="#FFF" />
                </LinearGradient>
                <View style={styles.avatarBadge}>
                  <Ionicons name="shield-checkmark" size={12} color={Colors.accentIndigo} />
                </View>
              </View>
              <View style={styles.agentInfo}>
                <Text style={styles.agentName}>Agent K. Vance</Text>
                <Text style={styles.agentClearance}>CLEARANCE LEVEL 4</Text>
                <View style={styles.agentTags}>
                  <View style={styles.agentTag}>
                    <Text style={styles.agentTagText}>PRO</Text>
                  </View>
                  <View style={[styles.agentTag, { backgroundColor: Colors.successDim, borderColor: `${Colors.success}44` }]}>
                    <Text style={[styles.agentTagText, { color: Colors.success }]}>VERIFIED</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.agentStats}>
              <AgentStat label="Exposure Score" value="13" icon="trending-down" color={Colors.success} />
              <View style={styles.agentStatDivider} />
              <AgentStat label="Days Protected" value="247" icon="calendar" color={Colors.accentIndigo} />
              <View style={styles.agentStatDivider} />
              <AgentStat label="Threats Blocked" value="891" icon="shield" color={Colors.warning} />
            </View>
          </LinearGradient>
        </Animatable.View>

        {/* Account Security */}
        <Animatable.View animation="fadeInUp" delay={200}>
          <SectionHeader label="ACCOUNT SECURITY" />
          <GlassCard style={styles.card}>
            <SettingRow icon="key-outline" label="Change Access Key" />
            <RowDivider />
            <SettingRow icon="finger-print-outline" label="Biometric Authentication" />
            <RowDivider />
            <SettingRow icon="phone-portrait-outline" label="Trusted Devices" badge="3" />
          </GlassCard>
        </Animatable.View>

        {/* Privacy Protocols */}
        <Animatable.View animation="fadeInUp" delay={300}>
          <SectionHeader label="PRIVACY PROTOCOLS" />
          <GlassCard style={styles.card}>
            <View style={styles.toggleRow}>
              <Ionicons name="eye-off-outline" size={18} color={Colors.textMuted} />
              <Text style={styles.toggleLabel}>Stealth Mode</Text>
              <AnimatedToggle value={stealthMode} onValueChange={setStealthMode} />
            </View>
            <RowDivider />
            <SettingRow icon="navigate-outline" label="GPS Scrambling" />
          </GlassCard>
        </Animatable.View>

        {/* Notification Preferences */}
        <Animatable.View animation="fadeInUp" delay={400}>
          <SectionHeader label="NOTIFICATION PREFERENCES" />
          <GlassCard style={styles.card}>
            <SettingRow icon="notifications-outline" label="Critical Alert Sounds" />
            <RowDivider />
            <SettingRow icon="mail-outline" label="Intelligence Digests" />
          </GlassCard>
        </Animatable.View>

        {/* Support */}
        <Animatable.View animation="fadeInUp" delay={500}>
          <SectionHeader label="SUPPORT" />
          <GlassCard style={styles.card}>
            <SettingRow icon="help-circle-outline" label="Operational Manual" />
            <RowDivider />
            <SettingRow icon="headset-outline" label="Contact Headquarters" />
          </GlassCard>
        </Animatable.View>

        {/* Sign Out */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.signOutWrapper}>
          <TouchableOpacity onPress={handleSignOut} activeOpacity={0.85}>
            <LinearGradient
              colors={['rgba(239,68,68,0.18)', 'rgba(185,28,28,0.12)']}
              style={styles.signOutBtn}
            >
              <Ionicons name="log-out-outline" size={20} color={Colors.critical} />
              <Text style={styles.signOutText}>SIGN OUT</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.version}>WISEGUARD v4.2.0-STABLE</Text>
        </Animatable.View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const SectionHeader = ({ label }) => (
  <Text style={shStyles.label}>{label}</Text>
);

const SettingRow = ({ icon, label, badge }) => (
  <TouchableOpacity style={srStyles.row} activeOpacity={0.7}>
    <Ionicons name={icon} size={18} color={Colors.textMuted} />
    <Text style={srStyles.label}>{label}</Text>
    {badge && (
      <View style={srStyles.badge}>
        <Text style={srStyles.badgeText}>{badge}</Text>
      </View>
    )}
    <Ionicons name="chevron-forward" size={16} color={Colors.textDim} />
  </TouchableOpacity>
);

const AgentStat = ({ label, value, icon, color }) => (
  <View style={asStyles.stat}>
    <Ionicons name={icon} size={14} color={color} style={{ marginBottom: 4 }} />
    <Text style={[asStyles.value, { color }]}>{value}</Text>
    <Text style={asStyles.label}>{label}</Text>
  </View>
);

const RowDivider = () => <View style={{ height: 1, backgroundColor: Colors.borderSubtle, marginVertical: 12 }} />;

const shStyles = StyleSheet.create({
  label: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 2.5, marginTop: 8, marginBottom: 10 },
});

const srStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  label: { flex: 1, fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  badge: { backgroundColor: Colors.glowIndigo, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 1, borderColor: Colors.borderGlow },
  badgeText: { fontSize: 11, color: Colors.accentIndigo, fontWeight: '700' },
});

const asStyles = StyleSheet.create({
  stat: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  value: { fontSize: 20, fontWeight: '700' },
  label: { fontSize: 10, color: Colors.textMuted, textAlign: 'center', marginTop: 3 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  grid: { ...StyleSheet.absoluteFillObject },
  gridV: { position: 'absolute', top: 0, bottom: 0, width: StyleSheet.hairlineWidth, backgroundColor: 'rgba(99,102,241,0.07)' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, marginBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerLogo: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerBrand: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 4 },
  bellBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.bgCard, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.borderSubtle },
  agentCard: { borderRadius: 20, borderWidth: 1, padding: 20, marginBottom: 6 },
  agentRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  avatarWrapper: { position: 'relative' },
  avatarGrad: { width: 64, height: 64, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarBadge: { position: 'absolute', bottom: -4, right: -4, width: 22, height: 22, borderRadius: 8, backgroundColor: Colors.bgSecondary, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.borderGlow },
  agentInfo: { flex: 1 },
  agentName: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  agentClearance: { fontSize: 11, color: Colors.textMuted, fontWeight: '600', letterSpacing: 2, marginTop: 3, marginBottom: 8 },
  agentTags: { flexDirection: 'row', gap: 8 },
  agentTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: Colors.glowIndigo, borderWidth: 1, borderColor: Colors.borderGlow },
  agentTagText: { fontSize: 10, color: Colors.accentIndigo, fontWeight: '700', letterSpacing: 1 },
  agentStats: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: Colors.borderSubtle, paddingTop: 16 },
  agentStatDivider: { width: 1, backgroundColor: Colors.borderSubtle },
  card: { marginBottom: 6 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  toggleLabel: { flex: 1, fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  signOutWrapper: { marginTop: 16, gap: 16 },
  signOutBtn: { borderRadius: 16, borderWidth: 1, borderColor: `${Colors.critical}44`, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 10 },
  signOutText: { fontSize: 15, fontWeight: '700', color: Colors.critical, letterSpacing: 2 },
  version: { textAlign: 'center', fontSize: 11, color: Colors.textDim, letterSpacing: 2 },
});

export default ProfileScreen;

