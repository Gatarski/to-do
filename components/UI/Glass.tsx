export const Glass = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        'glass rounded-2xl border-solid border-2 border-gray-200 w-full h-full flex items-center justify-center'
      }
    >
      {children}
    </div>
  );
};
