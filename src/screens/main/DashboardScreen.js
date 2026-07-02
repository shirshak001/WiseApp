import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, StatusBar, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../theme/colors';
import ExposureGauge from '../../components/ExposureGauge';
import GlassCard from '../../components/GlassCard';
import StatusBadge from '../../components/StatusBadge';
import AnimatedToggle from '../../components/AnimatedToggle';
import ActivityFeed from '../../components/ActivityFeed';

const { width } = Dimensions.get('window');

const ACTIVITY_ITEMS = [
  { title: 'Encrypted handshake successful', source: 'IP 192.168.1.1', time: '2m ago', color: Colors.success },
  { title: 'Database query optimized', source: 'Shard #04-Alpha', time: '15m ago', color: Colors.accentIndigo },
  { title: 'Scam call intercepted by Lumen AI', source: '+1 (555) 847-2391', time: '31m ago', color: Colors.warning, badge: 'BLOCKED', badgeColor: Colors.warning },
  { title: 'Data broker record removed', source: 'PeopleFinder.com', time: '1h ago', color: Colors.success, badge: 'REMOVED', badgeColor: Colors.success },
  { title: 'Dark web scan completed', source: 'Sector 7-B', time: '2h ago', color: Colors.accentPurple },
];

const DashboardScreen = ({ navigation }) => {
  const [shieldsActive, setShieldsActive] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({ inputRange: [0, 80], outputRange: [1, 0.9] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <LinearGradient colors={[Colors.bgPrimary, Colors.bgSecondary]} style={StyleSheet.absoluteFill} />

      {/* Grid */}
      <View style={styles.grid} style={{ pointerEvents: "none" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={`v${i}`} style={[styles.gridV, { left: `${i * 11}%` }]} />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <View key={`h${i}`} style={[styles.gridH, { top: `${i * 6}%` }]} />
        ))}
      </View>

      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <View style={styles.headerLeft}>
            <LinearGradient colors={[Colors.accentIndigo, Colors.accentPurple]} style={styles.headerLogo}>
              <Ionicons name="shield-checkmark" size={18} color="#FFF" />
            </LinearGradient>
            <Text style={styles.headerBrand}>WISEGUARD</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn} onPress={() => {}}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </Animated.View>

        {/* Exposure Gauge Section */}
        <Animatable.View animation="fadeIn" delay={200} style={styles.gaugeSection}>
          <ExposureGauge score={13} size={200} />
          <View style={styles.integrityBadge}>
            <Ionicons name="shield-checkmark" size={14} color={Colors.success} />
            <Text style={styles.integrityText}>System Integrity: Nominal</Text>
          </View>
        </Animatable.View>

        {/* Stat Row */}
        <Animatable.View animation="fadeInUp" delay={350} style={styles.statRow}>
          <StatChip label="Threats Blocked" value="142" color={Colors.success} icon="shield-checkmark" />
          <StatChip label="Records Purged" value="89" color={Colors.accentIndigo} icon="trash-outline" />
          <StatChip label="Calls Screened" value="31" color={Colors.warning} icon="call-outline" />
        </Animatable.View>

        {/* Active Shields */}
        <Animatable.View animation="fadeInUp" delay={450}>
          <GlassCard style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.cardIconWrapper}>
                <LinearGradient colors={[Colors.accentIndigo + '40', Colors.accentIndigo + '10']} style={styles.cardIcon}>
                  <Ionicons name="shield" size={20} color={Colors.accentIndigo} />
                </LinearGradient>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Active Shields</Text>
                <Text style={styles.cardSubtitle}>L7 firewall operational</Text>
              </View>
              <AnimatedToggle value={shieldsActive} onValueChange={setShieldsActive} />
            </View>
          </GlassCard>
        </Animatable.View>

        {/* Recent Breaches */}
        <Animatable.View animation="fadeInUp" delay={550}>
          <GlassCard style={[styles.card, { borderColor: Colors.criticalDim }]} glowColor={`${Colors.critical}22`}>
            <View style={styles.cardRow}>
              <View style={styles.cardIconWrapper}>
                <LinearGradient colors={[Colors.critical + '40', Colors.critical + '10']} style={styles.cardIcon}>
                  <Ionicons name="warning" size={20} color={Colors.critical} />
                </LinearGradient>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Recent Breaches</Text>
                <Text style={styles.cardSubtitle}>42 encrypted fragments detected</Text>
              </View>
              <View style={styles.breachCount}>
                <Text style={styles.breachCountText}>42</Text>
              </View>
            </View>
          </GlassCard>
        </Animatable.View>

        {/* Exposure Trend Mini */}
        <Animatable.View animation="fadeInUp" delay={600}>
          <GlassCard style={styles.card}>
            <View style={styles.trendHeader}>
              <Text style={styles.cardTitle}>Exposure Trend</Text>
              <StatusBadge status="nominal" />
            </View>
            <View style={styles.trendBars}>
              {[40, 55, 35, 60, 30, 25, 20, 13].map((h, i) => (
                <View key={i} style={styles.barWrapper}>
                  <Animatable.View
                    animation="fadeInUp"
                    delay={600 + i * 60}
                    style={[
                      styles.bar,
                      {
                        height: h * 0.9,
                        backgroundColor: h > 45 ? `${Colors.critical}80` : h > 30 ? `${Colors.warning}80` : `${Colors.accentIndigo}80`,
                        borderColor: h > 45 ? Colors.critical : h > 30 ? Colors.warning : Colors.accentIndigo,
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
            <Text style={styles.trendCaption}>↓ 69% improvement over 30 days</Text>
          </GlassCard>
        </Animatable.View>

        {/* Recent Activity */}
        <Animatable.View animation="fadeInUp" delay={700}>
          <GlassCard style={styles.card}>
            <View style={styles.activityHeader}>
              <View style={styles.activityTitleRow}>
                <MaterialCommunityIcons name="history" size={18} color={Colors.textMuted} />
                <Text style={styles.cardTitle}>Recent Activity</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.liveText}>Live Feed</Text>
              </TouchableOpacity>
            </View>
            <ActivityFeed items={ACTIVITY_ITEMS} />
          </GlassCard>
        </Animatable.View>

        <View style={{ height: 20 }} />
      </Animated.ScrollView>
    </View>
  );
};

const StatChip = ({ label, value, color, icon }) => (
  <View style={[statStyles.chip, { borderColor: `${color}30` }]}>
    <LinearGradient colors={[`${color}20`, `${color}08`]} style={statStyles.chipGrad}>
      <Ionicons name={icon} size={16} color={color} />
      <Text style={[statStyles.chipValue, { color }]}>{value}</Text>
      <Text style={statStyles.chipLabel}>{label}</Text>
    </LinearGradient>
  </View>
);

const statStyles = StyleSheet.create({
  chip: { flex: 1, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  chipGrad: { alignItems: 'center', padding: 14, gap: 4 },
  chipValue: { fontSize: 22, fontWeight: '700' },
  chipLabel: { fontSize: 10, color: Colors.textMuted, textAlign: 'center', letterSpacing: 0.5 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  grid: { ...StyleSheet.absoluteFillObject },
  gridV: { position: 'absolute', top: 0, bottom: 0, width: StyleSheet.hairlineWidth, backgroundColor: 'rgba(99,102,241,0.07)' },
  gridH: { position: 'absolute', left: 0, right: 0, height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(99,102,241,0.05)' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerLogo: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerBrand: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 4 },
  bellBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.bgCard, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.borderSubtle },
  bellDot: { position: 'absolute', top: 9, right: 9, width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.critical, borderWidth: 1.5, borderColor: Colors.bgPrimary },
  gaugeSection: { alignItems: 'center', paddingVertical: 16 },
  integrityBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12, backgroundColor: 'rgba(16,185,129,0.08)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)' },
  integrityText: { color: Colors.success, fontSize: 13, fontWeight: '600', letterSpacing: 0.5 },
  statRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  card: { marginBottom: 14 },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  cardIconWrapper: {},
  cardIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 3 },
  cardSubtitle: { fontSize: 12, color: Colors.textMuted },
  breachCount: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.criticalDim, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: `${Colors.critical}44` },
  breachCountText: { color: Colors.critical, fontSize: 17, fontWeight: '700' },
  trendHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  trendBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 70, marginBottom: 10 },
  barWrapper: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: 70 },
  bar: { width: '100%', borderRadius: 4, borderTopWidth: 1, minHeight: 4 },
  trendCaption: { fontSize: 11, color: Colors.success, fontWeight: '600' },
  activityHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  activityTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  liveText: { fontSize: 11, color: Colors.accentIndigo, fontWeight: '600', letterSpacing: 1 },
});

export default DashboardScreen;

