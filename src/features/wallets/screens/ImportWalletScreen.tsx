import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Screen, ScreenNavigationProp} from '@magicwallet/navigation';
import {Colors, MagicButtonStyle} from '@magicwallet/styles';
import {MagicButton} from '@magicwallet/views';
import {walletsAddWallet} from '../../../core/reducers/wallets';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {Asset, Chain} from '@magicwallet/chain-types';
import {ChainView} from '../ChainView';
import {GetAssetResource} from '../../../assets/asset-resource';
import {walletName} from '../wallets-selector';
import {useFormikContext, Formik, FormikErrors, FormikProps} from 'formik';
import {resolve} from 'src/api/ens/resolver';
import {useNavigation} from '@react-navigation/native';
import {ContractService} from '@magicwallet/chain-services';

interface FormValues {
  name: string;
  address: string;
  chain: Chain;
  resolvedAddress?: string;
}

export const ImportWalletScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp<Screen.IMPORT_WALLET>>();
  const defaultChain = Chain.BNB_CHAIN;

  const state = useAppSelector(s => s.wallets.wallets);
  const dispatch = useAppDispatch();

  const assetResource = GetAssetResource(new Asset(defaultChain))!;
  const walletsCount = state.filter(wallet => wallet.accounts[0].chain === defaultChain).length;

  const initialValues: FormValues = {
    name: walletName(assetResource, walletsCount),
    address: '',
    chain: Chain.BNB_CHAIN,
  };

  const validate = async (values: FormValues): Promise<FormikErrors<FormValues>> => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = 'Wallet name is required';
    }

    if (!values.address) {
      errors.address = 'Address is required';
    }

    return errors;
  };

  const onSubmit = (values: FormValues) => {
    const address = values.resolvedAddress ? values.resolvedAddress : values.address;
    const domainName = values.resolvedAddress ? values.address : null;
    dispatch(walletsAddWallet(values.name, values.chain, address, domainName));
    navigation.navigate(Screen.WALLET);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
        {props => <InnerForm {...props} />}
      </Formik>
    </SafeAreaView>
  );
};

const InnerForm = ({
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  resetForm,
  errors,
  setFieldValue,
}: FormikProps<FormValues>) => {
  const navigation = useNavigation<ScreenNavigationProp<Screen.IMPORT_WALLET>>();
  const {values: contextValues} = useFormikContext<FormValues>();
  const state = useAppSelector(s => s.wallets.wallets);
  const [resolvedAddress, setResolvedAddress] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const service = new ContractService();

  React.useEffect(() => {
    setIsLoading(true);
    resolve(contextValues.address, contextValues.chain, service).then(result => {
      setFieldValue('resolvedAddress', result);
      setResolvedAddress(result);
      setIsLoading(false);
    });

    setIsLoading(false);
  }, [contextValues.address, contextValues.chain]);

  const createWalletName = (chain: Chain) => {
    const assetResource = GetAssetResource(new Asset(chain))!;
    return walletName(assetResource, state.length);
  };

  const handleChainViewOnPress = () => {
    navigation.navigate(Screen.SELECT_CHAIN, {
      chain: values.chain,
      selectChain: chain => {
        setFieldValue('chain', chain);

        resetForm({
          values: {
            name: createWalletName(chain),
            address: values.address,
            chain: chain,
          },
        });
      },
    });
  };

  const isImportDisabled = !!errors.name || !!errors.address;

  return (
    <View style={styles.form_container}>
      <ChainView chain={values.chain} onPress={handleChainViewOnPress} />
      <TextInput
        editable
        style={errors.name ? styles.input_name_error : styles.input_name}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        value={values.name}
        placeholder="Enter a wallet name"
        keyboardType="default"
        enablesReturnKeyAutomatically={true}
        placeholderTextColor={Colors.DARK_GRAY}
      />
      {errors.name ? <Text style={styles.error_text}>{errors.name}</Text> : null}

      <TextInput
        editable
        style={errors.address ? styles.input_error : styles.input}
        onChangeText={handleChange('address')}
        onBlur={handleBlur('address')}
        value={values.address}
        autoCapitalize="none"
        placeholder="Enter an address or an ENS name"
        keyboardType="default"
        placeholderTextColor={Colors.DARK_GRAY}
      />
      {isLoading ? <Text style={styles.input_domain_name}>X</Text> : null}
      {resolvedAddress ? <Text style={styles.input_domain_name}>{resolvedAddress}</Text> : null}
      {errors.address ? <Text style={styles.error_text}>{errors.address}</Text> : null}

      <View style={styles.footer}>
        <MagicButton
          disabled={isImportDisabled}
          style={MagicButtonStyle.normal}
          title={'Import Wallet'}
          onPress={() => handleSubmit()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  form_container: {
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
  input_domain_name: {
    color: Colors.GRAY,
    paddingLeft: 12,
    fontSize: 14,
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
