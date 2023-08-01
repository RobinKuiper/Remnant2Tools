interface FieldInformation {
  label: string;
  tracker: boolean;
  database: boolean;
  redacted: boolean;
  fields?: string[];
}

export interface CategoryInformation {
  label: string;
  fragment: string;
  tracker: boolean;
  database: boolean;
  categorized?: boolean;
  filters: object;
  attributes: FieldInformation[];
}
