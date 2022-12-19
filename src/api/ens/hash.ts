import {keccak_256} from 'js-sha3';
import {toUnicode} from 'idna-uts46-hx';
import {Buffer} from 'buffer';

export const hash = (input: string) => {
  let node = '';
  for (let i = 0; i < 32; i++) {
    node += '00';
  }

  let name = normalize(input);
  if (name) {
    let labels = name.split('.');

    for (var i = labels.length - 1; i >= 0; i--) {
      var labelSha = keccak_256(labels[i]);
      const buf = Buffer.from(node + labelSha, 'hex');
      node = keccak_256(buf);
    }
  }

  return '0x' + node;
};

const normalize = (input: string) => {
  return input ? toUnicode(input, {useStd3ASCII: true}) : input;
};
