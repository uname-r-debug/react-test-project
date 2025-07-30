type ComponentProps = {
  children: React.ReactNode;
};
export default function Split(_: ComponentProps): React.JSX.Element {
  return (
    <div className="bg-card border flex justify-evenly radius-4xl min-h-[80vh]">
      {_.children}
    </div>
  );
}
