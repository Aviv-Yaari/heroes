import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { ReactComponent as IconAttack } from '../assets/images/attack.svg';
import { ReactComponent as IconDefense } from '../assets/images/defense.svg';
import { heroService } from '../services/hero.service';

export function AddPage() {
  const user = useSelector((state: RootState) => state.userModule.user);
  const [values, setValues] = useState({ name: '', price: '', ability: '', colors: new Set<string>() });
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.isAdmin) navigate('/');
  }, [navigate, user]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    setValues(values => ({ ...values, [ev.target.name]: ev.target.value }));
  };

  const handleSubmit: React.FormEventHandler = async ev => {
    ev.preventDefault();
    try {
      await heroService.add({ ...values, colors: Array.from(values.colors) });
      alert('Hero created!');
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  if (!user) return <div>Loading...</div>;
  return (
    <div className="container">
      <form className="content add-page flex column" onSubmit={handleSubmit}>
        <h2>Create a Hero</h2>
        <div>
          <input name="name" type="text" placeholder="Name" value={values.name} onChange={handleChange} />
          <input name="price" type="text" placeholder="Price" value={values.price} onChange={handleChange} />
        </div>
        <div>
          <p>Ability:</p>
          <section className="flex ability">
            <div
              className={values.ability === 'attacker' ? 'selected' : ''}
              onClick={() => setValues(values => ({ ...values, ability: 'attacker' }))}>
              <IconAttack />
              <span>Attacker</span>
            </div>
            <div
              className={values.ability === 'defender' ? 'selected' : ''}
              onClick={() => setValues(values => ({ ...values, ability: 'defender' }))}>
              <IconDefense />
              <span>Defender</span>
            </div>
          </section>
        </div>
        <div>
          <p>Colors:</p>
          <ColorList
            selectedColors={values.colors}
            colors={['red', 'green', 'blue']}
            onClick={(colors: Set<string>) => setValues(values => ({ ...values, colors }))}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
}

interface ColorProps {
  selectedColors: Set<string>;
  colors: string[];
  onClick: Function;
}
function ColorList({ selectedColors, colors, onClick }: ColorProps) {
  return (
    <section className="flex wrap color-list">
      {colors.map(color => {
        const isSelected = selectedColors.has(color);
        return (
          <span
            key={color}
            className={`color ${isSelected ? 'selected' : ''}`}
            style={{ color }}
            onClick={() => {
              isSelected ? selectedColors.delete(color) : selectedColors.add(color);
              onClick(new Set(selectedColors));
            }}>
            {color}
          </span>
        );
      })}
    </section>
  );
}
