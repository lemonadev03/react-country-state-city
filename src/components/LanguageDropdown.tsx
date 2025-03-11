import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Language } from "../types";
const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

type ComponentProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue" | "onChange"
> & {
  placeHolder?: string;
  options: Array<Language>;
  inputClassName?: string;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: Language | string;
  onChange: (e: Language) => void;
  displayNative?: boolean;
};
const LanguageDropdown = ({
  placeHolder,
  options,
  onChange,
  inputClassName,
  onTextChange,
  defaultValue,
  displayNative,
  ...props
}: ComponentProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Language>();
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue === "string") {
        const matchedOption = options.find((obj) => obj.name === defaultValue);
        if (matchedOption) setSelectedValue(matchedOption);
      } else {
        setSelectedValue(defaultValue); // No need for type assertion
      }
    }
  }, [defaultValue, options]);
  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Element)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  const handleInputClick = () => {
    setShowMenu(true);
  };

  const getDisplay = () => {
    if (!selectedValue) {
      return searchValue ? searchValue : "";
    }
    return `${displayNative ? selectedValue.native : selectedValue.name}`;
  };

  const onItemClick = (option: Language) => {
    setSelectedValue(option);
    onChange(option);
  };

  const isSelected = (option: Language) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.code === option.code;
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSelectedValue(undefined);
    if (onTextChange) {
      onTextChange(e);
    }
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter(
      (option) =>
        option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 ||
        option.native.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  return (
    <div className={"stdropdown-container"}>
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className={"stdropdown-input stsearch-box"}
      >
        <input
          {...props}
          className={inputClassName}
          onChange={onSearch}
          value={getDisplay()}
          placeholder={placeHolder}
          ref={searchRef}
        />
        <div className={"stdropdown-tools"}>
          <div className={"stdropdown-tool"}>
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={"stdropdown-menu"}>
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.code}
              className={`${"stdropdown-item"} ${
                isSelected(option) && "selected"
              }`}
            >
              {displayNative ? option.native : option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
