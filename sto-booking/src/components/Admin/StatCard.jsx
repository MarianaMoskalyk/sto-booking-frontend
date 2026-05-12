const StatCard = ({ title, value, variant }) => {
  return (
    <div className={`stat-card ${variant}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatCard;
