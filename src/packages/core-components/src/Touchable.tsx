import {TouchableNativeFeedback, Platform, TouchableHighlight, View} from 'react-native';
import React from 'react';

export const Touchable = (props: any) => {
  switch (Platform.OS) {
    case 'android':
      return (
        <TouchableNativeFeedback useForeground onPress={props.onPress} disabled={props.disabled}>
          <View style={{...props.style, overflow: 'hidden'}}>{props.children}</View>
        </TouchableNativeFeedback>
      );
    default:
      return (
        <TouchableHighlight
          style={props.style}
          onPress={props.onPress}
          underlayColor={props.underlayColor}
          disabled={props.disabled}>
          {props.children}
        </TouchableHighlight>
      );
  }
};
