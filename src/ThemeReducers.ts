type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Initial = 'INITIAL',
  ChangeAppTheme = 'CHANGE_APP_THEME',
  ChangeSystemTheme = 'CHANGE_SYSTEM_THEME',
  ChangeOrientation = 'CHANGE_ORIENTATION',
  Clear = 'CLEAR'
}

export type AppThemeType = 'system' | 'light' | 'dark';
export type OrientationType = 'portrait' | 'landscape';

export type InitialThemeStateType = {
  appTheme: AppThemeType;
  systemTheme: AppThemeType;
  orientation: OrientationType;
};

type ThemePayload = {
  [Types.Initial]: {
    appTheme: AppThemeType;
    systemTheme: AppThemeType;
    orientation: OrientationType;
  };
  [Types.ChangeAppTheme]: {
    appTheme: AppThemeType;
  };
  [Types.ChangeSystemTheme]: {
    systemTheme: AppThemeType;
  };
  [Types.ChangeOrientation]: {
    orientation: OrientationType;
  };
  [Types.Clear]: {};
};

export type ThemeActions = ActionMap<ThemePayload>[keyof ActionMap<ThemePayload>];

export function themeReducer(state: InitialThemeStateType, action: ThemeActions): InitialThemeStateType {
  switch (action.type) {
    case Types.Initial:
      return Object.assign({}, state, {
        appTheme: action.payload.appTheme,
        systemTheme: action.payload.systemTheme,
        orientation: action.payload.orientation
      });
    case Types.ChangeAppTheme:
      return Object.assign({}, state, {
        appTheme: action.payload.appTheme,
        systemTheme: action.payload.appTheme.toLowerCase() !== 'system' ? 'system' : state.systemTheme
      });
    case Types.ChangeSystemTheme:
      return Object.assign({}, state, {
        systemTheme: action.payload.systemTheme
      });
    case Types.ChangeOrientation:
      return Object.assign({}, state, {
        orientation: action.payload.orientation
      });
    case Types.Clear:
      return Object.assign({}, state, {
        appTheme: 'system',
        systemTheme: 'system',
        orientation: 'portrait'
      });
    default:
      return state;
  }
}
