import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

const STATUS_CONFIG = {
  nominal: { color: Colors.success, bg: Colors.successDim, label: 'NOMINAL' },
  warning: { color: Colors.warning, bg: Colors.warningDim, label: 'WARNING' },
  critical: { color: Colors.critical, bg: Colors.criticalDim, label: 'CRITICAL' },
  active: { color: Colors.success, bg: Colors.successDim, label: 'ACTIVE' },
  pending: { color: Colors.warning, bg: Colors.warningDim, label: 'PENDING' },
  vigilant: { color: Colors.accentIndigo, bg: Colors.glowIndigo, label: 'VIGILANT' },
};

const StatusBadge = ({ status = 'nominal', label, dot = false, style }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.nominal;
  const displayLabel = label || config.label;

  return (
    <View style={[styles.badge, { backgroundColor: config.bg, borderColor: `${config.color}33` }, style]}>
      {dot && <View style={[styles.dot, { backgroundColor: config.color }]} />}
      <Text style={[styles.label, { color: config.color }]}>{displayLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});

export default StatusBadge;

