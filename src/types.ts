import type {
  SourceSpecification,
  LayerSpecification,
  MapMouseEvent,
  GeoJSONFeature,
} from 'mapbox-gl';
// Health Data Types

export type CompareMode = 'Region' | 'County';
export type AllProperties = HealthDataProperties & {
  geoid: number;
  objectid: number;
};
export interface HealthDataProperties {
  access2_pct_cty: number;
  access2_pct_reg: number;
  access2_pct_st: number;
  access2_prv: number;
  arthritis_pct_cty: number;
  arthritis_pct_reg: number;
  arthritis_pct_st: number;
  arthritis_prv: number;
  binge_pct_cty: number;
  binge_pct_reg: number;
  binge_pct_st: number;
  binge_prv: number;
  bphigh_pct_cty: number;
  bphigh_pct_reg: number;
  bphigh_pct_st: number;
  bphigh_prv: number;
  bpmed_pct_cty: number;
  bpmed_pct_reg: number;
  bpmed_pct_st: number;
  bpmed_prv: number;
  cancer_pct_cty: number;
  cancer_pct_reg: number;
  cancer_pct_st: number;
  cancer_prv: number;
  casthma_pct_cty: number;
  casthma_pct_reg: number;
  casthma_pct_st: number;
  casthma_prv: number;
  chd_pct_cty: number;
  chd_pct_reg: number;
  chd_pct_st: number;
  chd_prv: number;
  checkup_pct_cty: number;
  checkup_pct_reg: number;
  checkup_pct_st: number;
  checkup_prv: number;
  cholscreen_pct_cty: number;
  cholscreen_pct_reg: number;
  cholscreen_pct_st: number;
  cholscreen_prv: number;
  cognition_pct_cty: number;
  cognition_pct_reg: number;
  cognition_pct_st: number;
  cognition_prv: number;
  colon_screen_pct_cty: number;
  colon_screen_pct_reg: number;
  colon_screen_pct_st: number;
  colon_screen_prv: number;
  copd_pct_cty: number;
  copd_pct_reg: number;
  copd_pct_st: number;
  copd_prv: number;
  csmoking_pct_cty: number;
  csmoking_pct_reg: number;
  csmoking_pct_st: number;
  csmoking_prv: number;
  dental_pct_cty: number;
  dental_pct_reg: number;
  dental_pct_st: number;
  dental_prv: number;
  depression_pct_cty: number;
  depression_pct_reg: number;
  depression_pct_st: number;
  depression_prv: number;
  diabetes_pct_cty: number;
  diabetes_pct_reg: number;
  diabetes_pct_st: number;
  diabetes_prv: number;
  disability_pct_cty: number;
  disability_pct_reg: number;
  disability_pct_st: number;
  disability_prv: number;
  emotionspt_pct_cty: number;
  emotionspt_pct_reg: number;
  emotionspt_pct_st: number;
  emotionspt_prv: number;
  foodinsecu_pct_cty: number;
  foodinsecu_pct_reg: number;
  foodinsecu_pct_st: number;
  foodinsecu_prv: number;
  foodstamp_pct_cty: number;
  foodstamp_pct_reg: number;
  foodstamp_pct_st: number;
  foodstamp_prv: number;
  ghlth_pct_cty: number;
  ghlth_pct_reg: number;
  ghlth_pct_st: number;
  ghlth_prv: number;
  hearing_pct_cty: number;
  hearing_pct_reg: number;
  hearing_pct_st: number;
  hearing_prv: number;
  highchol_pct_cty: number;
  highchol_pct_reg: number;
  highchol_pct_st: number;
  highchol_prv: number;
  housinsecu_pct_cty: number;
  housinsecu_pct_reg: number;
  housinsecu_pct_st: number;
  housinsecu_prv: number;
  inactive_comm_pct_cty: number;
  inactive_comm_pct_reg: number;
  inactive_comm_pct_st: number;
  inactive_comm_prv: number;
  indeplive_pct_cty: number;
  indeplive_pct_reg: number;
  indeplive_pct_st: number;
  indeplive_prv: number;
  isolation_pct_cty: number;
  isolation_pct_reg: number;
  isolation_pct_st: number;
  isolation_prv: number;
  lacktrpt_pct_cty: number;
  lacktrpt_pct_reg: number;
  lacktrpt_pct_st: number;
  lacktrpt_prv: number;
  lpa_pct_cty: number;
  lpa_pct_reg: number;
  lpa_pct_st: number;
  lpa_prv: number;
  mammouse_pct_cty: number;
  mammouse_pct_reg: number;
  mammouse_pct_st: number;
  mammouse_prv: number;
  mhlth_pct_cty: number;
  mhlth_pct_reg: number;
  mhlth_pct_st: number;
  mhlth_prv: number;
  mobility_pct_cty: number;
  mobility_pct_reg: number;
  mobility_pct_st: number;
  mobility_prv: number;
  nocar_pct_cty: number;
  nocar_pct_reg: number;
  nocar_pct_st: number;
  nocar_prv: number;
  nohighschool_pct_cty: number;
  nohighschool_pct_reg: number;
  nohighschool_pct_st: number;
  nohighschool_prv: number;
  obesity_pct_cty: number;
  obesity_pct_reg: number;
  obesity_pct_st: number;
  obesity_prv: number;
  own_burden_pct_cty: number;
  own_burden_pct_reg: number;
  own_burden_pct_st: number;
  own_burden_prv: number;
  phlth_pct_cty: number;
  phlth_pct_reg: number;
  phlth_pct_st: number;
  phlth_prv: number;
  rent_burden_pct_cty: number;
  rent_burden_pct_reg: number;
  rent_burden_pct_st: number;
  rent_burden_prv: number;
  selfcare_pct_cty: number;
  selfcare_pct_reg: number;
  selfcare_pct_st: number;
  selfcare_prv: number;
  shututility_pct_cty: number;
  shututility_pct_reg: number;
  shututility_pct_st: number;
  shututility_prv: number;
  sleep_pct_cty: number;
  sleep_pct_reg: number;
  sleep_pct_st: number;
  sleep_prv: number;
  stroke_pct_cty: number;
  stroke_pct_reg: number;
  stroke_pct_st: number;
  stroke_prv: number;
  teethlost_pct_cty: number;
  teethlost_pct_reg: number;
  teethlost_pct_st: number;
  teethlost_prv: number;
  unemp_pct_cty: number;
  unemp_pct_reg: number;
  unemp_pct_st: number;
  unemp_prv: number;
  vision_pct_cty: number;
  vision_pct_reg: number;
  vision_pct_st: number;
  vision_prv: number;
}

