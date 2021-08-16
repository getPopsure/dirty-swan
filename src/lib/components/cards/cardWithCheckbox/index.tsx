import styles from './style.module.scss';
import { Icon } from '../icons';
import { ChangeEvent } from 'react';

interface CardWithCheckboxProps {
  id: string;
  title: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  description?: string;
  icon?: Icon;
}

const CardWithCheckbox = (props: CardWithCheckboxProps) => {
  const { id, title, description, icon, onChange } = props;
  return (
    <div className={`p-label-container d-flex mt24 wmx6 ${styles.container}`}>
      <input
        id={id}
        className="p-checkbox"
        type="checkbox"
        onChange={onChange}
      />
      <label htmlFor={id} className="p-label w100">
        <div>
          <p className="p-h4">{title}</p>
          {description && <p className="p-p--small mr16">{description}</p>}
        </div>
        {icon && (
          <img src={icon.src} alt={icon.alt} className="ws1 wmn1 mr16" />
        )}
      </label>
    </div>
  );
};

export default CardWithCheckbox;
