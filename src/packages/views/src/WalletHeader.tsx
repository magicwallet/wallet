import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WalletHeaderButtons} from './WalletHeaderButtons';
import {
  WalletHeaderBalance,
  WalletHeaderBalanceProps,
} from './WalletHeaderBalance';

export enum WalletHeaderAction {
  RECEIVE = 'RECEIVE',
  BUY = 'BUY',
}

export interface AssetListItemProps {
  fiatValue: WalletHeaderBalanceProps;
  onPress: (type: WalletHeaderAction) => void;
}

export class WalletHeader extends React.Component<AssetListItemProps> {
  render() {
    return (
      <View style={styles.container}>
        <WalletHeaderBalance
          value={this.props.fiatValue.value}
          value_change={this.props.fiatValue.value_change}
          value_change_percentage={this.props.fiatValue.value_change_percentage}
        />
        <WalletHeaderButtons onPress={this.props.onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 12,
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
