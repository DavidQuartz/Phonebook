const Avatar = ({ name, className }) => {
  return (
    <div className={className}>{name && name.split("")[0].toUpperCase()}</div>
  );
};

export default Avatar;
