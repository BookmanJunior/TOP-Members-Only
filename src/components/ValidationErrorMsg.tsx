type errors = { key?: string[] };

type ValidationErrorTypes = {
  errorPath: string;
  errors: errors | null;
};

export default function ValidationError({
  errors,
  errorPath,
}: ValidationErrorTypes) {
  return (
    errors && (
      <ul className="error-msgs">
        {errors[errorPath as keyof errors]?.length &&
          errors[errorPath as keyof errors]?.map(
            (err: string, index: number) => (
              <li key={index} className="error-msg">
                {err}
              </li>
            )
          )}
      </ul>
    )
  );
}
