import { NativeModules } from 'react-native';

type NativeCommonsType = {
  multiply(a: number, b: number): Promise<number>;
};

const { NativeCommons } = NativeModules;

export default NativeCommons as NativeCommonsType;
