import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors, DefaultStyles} from '@magicwallet/styles';
import {FormListItem} from '@magicwallet/views';
import {useAppSelector} from '../../../core/hooks';
import {GetCurrentWallet} from '../../wallet/selector';

export const SettingsScreen: React.FC<Props<Screen.SETTINGS>> = ({navigation}) => {
  const state = useAppSelector(s => s);
  //const currency = GetCurrencySelector(state);
  const currentWallet = GetCurrentWallet(state);

  const items: {
    title: string;
    subtitle?: string;
    onPress: () => void;
  }[] = [
    {
      title: 'Wallets',
      onPress: () => {
        navigation.navigate(Screen.WALLETS);
      },
      subtitle: currentWallet.name,
    },
    // {
    //   title: 'Currency',
    //   onPress: () => {
    //     navigation.navigate(Screen.CURRENCY);
    //   },
    //   subtitle: currency,
    // },
    {
      title: 'About Us',
      onPress: () => {
        navigation.navigate(Screen.ABOUT_US);
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={DefaultStyles.list}
        data={items}
        renderItem={({item}) => <FormListItem title={item.title} subtitle={item.subtitle} onPress={item.onPress} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
});
