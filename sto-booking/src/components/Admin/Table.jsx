const Table = ({ headers, data, renderRow }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item, i) => renderRow(item, i))}</tbody>
    </table>
  );
};

export default Table;
