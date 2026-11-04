const fs = require('fs');
const path = require('path');

module.exports = function (args) {
  const name = args[0];

  if (!name) {
    console.log('Missing component name');
    process.exit(1);
  }

  const toKebab = str =>
    str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

  const folder = toKebab(name);

  const root = path.join(process.cwd(), 'src/components');
  const dir = path.join(root, folder);
  const exportFile = path.join(root, 'index.ts');

  // -----------------------------
  // CHECK IF COMPONENT EXISTS
  // -----------------------------
  if (fs.existsSync(dir)) {
    console.log(`❌ Component already exists: ${dir}`);
    process.exit(1);
  }

  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(
    path.join(dir, 'index.tsx'),
    `import React from 'react';
import { View } from 'react-native';
import { Text } from '~components';
import styles from './styles';
import { ${name}Props } from './types';

const ${name} = ({ containerStyle }: ${name}Props) => {
 return (
   <View style={[styles.mainContainer, containerStyle]}>
     <Text variant="bodyBold">${name}</Text>
   </View>
 );
};

export default ${name};
`,
  );

  fs.writeFileSync(
    path.join(dir, 'styles.ts'),
    `import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 mainContainer:{
   flex:1
 }
});

export default styles;
`,
  );

  fs.writeFileSync(
    path.join(dir, 'types.ts'),
    `import { StyleProp, ViewStyle } from 'react-native';

export interface ${name}Props {
 containerStyle?: StyleProp<ViewStyle>;
}
`,
  );

  const exportLine = {
    name,
    folder,
    line: `export { default as ${name} } from './${folder}';`,
  };

  // -----------------------------
  // READ EXISTING EXPORTS
  // -----------------------------
  let exportsList = [];

  if (fs.existsSync(exportFile)) {
    const content = fs.readFileSync(exportFile, 'utf8');

    exportsList = content
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const match = line.match(
          /export\s+\{\s*default\s+as\s+(\w+)\s*\}\s+from\s+'\.\/(.+)'/,
        );

        if (!match) return null;

        return {
          name: match[1],
          folder: match[2],
          line,
        };
      })
      .filter(Boolean);
  }

  // -----------------------------
  // ADD NEW EXPORT
  // -----------------------------
  exportsList.push(exportLine);

  // -----------------------------
  // SORT BY FOLDER NAME (ALPHABETICAL)
  // -----------------------------
  exportsList.sort((a, b) => a.folder.localeCompare(b.folder));

  // -----------------------------
  // WRITE BACK CLEAN FILE
  // -----------------------------
  const finalContent = exportsList.map(e => e.line).join('\n');

  fs.writeFileSync(exportFile, finalContent + '\n');

  console.log(`Generated ${name}`);
};
