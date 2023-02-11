export type MediaValues = Record<
  | 'type'
  | 'orientation'
  | 'scan'
  | 'width'
  | 'height'
  | 'device-width'
  | 'device-height'
  | 'resolution'
  | 'aspect-ratio'
  | 'device-aspect-ratio'
  | 'pixel-ratio'
  | 'grid'
  | 'color'
  | 'color-index'
  | 'monochrome'
  | 'prefers-color-scheme',
  any
>;
export type QueryNode = {
  only: boolean;
  inverse: boolean;
  type: string;
  expressions: Expression[];
};

export type Expression = {
  modifier: string;
  feature: string;
  value: string;
};
