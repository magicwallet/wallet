import {GestureResponderEvent, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Colors, FontWeight, MagicButtonStyle} from '@magicwallet/styles';
import {Touchable} from '@magicwallet/core-components';

export interface MagicButtonProps {
  title: string;
  style: MagicButtonStyle;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  disabled: boolean;
}

export class MagicButton extends React.Component<MagicButtonProps> {
  render() {
    let buttonStyle = MagicButtonStyle.getStyle(this.props.style);
    return (
      <Touchable
        style={{
          ...styles.container,
          backgroundColor: this.props.disabled ? Colors.GRAY : buttonStyle.backgroundColor,
        }}
        disabled={this.props.disabled}
        underlayColor={buttonStyle.underlayColor}
        onPress={this.props.onPress}>
        <Text style={styles.title}>{this.props.title}</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 15,
    //width: 260,
  },
  title: {
    fontSize: 16,
    fontWeight: FontWeight.SEMI_BOLD,
    color: Colors.WHITE,
    textAlign: 'center',
  },
});
