import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '@magicwallet/styles';
import {Touchable} from '@magicwallet/core-components';

export class FormListItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isChevronHidden?: boolean;
  image?: ImageSourcePropType;
  imageUri?: string;
  style?: ViewStyle;
}

export class FormListItem extends React.Component<FormListItemProps> {
  render() {
    return (
      <Touchable
        style={{...styles.touch, ...this.props.style}}
        onPress={this.props.onPress}>
        <View style={{...styles.container, ...this.props.style}}>
          {this.props.image ? (
            <View style={styles.image_container}>
              {this.props.imageUri ? (
                <FastImage
                  style={styles.image}
                  source={{uri: this.props.imageUri}}
                />
              ) : (
                <Image style={styles.image} source={this.props.image} />
              )}
            </View>
          ) : undefined}
          <View style={styles.text_container}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subtitle}>{this.props.subtitle}</Text>
          </View>
          {!this.props.isChevronHidden ? (
            <View style={styles.chevron_container}>
              <Image
                style={styles.chevron}
                source={require('./assets/chevron.png')}
              />
            </View>
          ) : undefined}
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: Colors.LIGHT_BLACK,
    paddingVertical: 16,
  },
  touch: {
    borderRadius: 6,
    marginVertical: 6,
    backgroundColor: Colors.LIGHT_BLACK,
  },
  text_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingLeft: 12,
    paddingRight: 10,
  },
  image_container: {
    justifyContent: 'center',
    marginLeft: 12,
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.WHITE,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.GRAY,
    textAlign: 'right',
  },
  chevron_container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 16,
  },
  chevron: {
    height: 12,
    width: 12,
  },
});