export type HealthPropertyKeys =
  | 'access2'
  | 'arthritis'
  | 'binge'
  | 'bphigh'
  | 'bpmed'
  | 'cancer'
  | 'casthma'
  | 'chd'
  | 'checkup'
  | 'cholscreen'
  | 'cognition'
  | 'colon_screen'
  | 'copd'
  | 'csmoking'
  | 'dental'
  | 'depression'
  | 'diabetes'
  | 'disability'
  | 'emotionspt'
  | 'foodinsecu'
  | 'foodstamp'
  | 'ghlth'
  | 'hearing'
  | 'highchol'
  | 'housinsecu'
  | 'inactive_comm'
  | 'indeplive'
  | 'isolation'
  | 'lacktrpt'
  | 'lpa'
  | 'mammouse'
  | 'mhlth'
  | 'mobility'
  | 'nocar'
  | 'nohighschool'
  | 'obesity'
  | 'own_burden'
  | 'phlth'
  | 'rent_burden'
  | 'selfcare'
  | 'shututility'
  | 'sleep'
  | 'stroke'
  | 'teethlost'
  | 'unemp'
  | 'vision';
export type HealthSuffix = '_pct_cty' | '_pct_reg' | '_pct_st' | '_prv';
export type CompareModes = 'cty' | 'reg' | 'st';
// Map Types

export type MouseEvent = MapMouseEvent & {
  features?: GeoJSONFeature[];
};
export type GeoJSONProperties = Record<string, string | number | boolean>;

export interface LayerMap {
  [key: string]: LayerSpecification;
}

export interface SourceMap {
  [key: string]: SourceSpecification;
}
