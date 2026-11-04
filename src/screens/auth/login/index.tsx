import React from 'react';
import { AppHeader, Text, ScreenWrapper } from '~components';
import { LoginScreenProps } from './types';
import Config from 'react-native-config';

const Login = ({ navigation, route }: LoginScreenProps) => {
  // Screen params
  // const {key,values, ...rest of params} = route.params

  // This is used to get the current theme colors, its used like this: theme.generalBackgroundColor
  // const { theme } = useTheme();

  // Selectors and event dispatchers
  // const mode = useSelector(selectedMode);  This is used to get the current theme mode, its used like this mode==SELECTED_MODE.DARK
  // const dispatch = useDispatch();

  // Refs
  // const modalRef = useRef<ModalRef>(null);

  // States
  // const [data, setData] = useState({});

  // Hook form
  // const { control } = useForm();

  // Query Hooks
  // const [userLogin] = useUserLoginMutation();
  // const { data } = useGetProfile({});

  // Imperative handlers
  // useImperativeHandle(ref, () => ({
  //   function_name: () => {
  //     function actions
  //   },
  // }));

  // useEffects, callBacks and memos
  // useEffect(() => {
  //   user actions
  // }, []);

  // Helper functions
  // const isEven = (num: number) => {
  //   return num % 2 == 0;
  // };

  // Api call Functions
  // const getProfile = async () => {
  //   const [apiRes, apiError] = await tryCatch(
  //     userLogin({ email: 'dummy@gmail.com', password: 'Abc@1234' }),
  //   );
  //   if (apiError) {
  //     ErrorMessage(apiError?.data?.error ?? 'Error occurred while login');
  //     console.log('Error occurred while login: ', apiError);
  //     return;
  //   }
  //   dispatch(setToken(apiRes));
  // };

  // Render functions
  // const RenderItem = () => (
  //   <View>
  //     <View></View>
  //   </View>
  // );

  return (
    <ScreenWrapper>
      <AppHeader title="Login" />
      <Text variant="title">ENV: {Config.ENV || 'undefined'}</Text>
      <Text variant="title">BASEURL: {Config.BASEURL || 'undefined'}</Text>
      <Text variant="title">Config Keys: {Object.keys(Config).join(', ')}</Text>
    </ScreenWrapper>
  );
};

export default Login;
