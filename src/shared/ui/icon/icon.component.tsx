export type IIconProps = {
  className?: string;
  name: 'logo' | 'light-icon' | 'dark-icon' | 'menu' | 'close' | 'cross';
  width?: string;
  height?: string;
};

export function Icon({name, className, height = '1rem', width = '1rem'}: IIconProps) {
  if (!name) {
    console.error('Icon name and spriteUrl are required.');
    return null;
  }

  return (
    <svg className={className} width={width} height={height}>
      <use width={width} height={height} href={`/assets/sprite.svg#${name}`} />
    </svg>
  );
}
