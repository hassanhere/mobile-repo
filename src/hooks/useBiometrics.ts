import { useEffect, useState } from "react";
// import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

const epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
const payload = epochTimeSeconds + "MySecretKey";

// const rnBiometrics = new ReactNativeBiometrics({
//   allowDeviceCredentials: true,
// });

const useBiometrics = () => {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    checkAvailability();
  }, []);

  const checkAvailability = async () => {
    try {
      const resultObject = await rnBiometrics.isSensorAvailable();
      const { available, biometryType, error } = resultObject;
      if (available && biometryType === BiometryTypes.TouchID) {
        setSupported(true);
        console.log("TouchID is supported");
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setSupported(true);
        console.log("FaceID is supported");
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setSupported(true);
        console.log("Biometrics is supported");
      } else {
        setSupported(false);
        if (error === "BIOMETRIC_ERROR_NONE_ENROLLED") {
          throw new Error(
            "Please register your biometric first from device settings"
          );
        } else {
          throw new Error("Biometrics not supported");
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const CreateBiometricKey = async (): Promise<string | null> => {
    try {
      const keysExistResult = await rnBiometrics.biometricKeysExist();
      if (keysExistResult.keysExist) {
        const resultObject = await rnBiometrics.deleteKeys();
        // const { keysDeleted } = resultObject;
        // if (!keysDeleted) {
        //   throw new Error("Biometric keys already exist");
        // }
      }
      const resultObject = await rnBiometrics.createKeys();
      const { publicKey } = resultObject;
      return publicKey;
    } catch (err) {
      throw new Error(err);
    }
  };

  const DeleteBiometricKeys = async (): Promise<boolean> => {
    try {
      const resultObject = await rnBiometrics.deleteKeys();
      return true;
    } catch (err) {
      throw new Error(err);
    }
  };

  const LoginWithBiometric = async (): Promise<
    | {
        signature: string | undefined;
        salt: string;
      }
    | undefined
  > => {
    try {
      const keysExistResult = await rnBiometrics.biometricKeysExist();
      if (!keysExistResult.keysExist) {
        throw new Error(
          "Please register your biometric first from app settings"
        );
      }
      const resultObject = await rnBiometrics.createSignature({
        promptMessage: "Sign in",
        payload: payload,
      });
      const { success, signature, error } = resultObject;
      if (success) {
        return {
          signature: signature,
          salt: payload,
        };
      } else if (error) {
        throw new Error(error);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return {
    supported,
    CreateBiometricKey,
    DeleteBiometricKeys,
    LoginWithBiometric,
  };
};

export default useBiometrics;
