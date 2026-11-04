import { useCallback, useState } from 'react';

/**
 * Biometrics hook placeholder.
 * Install `react-native-biometrics` and restore the full implementation when needed.
 */
const useBiometrics = () => {
  const [supported] = useState(false);

  const notConfigured = useCallback(async () => {
    throw new Error(
      'Biometrics is not configured. Install react-native-biometrics and implement useBiometrics.',
    );
  }, []);

  const CreateBiometricKey = useCallback(async (): Promise<string | null> => {
    await notConfigured();
    return null;
  }, [notConfigured]);

  const DeleteBiometricKeys = useCallback(async (): Promise<boolean> => {
    await notConfigured();
    return false;
  }, [notConfigured]);

  const LoginWithBiometric = useCallback(async (): Promise<
    | {
        signature: string | undefined;
        salt: string;
      }
    | undefined
  > => {
    await notConfigured();
    return undefined;
  }, [notConfigured]);

  return {
    supported,
    CreateBiometricKey,
    DeleteBiometricKeys,
    LoginWithBiometric,
  };
};

export default useBiometrics;
