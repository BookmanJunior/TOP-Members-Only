type errorsType = {
  errors: string[] | undefined;
};

export default function ValidationError({ errors }: errorsType) {
  return (
    errors && (
      <ul className="error-msgs">
        {errors.length &&
          errors.map((err: string, index: number) => (
            <li key={index} className="error-msg">
              {err}
            </li>
          ))}
      </ul>
    )
  );
}
