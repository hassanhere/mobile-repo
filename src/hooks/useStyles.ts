import { useMemo } from 'react';
import { AppTheme, useTheme } from '~theme';

export default function useStyles<T>(creator: (theme: AppTheme) => T): T {
  const { theme } = useTheme();

  return useMemo(() => creator(theme), [creator, theme]);
}
