
export interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export interface PasswordInputProps extends TextInputProps {
  toggleVisibility?: boolean;
}