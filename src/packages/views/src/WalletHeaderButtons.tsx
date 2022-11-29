import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MagicButtonStyle} from '@magicwallet/styles';
import {MagicButton} from '@magicwallet/core-components/src/MagicButton';

export enum WalletHeaderAction {
  RECEIVE = 'RECEIVE',
  BUY = 'BUY',
}

export interface AssetListItemProps {
  onPress: (type: WalletHeaderAction) => void;
}

export class WalletHeaderButtons extends React.Component<AssetListItemProps> {
  render() {
    return (
      <View style={styles.container}>
        <MagicButton
          title={'Receive'}
          style={MagicButtonStyle.normal}
          onPress={_ => this.props.onPress(WalletHeaderAction.RECEIVE)}
        />
        <View style={{padding: 10}} />
        <MagicButton
          title={'Buy'}
          style={MagicButtonStyle.normal}
          onPress={_ => this.props.onPress(WalletHeaderAction.BUY)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
