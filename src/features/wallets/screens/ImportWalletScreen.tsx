import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors, MagicButtonStyle} from '@magicwallet/styles';
import {MagicButton} from '@magicwallet/views';
import {walletsAddWallet} from '../../../core/reducers/wallets';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {Asset, Chain} from '@magicwallet/chain-types';
import {ChainView} from '../ChainView';
import {GetAssetResource} from '../../../assets/asset-resource';
import {walletName} from '../wallets-selector';
import {Formik, FormikErrors} from 'formik';

interface FormValues {
  name: string;
  address: string;
}

export const ImportWalletScreen: React.FC<Props<Screen.IMPORT_WALLET>> = ({navigation}) => {
  const [selectedChain, onChangeSelectedChain] = React.useState(Chain.BNB_CHAIN);

  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s.wallets.wallets);

  const walletsCount = state.filter(wallet => wallet.accounts[0].chain === selectedChain).length;

  const formikInitialValues: FormValues = {
    name: walletName(GetAssetResource(new Asset(selectedChain))!, walletsCount),
    address: '',
  };

  const validate = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = 'Wallet name is required';
    }

    if (!values.address) {
      errors.address = 'Address is required';
    }

    return errors;
  };

  const handleAddWallet = async (name: string, address: string) => {
    await dispatch(walletsAddWallet(name, selectedChain, address));
    navigation.navigate(Screen.WALLET);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validate={validate}
        initialValues={formikInitialValues}
        onSubmit={values => handleAddWallet(values.name, values.address)}>
        {({handleChange, handleSubmit, values, resetForm, errors}) => (
          <View style={styles.formik_container}>
            <ChainView
              chain={selectedChain}
              onPress={() => {
                navigation.navigate(Screen.SELECT_CHAIN, {
                  chain: selectedChain,
                  selectChain: chain => {
                    // Update the form with the currently selected values
                    const assetResource = GetAssetResource(new Asset(chain))!;
                    const name = walletName(assetResource, walletsCount);
                    resetForm({values: {name: name, address: values.address}});

                    // Update the local state
                    // TODO: move this state to component
                    onChangeSelectedChain(chain);
                  },
                });
              }}
            />
            <TextInput
              editable
              style={errors.name ? styles.input_name_error : styles.input_name}
              onChangeText={handleChange('name')}
              value={values.name}
              placeholder="Name"
              keyboardType="default"
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={Colors.DARK_GRAY}
            />
            {errors.name ? <Text style={styles.error_text}>{errors.name}</Text> : null}

            <TextInput
              editable
              style={errors.address ? styles.input_error : styles.input}
              onChangeText={handleChange('address')}
              value={values.address}
              placeholder="Enter an address"
              keyboardType="default"
              placeholderTextColor={Colors.DARK_GRAY}
            />
            {errors.address ? <Text style={styles.error_text}>{errors.address}</Text> : null}

            <View style={styles.footer}>
              <MagicButton
                disabled={!!errors.name || !!errors.address}
                style={MagicButtonStyle.normal}
                title={'Import Wallet'}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  formik_container: {
    flex: 1,
  },
  input_name: {
    color: Colors.WHITE,
    height: 44,
    margin: 12,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_BLACK,
    padding: 12,
    borderRadius: 6,
  },
  input_name_error: {
    color: Colors.WHITE,
    height: 44,
    margin: 12,
    borderWidth: 0.5,
    borderColor: Colors.RED,
    padding: 12,
    borderRadius: 6,
  },
  input: {
    color: Colors.WHITE,
    height: 80,
    margin: 12,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_BLACK,
    padding: 12,
    borderRadius: 6,
  },
  input_error: {
    color: Colors.WHITE,
    height: 80,
    margin: 12,
    borderWidth: 0.5,
    borderColor: Colors.RED,
    padding: 12,
    borderRadius: 6,
  },
  error_text: {
    marginLeft: 12,
    color: Colors.RED,
    fontSize: 16,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
