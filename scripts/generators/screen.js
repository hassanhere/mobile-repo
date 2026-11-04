const fs = require('fs');
const path = require('path');

module.exports = function (args) {
  const section = args[0]; // auth/app/global
  let rawName = args[1];

  if (!rawName) {
    console.log('Missing screen name');
    process.exit(1);
  }

  // -----------------------------
  // REMOVE "screen" SUFFIX (ANY CASE)
  // -----------------------------

  rawName = rawName.replace(/screen$/i, '');

  if (!section || !rawName) {
    console.log('Usage: yarn generate screen auth TermsAndConditions');
    process.exit(1);
  }

  if (!['app', 'auth', 'global'].includes(section)) {
    console.log('Section must be app, auth or global');
    process.exit(1);
  }

  const screenName =
    rawName.charAt(0).toUpperCase() + rawName.slice(1) + 'Screen';

  const routeKey = rawName.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();

  const enumRoute = routeKey;

  const folderName = rawName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

  const screensRoot = path.join(process.cwd(), `src/screens/${section}`);

  const screenDir = path.join(screensRoot, folderName);

  const screensIndex = path.join(screensRoot, 'index.ts');

  const routesFile = path.join(process.cwd(), 'src/routes/routes.ts');

  let routes = fs.readFileSync(routesFile, 'utf8');

  if (fs.existsSync(screenDir)) {
    console.log(`❌ Screen folder already exists: ${screenDir}`);
    process.exit(1);
  }

  const routeExists = new RegExp(`${enumRoute}\\s*=\\s*'${rawName}'`).test(
    routes,
  );

  if (routeExists) {
    console.log(`❌ Screen "${rawName}" already exists in routes.ts`);
    process.exit(1);
  }

  fs.mkdirSync(screenDir, { recursive: true });

  /* index.tsx */

  fs.writeFileSync(
    path.join(screenDir, 'index.tsx'),
    `import React from 'react';
import { AppHeader, ScreenWrapper } from '~components';
import {
  ${rawName}FormValidationTypes,
  ${screenName}Props,
} from './types';
import { View } from 'react-native';
import styles from './styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ${rawName}FormValidation from './validation';

const ${screenName} = ({
  navigation,
  route,
}: ${screenName}Props) => {

 const { handleSubmit } =
 useForm<${rawName}FormValidationTypes>({
   mode:'all',
   resolver:yupResolver(
    ${rawName}FormValidation
   )
 });

 return (
   <ScreenWrapper>
     <View style={styles.container}>
       <AppHeader title={'${rawName.replace(/([A-Z])/g, ' $1').trim()}'} />
     </View>
   </ScreenWrapper>
 );
};

export default ${screenName};
`,
  );

  /* styles */

  fs.writeFileSync(
    path.join(screenDir, 'styles.ts'),
    `import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 container:{
   flex:1
 }
});

export default styles;
`,
  );

  /* types */

  fs.writeFileSync(
    path.join(screenDir, 'types.ts'),
    `import {
 RootStackNavigationProp,
 RootStackRouteProp,
 ScreenNames,
} from '~routes/routes';

export type ${screenName}Props = {
 navigation:
  RootStackNavigationProp<
   ScreenNames.${enumRoute}
 >;

 route:
  RootStackRouteProp<
   ScreenNames.${enumRoute}
 >;
};

export interface ${rawName}FormValidationTypes{
 title:string;
}
`,
  );

  /* validation */

  fs.writeFileSync(
    path.join(screenDir, 'validation.ts'),
    `import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import {
 ${rawName}FormValidationTypes
} from './types';

const ${rawName}FormValidation:
ObjectSchema<
 ${rawName}FormValidationTypes
> =
yup.object().shape({
 title:
  yup.string()
   .required(
    'Title is required'
   )
});

export default ${rawName}FormValidation;
`,
  );

  /* export in screen folder */

  const exportLine = `export { default as ${screenName} } from './${folderName}';`;

  if (fs.existsSync(screensIndex)) {
    const old = fs.readFileSync(screensIndex, 'utf8');

    if (!old.includes(exportLine)) {
      fs.appendFileSync(screensIndex, `\n${exportLine}`);
    }
  }

  /* update routes.ts */

  if (!routes.includes(`${enumRoute} = '${rawName}'`)) {
    routes = routes.replace(
      /export enum ScreenNames\s*{/,
      match =>
        `${match}
  ${enumRoute} = '${rawName}',`,
    );

    routes = routes.replace(
      /export type RootStackParamList = \{/,
      match =>
        `${match}
  [ScreenNames.${enumRoute}]:
   undefined;`,
    );

    fs.writeFileSync(routesFile, routes);
  }

  /* update navigator stack */

  // -----------------------------
  // UPDATE STACKS
  // -----------------------------

  const stackFiles =
    section === 'global'
      ? [
          path.join(process.cwd(), 'src/routes/app-stack.tsx'),
          path.join(process.cwd(), 'src/routes/auth-stack.tsx'),
        ]
      : [
          section === 'auth'
            ? path.join(process.cwd(), 'src/routes/auth-stack.tsx')
            : path.join(process.cwd(), 'src/routes/app-stack.tsx'),
        ];

  stackFiles.forEach(stackFile => {
    let stack = fs.readFileSync(stackFile, 'utf8');

    // -------------------------
    // Fix import from "~screens"
    // -------------------------

    const screenImportName = screenName;

    const screensImportRegex =
      /import\s*\{([^}]*)\}\s*from\s*['"]~screens['"];?/;

    if (screensImportRegex.test(stack)) {
      stack = stack.replace(screensImportRegex, (match, imports) => {
        const allImports = imports
          .split(',')
          .map(x => x.trim())
          .filter(Boolean);

        if (!allImports.includes(screenImportName)) {
          allImports.push(screenImportName);
        }

        return `import { ${allImports.join(', ')} } from '~screens';`;
      });
    } else {
      stack =
        `import { ${screenImportName} } from '~screens';
` + stack;
    }

    // -------------------------
    // Add Screen in Navigator
    // -------------------------

    if (!stack.includes(`ScreenNames.${enumRoute}`)) {
      // Detect stack navigator name:
      // const Auth = createStackNavigator();
      // const App = createStackNavigator();

      const navigatorMatch = stack.match(
        /const\s+(\w+)\s*=\s*createStackNavigator/,
      );

      if (!navigatorMatch) {
        console.log(`Could not find navigator in ${stackFile}`);
        return;
      }

      const navigatorName = navigatorMatch[1];

      const screenRegistration = `
     <${navigatorName}.Screen
       name={ScreenNames.${enumRoute}}
       component={${screenImportName}}
     />`;

      const closingNavigatorRegex = new RegExp(
        `<\\/${navigatorName}\\.Navigator>`,
      );

      stack = stack.replace(
        closingNavigatorRegex,
        `${screenRegistration}
   </${navigatorName}.Navigator>`,
      );
    }

    fs.writeFileSync(stackFile, stack);
  });
  console.log(`Generated ${screenName}`);
};
