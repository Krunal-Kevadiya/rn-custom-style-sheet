import React, { useCallback } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  CustomStyleSheet,
  MediaQueryAllQueryable,
  StyleSheetOption,
  useDevice,
  useTheme,
  useUpdateTheme
} from 'rn-custom-style-sheet';

const styleSheet = (styleOption: StyleSheetOption) =>
  CustomStyleSheet.create(
    {
      screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        backgroundColorDark: 'black'
      },
      text: {
        fontWeight: 'bold',
        fontSize: '14@ms',
        color: 'white',
        colorDark: 'black'
      },
      '@media (orientation: portrait)': {
        text: {
          fontSize: '8@ms'
        }
      },
      button: {
        borderRadius: '10@s',
        backgroundColor: 'black',
        backgroundColorDark: 'white',
        width: '250@s',
        height: '45@vs',
        marginTop: '15@vs',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: '4@s',
        shadowOffset: {
          width: '0@s',
          height: '5@s'
        },
        shadowOpacity: 0.99,
        shadowRadius: '2.62@s',
        shadowColor: 'red',
        shadowColorDark: 'orange'
      }
    },
    styleOption
  );

export const HomeScreen = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const { styles } = useTheme(styleSheet, device);
  const handleAppTheme = useUpdateTheme();
  const navigation = useNavigation();

  const handleScaleStyle = useCallback(() => {
    navigation.navigate('Scaled' as never);
  }, []);
  const handleThemeStyle = useCallback(() => {
    navigation.navigate('Theme' as never);
  }, []);
  const handleThemeScaleStyle = useCallback(() => {
    navigation.navigate('ScaledTheme' as never);
  }, []);
  const handleMediaQuery = useCallback(() => {
    navigation.navigate('MediaQuery' as never);
  }, []);
  const handleStyleComponent = useCallback(() => {
    navigation.navigate('StyleComponent' as never);
  }, []);
  const handleThemeDark = useCallback(() => {
    handleAppTheme('dark');
  }, []);
  const handleThemeLight = useCallback(() => {
    handleAppTheme('light');
  }, []);

  return (
    <View style={styles.screen}>
      <Pressable style={styles.button} onPress={handleScaleStyle}>
        <Text style={styles.text}>Scaled Style</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleThemeStyle}>
        <Text style={styles.text}>Theme Style</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleThemeScaleStyle}>
        <Text style={styles.text}>Scaled Theme Style</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleMediaQuery}>
        <Text style={styles.text}>Media Query</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleStyleComponent}>
        <Text style={styles.text}>Style Component</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleThemeDark}>
        <Text style={styles.text}>Dark Theme Apply</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleThemeLight}>
        <Text style={styles.text}>Light Theme Apply</Text>
      </Pressable>
    </View>
  );
};
