import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../theme/colors';
import GlassCard from '../../components/GlassCard';
import AnimatedToggle from '../../components/AnimatedToggle';
import StatusBadge from '../../components/StatusBadge';

const ShieldScreen = () => {
  const [stealthMode, setStealthMode] = useState(false);
  const [gpsScramble, setGpsScramble] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <LinearGradient colors={[Colors.bgPrimary, Colors.bgSecondary]} style={StyleSheet.absoluteFill} />
      <View style={styles.grid} style={{ pointerEvents: "none" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={`v${i}`} style={[styles.gridV, { left: `${i * 11}%` }]} />
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animatable.View animation="fadeIn" style={styles.header}>
          <View style={styles.headerLeft}>
            <LinearGradient colors={[Colors.accentIndigo, Colors.accentPurple]} style={styles.headerLogo}>
              <Ionicons name="shield-checkmark" size={18} color="#FFF" />
            </LinearGradient>
            <Text style={styles.headerBrand}>WISEGUARD</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        </Animatable.View>

        {/* Global Stealth Mode */}
        <Animatable.View animation="fadeInUp" delay={150}>
          <LinearGradient
            colors={stealthMode ? ['rgba(99,102,241,0.18)', 'rgba(99,102,241,0.06)'] : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
            style={[styles.stealthCard, { borderColor: stealthMode ? Colors.borderGlow : Colors.borderSubtle }]}
          >
            <View style={styles.stealthInner}>
              <View style={styles.stealthTextCol}>
                <Text style={styles.stealthTitle}>Global Stealth Mode</Text>
                <Text style={styles.stealthSubtitle}>Obfuscate all network footprints</Text>
                {stealthMode && (
                  <Animatable.View animation="fadeIn" style={styles.activeNodes}>
                    <View style={styles.activeDot} />
                    <Text style={styles.activeNodesText}>Routing through 3 encrypted nodes</Text>
                  </Animatable.View>
                )}
              </View>
              <AnimatedToggle value={stealthMode} onValueChange={setStealthMode} />
            </View>
          </LinearGradient>
        </Animatable.View>

        {/* Arsenal Grid */}
        <Animatable.View animation="fadeInUp" delay={250} style={styles.arsenalGrid}>
          <ArsenalCard
            icon="call"
            iconBg={Colors.accentIndigo}
            badge="active"
            badgeLabel="ACTIVE"
            title="Call Screening"
            stat="14 Robocalls"
            statSub="Blocked Today"
            btnLabel="REVIEW LOGS"
            btnColor={Colors.accentIndigo}
          />
          <ArsenalCard
            icon="at"
            iconBg={Colors.accentPurple}
            badge="active"
            badgeLabel="8 ACTIVE"
            title="Email Aliases"
            stat="3 Breaches"
            statSub="Prevented"
            btnLabel="NEW ALIAS"
            btnColor={Colors.accentPurple}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={350} style={styles.arsenalGrid}>
          <ArsenalCard
            icon="person-remove"
            iconBg={Colors.warning}
            badge="pending"
            badgeLabel="PENDING"
            title="Data Removal"
            stat="Cleaning 12"
            statSub="Broker Lists"
            btnLabel="SCAN STATUS"
            btnColor={Colors.warning}
          />
          <ArsenalCard
            icon="eye"
            iconBg={Colors.accentCyan || Colors.accentIndigo}
            badge="vigilant"
            badgeLabel="VIGILANT"
            title="AI Sentry"
            stat="2 Malware Links"
            statSub="Intercepted"
            btnLabel="VIEW THREATS"
            btnColor={Colors.accentIndigo}
            alert
          />
        </Animatable.View>

        {/* Lumen AI Feature Card */}
        <Animatable.View animation="fadeInUp" delay={450}>
          <LinearGradient
            colors={['rgba(99,102,241,0.15)', 'rgba(139,92,246,0.08)']}
            style={[styles.lumenCard, { borderColor: Colors.borderGlow }]}
          >
            <View style={styles.lumenHeader}>
              <LinearGradient colors={[Colors.accentIndigo, Colors.accentPurple]} style={styles.lumenIcon}>
                <MaterialCommunityIcons name="brain" size={22} color="#FFF" />
              </LinearGradient>
              <View style={styles.lumenInfo}>
                <Text style={styles.lumenTitle}>Lumen AI</Text>
                <Text style={styles.lumenSubtitle}>Intelligent call interceptor · Active</Text>
              </View>
              <StatusBadge status="active" dot />
            </View>
            <View style={styles.lumenStats}>
              <LumenStat label="Calls Intercepted" value="891" delta="+12 today" color={Colors.success} />
              <LumenStat label="Scam Rate" value="94%" delta="accuracy" color={Colors.accentIndigo} />
              <LumenStat label="False Positives" value="0.3%" delta="this month" color={Colors.warning} />
            </View>
          </LinearGradient>
        </Animatable.View>

        {/* Privacy Protocols */}
        <Animatable.View animation="fadeInUp" delay={550}>
          <GlassCard style={styles.card}>
            <Text style={styles.sectionLabel}>PRIVACY PROTOCOLS</Text>
            <ProtocolRow icon="eye-off" label="GPS Scrambling" value={gpsScramble} onChange={setGpsScramble} />
            <View style={styles.divider} />
            <ProtocolRow icon="wifi" label="VPN Kill Switch" value={true} onChange={() => {}} />
            <View style={styles.divider} />
            <ProtocolRow icon="camera-off" label="Sensor Blackout" value={false} onChange={() => {}} />
          </GlassCard>
        </Animatable.View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const ArsenalCard = ({ icon, iconBg, badge, badgeLabel, title, stat, statSub, btnLabel, btnColor, alert }) => (
  <View style={[acStyles.card, alert && { borderColor: `${btnColor}44` }]}>
    <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={acStyles.inner}>
      <View style={acStyles.top}>
        <LinearGradient colors={[`${iconBg}40`, `${iconBg}10`]} style={acStyles.iconBox}>
          <Ionicons name={icon} size={20} color={iconBg} />
        </LinearGradient>
        <StatusBadge status={badge} label={badgeLabel} dot={badge === 'active' || badge === 'vigilant'} />
      </View>
      <Text style={acStyles.title}>{title}</Text>
      <Text style={acStyles.stat}>{stat}</Text>
      <Text style={acStyles.statSub}>{statSub}</Text>
      <TouchableOpacity style={[acStyles.btn, { borderColor: `${btnColor}50`, backgroundColor: `${btnColor}12` }]} activeOpacity={0.7}>
        <Text style={[acStyles.btnText, { color: btnColor }]}>{btnLabel}</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

const LumenStat = ({ label, value, delta, color }) => (
  <View style={lsStyles.stat}>
    <Text style={[lsStyles.value, { color }]}>{value}</Text>
    <Text style={lsStyles.label}>{label}</Text>
    <Text style={lsStyles.delta}>{delta}</Text>
  </View>
);

const ProtocolRow = ({ icon, label, value, onChange }) => (
  <View style={prStyles.row}>
    <Ionicons name={`${icon}-outline`} size={18} color={Colors.textMuted} />
    <Text style={prStyles.label}>{label}</Text>
    <AnimatedToggle value={value} onValueChange={onChange} />
  </View>
);

const acStyles = StyleSheet.create({
  card: { flex: 1, borderRadius: 16, borderWidth: 1, borderColor: Colors.borderSubtle, overflow: 'hidden' },
  inner: { padding: 14, flex: 1 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  stat: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  statSub: { fontSize: 12, color: Colors.textMuted, marginBottom: 14 },
  btn: { paddingVertical: 10, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  btnText: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
});

const lsStyles = StyleSheet.create({
  stat: { flex: 1, alignItems: 'center' },
  value: { fontSize: 22, fontWeight: '700' },
  label: { fontSize: 10, color: Colors.textMuted, textAlign: 'center', marginTop: 2, letterSpacing: 0.3 },
  delta: { fontSize: 10, color: Colors.textDim, marginTop: 2 },
});

const prStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  label: { flex: 1, fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
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
  stealthCard: { borderRadius: 16, borderWidth: 1, marginBottom: 14, overflow: 'hidden' },
  stealthInner: { padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stealthTextCol: { flex: 1 },
  stealthTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  stealthSubtitle: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  activeNodes: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.success },
  activeNodesText: { fontSize: 11, color: Colors.success, fontWeight: '600' },
  arsenalGrid: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  lumenCard: { borderRadius: 16, borderWidth: 1, padding: 20, marginBottom: 14 },
  lumenHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  lumenIcon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  lumenInfo: { flex: 1 },
  lumenTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  lumenSubtitle: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  lumenStats: { flexDirection: 'row' },
  card: { marginBottom: 14 },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 2.5, marginBottom: 16 },
  divider: { height: 1, backgroundColor: Colors.borderSubtle, marginVertical: 14 },
});

export default ShieldScreen;

