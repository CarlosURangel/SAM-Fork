
export interface TextInputProps<T extends string | number = string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  type?: string;
  max?: number;
  min?: number;
  className?: string;
}

export interface PasswordInputProps extends TextInputProps {
  toggleVisibility?: boolean;
}

export interface SelectFormProps {
  label: string;
  selectLabel: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}