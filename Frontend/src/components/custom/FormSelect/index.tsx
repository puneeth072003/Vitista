import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormSelect({
  period,
  setPeriod,
}: {
  period: string;
  setPeriod: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Select onValueChange={(val) => setPeriod(val)} defaultValue={period}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select the Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Periods</SelectLabel>
          <SelectItem value="Morning">Morning</SelectItem>
          <SelectItem value="Noon">Noon</SelectItem>
          <SelectItem value="Night">Night</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
