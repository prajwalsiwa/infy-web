/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Icon from "../Icon";
import { useFormContext } from "react-hook-form";

interface TagInputProps {
  index: number;
  errors?: any;
}

function TagInput({ index, errors }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputTags, setInputTags] = useState<string[]>([]);
  const { setValue, getValues } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (inputTags.length === 0 && value.trim()) {
      const numberValue = Number(value.trim());
      if (!isNaN(numberValue)) {
        setValue(`roomInfo.${index}.room_numbers`, [numberValue]);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      const trimmed = inputValue.trim();

      if (!inputTags.includes(trimmed)) {
        const updatedTags = [...inputTags, trimmed];
        setInputTags(updatedTags);
        setValue(
          `roomInfo.${index}.room_numbers`,
          updatedTags.map((tag) => Number(tag))
        );
        setInputValue("");
      }
    }
  };

  const handleDeleteTags = (tagToDelete: string) => {
    const updatedTags = inputTags.filter((tag) => tag !== tagToDelete);
    setInputTags(updatedTags);
    setValue(
      `roomInfo.${index}.room_numbers`,
      updatedTags.map((tag) => Number(tag))
    );
  };

  useEffect(() => {
    const existingTags = getValues(`roomInfo.${index}.room_numbers`) || [];
    setInputTags(existingTags.map(String));
  }, [index, getValues]);

  return (
    <div className="w-full">
      <div className="flex border rounded-md">
        <div className="pl-2 flex justify-center items-center flex-wrap">
          {inputTags.map((tag, index) => (
            <div
              key={`${tag}-${index}`}
              className="flex border h-7 items-center bg-gray-200 rounded-sm bg-primary-light px-2 m-1 text-sm text-gray-dark"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleDeleteTags(tag)}
                aria-label={`Remove ${tag}`}
                className="ml-2 text-gray hover:text-red-700 focus:outline-none"
              >
                <Icon name="close" className="!text-[1rem]" />
              </button>
            </div>
          ))}
        </div>
        <input
          type="number"
          placeholder="Add a tag..."
          className="flex-grow outline-none rounded-md text-sm pl-2 py-2"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label="Tag input"
        />
      </div>
      {errors && <p className="error text-red-500 text-sm pt-1">{errors}</p>}
    </div>
  );
}

export default TagInput;
