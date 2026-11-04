import React from 'react';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastPosition,
  ToastProps,
} from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { logData } from './helper';

/**
 * Shows a success toast message.
 *
 * @param title Title of the toast message.
 * @param description Description of the toast message.
 * @param position Position of the toast message.
 * @param duration Duration of the toast message.
 */

export const SuccessMessage = (
  description = '',
  title = 'Success',
  position: ToastPosition = 'top',
  duration = 3000,
) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: description,
    position: position,
    visibilityTime: duration,
  });
};

/**
 * Displays an error toast message.
 *
 * @param title - The title of the toast message.
 * @param description - The description of the toast message.
 * @param position - The position where the toast message will appear. Defaults to 'top'.
 * @param duration - The duration for which the toast message is visible. Defaults to 3000ms.
 */

export const ErrorMessage = (
  description = '',
  title = 'Error',
  position: ToastPosition = 'top',
  duration = 3000,
) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: description,
    position: position,
    visibilityTime: duration,
  });
};

/**
 * Displays an information toast message.
 *
 * @param title - The title of the toast message.
 * @param description - The description of the toast message.
 * @param position - The position where the toast message will appear. Defaults to 'top'.
 * @param duration - The duration for which the toast message is visible. Defaults to 3000ms.
 */

export const InfoMessage = (
  description = '',
  title = 'Info',
  position: ToastPosition = 'top',
  duration = 3000,
) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: description,
    position: position,
    visibilityTime: duration,
  });
};

/**
 * Handles the response data from a paginated API call.
 *
 * The function takes the response data, the existing data, the setData function,
 * the setTotalPages function, and the current page number as parameters.
 *
 * If the response data contains data, it sets the total pages and updates the data.
 * If the page is 1, it sets the data to the response data. Otherwise, it appends
 * the response data to the existing data.
 *
 * @param responseData - The response data from the API call.
 * @param data - The existing data.
 * @param setData - The function to update the data.
 * @param setTotalPages - The function to update the total pages.
 * @param page - The current page number.
 */

export const handleResponsePagination = (
  responseData: any,
  data: any,
  setData: any,
  setTotalPages: any,
  page: number,
) => {
  if (responseData?.data) {
    setTotalPages(responseData?.totalPages);
    if (page === 1) {
      setData(responseData?.data);
    } else {
      setData([...data, ...responseData?.data]);
    }
  }
};

/**
 * Stores a value in AsyncStorage, using the key as the key for the entry.
 *
 * The value is converted to a string before being stored.
 *
 * @param key - The key to use for the AsyncStorage entry.
 * @param value - The value to store in the AsyncStorage entry.
 */

export const storeAsyncStorage = async (
  key: string,
  value: string,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log('error in token storing...');
  }
};

/**
 * Retrieves a value from AsyncStorage using the provided key.
 *
 * The value is returned as a string. If the key is not found, the function returns null.
 *
 * @param key - The key to use for the AsyncStorage entry.
 * @returns The value stored in the AsyncStorage entry, or null if the key is not found.
 */

export const getAsyncStorage = async (
  key: string,
): Promise<string | boolean | undefined> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log('token key not found');
    return false;
  }
};

/**
 * Removes the AsyncStorage entry for the given key.
 *
 * @param key - The key to use for the AsyncStorage entry.
 * @returns A boolean indicating whether the key was successfully removed. If the key is not found, the function returns false.
 */

export const clearAsyncKey = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    // error removing value
    console.log('key not found');
    return false;
  }
};

type Success<T> = [data: T, error: null];

type Failure<E> = [data: null, error: E];

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
  finallyCallBackFunction?: VoidFunction,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as E];
  } finally {
    finallyCallBackFunction?.();
  }
}

const commonStyles = {
  container: {
    borderLeftWidth: 0,
    width: '92%',
    height: '100%',
    backgroundColor: undefined,
    top: 40,
  },
  contentContainer: { paddingHorizontal: 15, paddingVertical: 15 },
  text1White: { fontSize: 17, color: 'white' },
  text2White: { fontSize: 15, color: 'white' },
  text1Black: { fontSize: 17, color: 'black' },
  text2Black: { fontSize: 15, color: 'black' },
};

export const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ ...commonStyles.container, backgroundColor: 'green' }}
      contentContainerStyle={commonStyles.contentContainer}
      text1Style={commonStyles.text1White}
      text2Style={commonStyles.text2White}
      text2NumberOfLines={5}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ ...commonStyles.container, backgroundColor: 'red' }}
      contentContainerStyle={commonStyles.contentContainer}
      text1Style={commonStyles.text1White}
      text2Style={commonStyles.text2White}
      text2NumberOfLines={5}
    />
  ),
  info: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        ...commonStyles.container,
        backgroundColor: 'white',
        borderLeftWidth: 6,
      }}
      contentContainerStyle={commonStyles.contentContainer}
      text1Style={commonStyles.text1Black}
      text2Style={commonStyles.text2Black}
      text2NumberOfLines={5}
    />
  ),
};

export const getCameraPermission = async () => {
  try {
    const cameraPermission = Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA,
    });
    if (!cameraPermission) {
      ErrorMessage('Camera permission not available for this platform.');
      logData(
        'Camera permission not available for this platform.',
        cameraPermission,
      );
      return false;
    }
    let result = await check(cameraPermission);
    if (result === RESULTS.DENIED) {
      result = await request(cameraPermission);
    }
    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      ErrorMessage('Camera permission denied or blocked');
      logData('Camera permission denied or blocked: ', result);
      return false;
    }
  } catch (err: any) {
    ErrorMessage(err);
    logData('Error while getting camera permission: ', err);
    return false;
  }
};
