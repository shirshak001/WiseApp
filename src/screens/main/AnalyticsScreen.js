import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, {
  Polyline, Defs, LinearGradient as SvgGradient, Stop, Polygon, Circle,
} from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../theme/colors';
import GlassCard from '../../components/GlassCard';
import StatusBadge from '../../components/StatusBadge';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 80;
const CHART_HEIGHT = 120;

// 30-day exposure trend data
const TREND_DATA = [68, 72, 65, 70, 58, 55, 62, 50, 45, 48, 42, 40, 45, 38, 35, 42, 30, 32, 28, 35, 25, 22, 28, 20, 18, 22, 16, 13, 15, 13];

const getChartPoints = (data, chartW, chartH) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return data.map((v, i) => ({
    x: (i / (data.length - 1)) * chartW,
    y: chartH - ((v - min) / range) * (chartH - 10) - 5,
  }));
};

const AnalyticsScreen = () => {
  const [activeTab, setActiveTab] = useState('30D');
  const chartOpacity = useRef(new Animated.Value(0)).current;
  const brokerProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(chartOpacity, { toValue: 1, duration: 800, delay: 300, useNativeDriver: true }),
      Animated.timing(brokerProgress, { toValue: 0.82, duration: 1500, delay: 500, useNativeDriver: false }),
    ]).start();
  }, []);

  const points = getChartPoints(TREND_DATA, CHART_WIDTH, CHART_HEIGHT);
  const polyPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const fillPoints = `0,${CHART_HEIGHT} ${polyPoints} ${CHART_WIDTH},${CHART_HEIGHT}`;

  const circumference = 2 * Math.PI * 40;
  const brokerDashOffset = brokerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, circumference * 0.18],
  });

  const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);

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
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="search-outline" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="notifications-outline" size={20} color={Colors.textSecondary} />
              <View style={styles.bellDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <Animatable.View animation="fadeInLeft" delay={100}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.pageTitle}>Risk Analytics</Text>
              <Text style={styles.pageSubtitle}>Global exposure monitoring system</Text>
            </View>
            <View style={[styles.systemBadge, { borderColor: Colors.borderGlow, backgroundColor: 'rgba(99,102,241,0.1)' }]}>
              <View style={styles.sysDot} />
              <Text style={styles.sysText}>SYSTEM{'\n'}NOMINAL</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Exposure Trend Chart */}
        <Animatable.View animation="fadeInUp" delay={200}>
          <GlassCard style={styles.card}>
            <View style={styles.chartTopRow}>
              <View>
                <Text style={styles.chartLabel}>EXPOSURE TREND (30D)</Text>
                <View style={styles.chartValueRow}>
                  <Text style={styles.chartValue}>42.8%</Text>
                  <View style={styles.deltaChip}>
                    <Text style={styles.deltaText}>↑ 2.4%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.chartActions}>
                <TouchableOpacity style={styles.chartActionBtn}>
                  <Text style={styles.chartActionText}>EXPORT PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.chartActionBtn, styles.chartActionBtnActive]}>
                  <Text style={[styles.chartActionText, { color: Colors.textPrimary }]}>LIVE FEED</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* SVG Chart */}
            <Animatable.View animation="fadeIn" delay={400}>
              <Svg width={CHART_WIDTH} height={CHART_HEIGHT} style={{ marginLeft: -4 }}>
                <Defs>
                  <SvgGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0%" stopColor={Colors.accentIndigo} />
                    <Stop offset="100%" stopColor={Colors.accentPurple} />
                  </SvgGradient>
                  <SvgGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor={Colors.accentIndigo} stopOpacity="0.25" />
                    <Stop offset="100%" stopColor={Colors.accentIndigo} stopOpacity="0.01" />
                  </SvgGradient>
                </Defs>
                <Polygon points={fillPoints} fill="url(#fillGrad)" />
                <Polyline
                  points={polyPoints}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Current point dot */}
                <Circle
                  cx={points[points.length - 1].x}
                  cy={points[points.length - 1].y}
                  r={5}
                  fill={Colors.accentPurple}
                  stroke={Colors.bgPrimary}
                  strokeWidth={2}
                />
              </Svg>
            </Animatable.View>

            <View style={styles.chartAxisLabels}>
              <Text style={styles.axisLabel}>T-30 DAYS</Text>
              <Text style={styles.axisLabel}>T-15 DAYS</Text>
              <Text style={styles.axisLabel}>CURRENT CYCLE</Text>
            </View>
          </GlassCard>
        </Animatable.View>

        {/* Broker Network Coverage */}
        <Animatable.View animation="fadeInUp" delay={300}>
          <GlassCard style={styles.card}>
            <View style={styles.brokerTopRow}>
              <Text style={styles.sectionLabel}>BROKER NETWORK COVERAGE</Text>
              <MaterialCommunityIcons name="chart-bubble" size={20} color={Colors.accentIndigo} />
            </View>
            <View style={styles.brokerContent}>
              {/* Circular gauge */}
              <View style={styles.brokerGauge}>
                <Svg width={100} height={100}>
                  <Defs>
                    <SvgGradient id="brokerGrad" x1="0" y1="0" x2="1" y2="1">
                      <Stop offset="0%" stopColor={Colors.accentIndigo} />
                      <Stop offset="100%" stopColor={Colors.accentPurple} />
                    </SvgGradient>
                  </Defs>
                  <Circle cx={50} cy={50} r={40} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
                  <Circle
                    cx={50} cy={50} r={40}
                    fill="none"
                    stroke="url(#brokerGrad)"
                    strokeWidth={8}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * 0.18}
                    transform="rotate(-90 50 50)"
                  />
                </Svg>
                <View style={styles.brokerGaugeLabelWrap}>
                  <Text style={styles.brokerGaugeValue}>82%</Text>
                </View>
              </View>

              <View style={styles.brokerStats}>
                <BrokerStat label="Tier 1 Nodes" value="1,204" />
                <View style={styles.brokerDivider} />
                <BrokerStat label="Redundancy" value="Active" valueColor={Colors.success} />
                <View style={styles.brokerDivider} />
                <BrokerStat label="Coverage Rate" value="82%" valueColor={Colors.accentIndigo} />
              </View>
            </View>
            <Text style={styles.syncLabel}>LAST SYNC: 12:44:02 UTC</Text>
          </GlassCard>
        </Animatable.View>

        {/* Phishing Threat Vector */}
        <Animatable.View animation="fadeInUp" delay={400}>
          <GlassCard style={styles.card}>
            <View style={styles.brokerTopRow}>
              <Text style={styles.sectionLabel}>PHISHING THREAT VECTOR</Text>
              <View style={styles.alertIcon}>
                <Ionicons name="alert-circle" size={18} color={Colors.warning} />
              </View>
            </View>
            <View style={styles.threatBars}>
              {[
                { label: 'Email Phishing', val: 78, color: Colors.critical },
                { label: 'SMS Smishing', val: 54, color: Colors.warning },
                { label: 'Voice Vishing', val: 36, color: Colors.accentIndigo },
                { label: 'Social Eng.', val: 22, color: Colors.accentPurple },
              ].map((t, i) => (
                <Animatable.View key={i} animation="fadeInLeft" delay={400 + i * 80} style={styles.threatRow}>
                  <Text style={styles.threatLabel}>{t.label}</Text>
                  <View style={styles.threatTrack}>
                    <Animatable.View
                      animation="slideInLeft"
                      delay={500 + i * 80}
                      style={[styles.threatFill, { width: `${t.val}%`, backgroundColor: t.color }]}
                    />
                  </View>
                  <Text style={[styles.threatVal, { color: t.color }]}>{t.val}%</Text>
                </Animatable.View>
              ))}
            </View>
          </GlassCard>
        </Animatable.View>

        {/* Data Removal Progress */}
        <Animatable.View animation="fadeInUp" delay={500}>
          <GlassCard style={styles.card}>
            <Text style={styles.sectionLabel}>DATA REMOVAL PROGRESS</Text>
            <View style={styles.removalGrid}>
              {[
                { label: 'Records Found', value: '2,847', color: Colors.critical },
                { label: 'In Progress', value: '342', color: Colors.warning },
                { label: 'Confirmed Removed', value: '2,505', color: Colors.success },
                { label: 'Success Rate', value: '88%', color: Colors.accentIndigo },
              ].map((item, i) => (
                <Animatable.View key={i} animation="zoomIn" delay={600 + i * 80} style={[styles.removalCell, { borderColor: `${item.color}25`, backgroundColor: `${item.color}08` }]}>
                  <Text style={[styles.removalValue, { color: item.color }]}>{item.value}</Text>
                  <Text style={styles.removalLabel}>{item.label}</Text>
                </Animatable.View>
              ))}
            </View>
          </GlassCard>
        </Animatable.View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const BrokerStat = ({ label, value, valueColor }) => (
  <View style={bsStyles.row}>
    <Text style={bsStyles.label}>{label}</Text>
    <Text style={[bsStyles.value, valueColor && { color: valueColor }]}>{value}</Text>
  </View>
);

const bsStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 12, color: Colors.textMuted },
  value: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  grid: { ...StyleSheet.absoluteFillObject },
  gridV: { position: 'absolute', top: 0, bottom: 0, width: StyleSheet.hairlineWidth, backgroundColor: 'rgba(99,102,241,0.07)' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerLogo: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerBrand: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 4 },
  headerRight: { flexDirection: 'row', gap: 10 },
  headerBtn: { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.bgCard, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.borderSubtle },
  bellDot: { position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.critical, borderWidth: 1.5, borderColor: Colors.bgPrimary },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  pageTitle: { fontSize: 30, fontWeight: '800', color: Colors.textPrimary, lineHeight: 36 },
  pageSubtitle: { fontSize: 13, color: Colors.textMuted, marginTop: 4 },
  systemBadge: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1, alignItems: 'center', gap: 6 },
  sysDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success },
  sysText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary, letterSpacing: 1, textAlign: 'center' },
  card: { marginBottom: 14 },
  chartTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  chartLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 2, marginBottom: 6 },
  chartValueRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  chartValue: { fontSize: 36, fontWeight: '800', color: Colors.textPrimary },
  deltaChip: { backgroundColor: Colors.criticalDim, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  deltaText: { fontSize: 12, color: Colors.critical, fontWeight: '600' },
  chartActions: { gap: 6 },
  chartActionBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: Colors.borderSubtle },
  chartActionBtnActive: { backgroundColor: 'rgba(99,102,241,0.18)', borderColor: Colors.borderGlow },
  chartActionText: { fontSize: 10, color: Colors.textMuted, fontWeight: '700', letterSpacing: 1 },
  chartAxisLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  axisLabel: { fontSize: 10, color: Colors.textDim, letterSpacing: 0.5 },
  brokerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 2.5 },
  brokerContent: { flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 12 },
  brokerGauge: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  brokerGaugeLabelWrap: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  brokerGaugeValue: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  brokerStats: { flex: 1, gap: 10 },
  brokerDivider: { height: 1, backgroundColor: Colors.borderSubtle },
  syncLabel: { fontSize: 10, color: Colors.textDim, letterSpacing: 1.5 },
  alertIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: Colors.warningDim, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: `${Colors.warning}33` },
  threatBars: { gap: 14, marginTop: 4 },
  threatRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  threatLabel: { width: 90, fontSize: 12, color: Colors.textMuted },
  threatTrack: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' },
  threatFill: { height: '100%', borderRadius: 3 },
  threatVal: { width: 36, fontSize: 12, fontWeight: '700', textAlign: 'right' },
  removalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  removalCell: { width: '47%', borderRadius: 12, borderWidth: 1, padding: 14 },
  removalValue: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  removalLabel: { fontSize: 11, color: Colors.textMuted, lineHeight: 16 },
});

export default AnalyticsScreen;

