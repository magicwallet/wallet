import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors, DefaultStyles} from '@magicwallet/styles';
import {FormListItem} from '@magicwallet/views';
import {useAppSelector} from '../../../core/hooks';
import {getWalletsSelector} from '../../../core/selectors/wallets-selectors';

export const WalletsScreen: React.FC<Props<Screen.WALLETS>> = ({navigation}) => {
  const state = useAppSelector(s => s);
  const wallets = getWalletsSelector(state);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={DefaultStyles.list}
        data={wallets}
        renderItem={({item}) => (
          <FormListItem
            title={item.name}
            onPress={() => {
              navigation.navigate(Screen.WALLET_DETAILS, {wallet: item.wallet});
            }}
          />
        )}
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
