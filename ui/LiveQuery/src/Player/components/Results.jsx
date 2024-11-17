export const Results = ({ options }) => {
  return (
    <div>
      {options.map((option, index) => (
        <>
          <p key={index}>{option.text}</p>
        </>
      ))}
    </div>
  );
};
