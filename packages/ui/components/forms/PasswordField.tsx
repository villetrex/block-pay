// import { useCallback, useState } from 'react';
// import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

// import { Visibility, VisibilityOff } from '../../icons';
// import { IconButton } from '../../IconButton';
// import { InputAdornment } from '../../InputAdornment';
// import { TextFieldProps } from '../../TextField';
// import { ControlledTextField } from './input-fields/MaskedInputField';

// export type PasswordFieldProps<T extends FieldValues> = TextFieldProps &
//   Omit<UseControllerProps<T>, 'rules'> & {
//     rules: any;
//   };

// export const PasswordField = <T extends FieldValues>({
//   control,
//   label = 'Password',
//   name,
//   rules,
//   ...props
// }: PasswordFieldProps<T>) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = useCallback(() => {
//     setShowPassword(value => !value);
//   }, [setShowPassword]);

//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={renderProps => (
//         <ControlledTextField
//           {...props}
//           {...renderProps}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           helperText={rules.maxLength.message}
//           inputProps={{ maxLength: rules.maxLength.value }}
//           label={label}
//           type={showPassword ? 'text' : 'password'}
//         />
//       )}
//       rules={rules}
//     />
//   );
// };
