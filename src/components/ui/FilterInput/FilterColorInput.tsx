import React from 'react';
import styles from './FilterInput.module.css';

function FilterColorInput({
  selectedColor,
  setSelectedColor,
  value,
}: {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  value: string[];
}) {
  return (
    <div style={{ width: '90%' }}>
      <p>Selected color: {selectedColor}</p>
      <select
        className={styles.input}
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        <option> </option>
        {value.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterColorInput;
