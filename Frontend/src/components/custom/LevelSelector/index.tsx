import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LevelSelector({
  activityLevel,
  setActivityLevel,
}: {
  activityLevel: string;
  setActivityLevel: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Select
      onValueChange={(val) => setActivityLevel(val)}
      defaultValue={activityLevel}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select the Activity Level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Activity Level</SelectLabel>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
