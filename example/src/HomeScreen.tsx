import React, { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppThemeModeEnum,
  CustomStyleSheet,
  type MediaQueryAllQueryable,
  type StyleSheetPropsType,
  useDevice,
  useTheme,
  useUpdateTheme,
} from 'rn-custom-style-sheet';
import { MultiTheme } from './ThemeColors';

const styleSheet = (styleOption: StyleSheetPropsType) =>
  CustomStyleSheet.create(
    {
      'screen': {
        flex: 1,
        flexDir: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          MultiTheme[styleOption.themeName]?.[styleOption.themeMode]
            ?.srnBackgroundColor,
      },
      'text': {
        fontWeight: 'bold',
        fontSize: '12@ms0.25t0.45',
        color:
          MultiTheme[styleOption.themeName]?.[styleOption.themeMode]?.txtColor,
      },
      'text1': {
        fontWeight: 'bold',
        fontSize: ['12@mhs', '14@mhs', '16@mhs', '18@mhs'],
        color:
          MultiTheme[styleOption.themeName]?.[styleOption.themeMode]?.txtColor,
      },
      '@media (orientation: landscape)': {
        text: {
          fontSize: '12@mhs',
        },
        text1: {
          fontSize: {
            base: '12@mhs',
            sm: '14@mhs',
            md: '16@mhs',
            lg: '18@mhs',
          },
        },
      },
      'button': {
        borderRadius: '10@s',
        backgroundColor:
          MultiTheme[styleOption.themeName]?.[styleOption.themeMode]
            ?.btnBackgroundColor,
        width: '75@vw',
        height: '6@vh',
        mt: '15@vs',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: '4@mhs',
        shadowOffset: {
          width: '0@hs',
          height: '5@mhs',
        },
        shadowOpacity: 0.99,
        shadowRadius: '2.62@mhs',
        shadowColor:
          MultiTheme[styleOption.themeName]?.[styleOption.themeMode]
            ?.btnShadowColor,
      },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleThemeStyle = useCallback(() => {
    navigation.navigate('Theme' as never);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleMediaQuery = useCallback(() => {
    navigation.navigate('MediaQuery' as never);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleStyleComponent = useCallback(() => {
    navigation.navigate('StyleComponent' as never);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleThemeDark = useCallback(() => {
    handleAppTheme(undefined, AppThemeModeEnum.Dark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleThemeLight = useCallback(() => {
    handleAppTheme(undefined, AppThemeModeEnum.Light);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleThemeSummer = useCallback(() => {
    handleAppTheme('summer', undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleThemeWinter = useCallback(() => {
    handleAppTheme('winter', undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleThemeMonsoon = useCallback(() => {
    handleAppTheme('monsoon', undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.screen}>
      <Pressable style={styles.button} onPress={handleScaleStyle}>
        <Text style={styles.text}>Scaled Style</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleThemeStyle}>
        <Text style={styles.text}>Theme Style</Text>
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
      <Pressable style={styles.button} onPress={handleThemeSummer}>
        <Text style={styles.text}>Summer Theme Apply</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleThemeWinter}>
        <Text style={styles.text}>Winter Theme Apply</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleThemeMonsoon}>
        <Text style={styles.text}>Monsoon Theme Apply</Text>
      </Pressable>
    </View>
  );
};
