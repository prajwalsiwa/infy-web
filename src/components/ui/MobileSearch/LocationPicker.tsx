import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import { MdLocationOn } from "react-icons/md";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

function LocationPicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const handleChange = () => {};
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={cn(" w-full h-[4rem] px-1 py-0.5")}
        >
          <div className="bg-white rounded-sm px-2 flex items-center justify-start gap-2">
            <MdLocationOn className="size-5 text-gray mt-[2px]" />
            <div className="text-start">
              {value ? (
                <p className="text-sm">
                  {
                    frameworks.find((framework) => framework.value === value)
                      ?.label
                  }
                </p>
              ) : (
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="text-sm text-gray-500 h-10 placeholder:text-gray-400 bg-transparent border-none focus:outline-none"
                  onChange={handleChange}
                />
              )}
            </div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default LocationPicker;
