interface IIconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  isImage?: boolean;
  className?: string;
  iconSymbolType?: string;
  onClick?: () => void;
  imgSrc?: string;
}

export default function Icon({
  name,
  className,
  isImage = false,
  iconSymbolType = "material-symbols-outlined",
  onClick,
  imgSrc,
}: IIconProps): JSX.Element {

  return isImage ? (
    <div>
      <img src={imgSrc} alt={name} className={className} />
    </div>
  ) : (
    <i
      role="button"
      tabIndex={0}
      onKeyUp={() => {}}
      onClick={onClick}
      className={`text-icon-sm lg:text-2xl ${className} ${iconSymbolType}`}
    >
      {name}
    </i>
  );
}
