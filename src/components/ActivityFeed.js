import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

const ActivityFeed = ({ items = [] }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.dotWrapper}>
            <View style={[styles.dot, { backgroundColor: item.color || Colors.accentIndigo }]} />
            {index < items.length - 1 && <View style={styles.line} />}
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.source} · {item.time}</Text>
          </View>
          {item.badge && (
            <View style={[styles.badge, { backgroundColor: `${item.badgeColor || Colors.accentIndigo}22`, borderColor: `${item.badgeColor || Colors.accentIndigo}44` }]}>
              <Text style={[styles.badgeText, { color: item.badgeColor || Colors.accentIndigo }]}>{item.badge}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dotWrapper: {
    alignItems: 'center',
    width: 16,
    marginRight: 12,
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  line: {
    width: 1,
    flex: 1,
    backgroundColor: Colors.borderSubtle,
    marginTop: 4,
    minHeight: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 3,
    letterSpacing: 0.2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default ActivityFeed;

