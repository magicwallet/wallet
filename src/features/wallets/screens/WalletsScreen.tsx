import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors, DefaultStyles, MagicButtonStyle} from '@magicwallet/styles';
import {FormListItem, MagicButton} from '@magicwallet/views';
import {
  walletsDeleteWallet,
  walletsSelectWallet,
} from '../../../core/reducers/wallets';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {getWalletsSelector} from '../index';

export const WalletsScreen: React.FC<Props<Screen.WALLETS>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
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
              dispatch(walletsSelectWallet(item.wallet)).then(_ => {
                navigation.goBack();
                navigation.pop();
              });
            }}
          />
        )}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.BLACK,
        }}>
        <Text>Current Wallet: {state.wallets.current}</Text>

        <MagicButton
          style={MagicButtonStyle.normal}
          title={'Delete Wallet'}
          onPress={() => {
            //TODO: Fix
            // @ts-ignore
            dispatch(walletsDeleteWallet(state.wallets.current));
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
});
