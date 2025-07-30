import { Accordion } from "./accordion";
export default function DropDown(_: { children: React.ReactNode }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {_.children}
    </Accordion>
  );
}
