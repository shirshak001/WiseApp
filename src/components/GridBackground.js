import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors } from '../theme/colors';

const GridBackground = ({ style }) => {
  const gridLines = [];
  const cols = 20;
  const rows = 40;

  for (let i = 0; i <= cols; i++) {
    gridLines.push(
      <Line
        key={`v${i}`}
        x1={`${(i / cols) * 100}%`}
        y1="0%"
        x2={`${(i / cols) * 100}%`}
        y2="100%"
        stroke="rgba(99,102,241,0.08)"
        strokeWidth="0.5"
      />
    );
  }

  for (let i = 0; i <= rows; i++) {
    gridLines.push(
      <Line
        key={`h${i}`}
        x1="0%"
        y1={`${(i / rows) * 100}%`}
        x2="100%"
        y2={`${(i / rows) * 100}%`}
        stroke="rgba(99,102,241,0.06)"
        strokeWidth="0.5"
      />
    );
  }

  return (
    <View style={[StyleSheet.absoluteFill, style]} style={{ pointerEvents: "none" }}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={Colors.bgPrimary} stopOpacity="0" />
            <Stop offset="100%" stopColor={Colors.bgPrimary} stopOpacity="0.8" />
          </LinearGradient>
        </Defs>
        {gridLines}
      </Svg>
    </View>
  );
};

export default GridBackground;

