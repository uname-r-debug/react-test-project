type ComponentProps = {
  children: React.ReactNode;
  which: string;
  rest?: string;
};
export default function Row(_: ComponentProps) {
  return (
    <div className={`flex justify-[${_.which}] ` + _.rest}>{_.children}</div>
  );
}
