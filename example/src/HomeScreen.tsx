import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomStyleSheet, ThemeType, useMyTheme, useUpdateMyTheme } from 'rn-custom-style-sheet';

const styleSheet = (themeType: ThemeType) =>
  CustomStyleSheet.createScaledTheme(
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
      button: {
        borderRadius: '10@s',
        backgroundColor: 'black',
        backgroundColorDark: 'white',
        width: '250@s',
        height: '45@vs',
        marginTop: '15@vs',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    themeType
  );

export const HomeScreen = () => {
  const styles = useMyTheme(styleSheet);
  const handleAppTheme = useUpdateMyTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Scaled' as never)}>
        <Text style={styles.text}>Scaled Style</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Theme' as never)}>
        <Text style={styles.text}>Theme Style</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('ScaledTheme' as never)}>
        <Text style={styles.text}>Scaled Theme Style</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => handleAppTheme('dark')}>
        <Text style={styles.text}>Dark Theme Apply</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => handleAppTheme('light')}>
        <Text style={styles.text}>Light Theme Apply</Text>
      </Pressable>
    </View>
  );
};
