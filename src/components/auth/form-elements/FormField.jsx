import Input from "../../ui/primitives/Input";

const FormField = ({
  label,
  type,
  name,
  register,
  errors,
  placeholder,
  watch,
}) => {
  return (
    <div>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        aria-invalid={Boolean(errors[name])}
        {...register(name, {
          required: `${label} is required`,
          ...(type === "password" &&
            name === "confirmPassword" && {
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            }),
        })}
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-destructive">{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormField;
