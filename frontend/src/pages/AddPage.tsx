import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconAttack } from '../assets/images/attack.svg';
import { ReactComponent as IconDefense } from '../assets/images/defense.svg';
import { heroService } from '../services/hero.service';
import { setAlert } from '../store/system.actions';
import { ColorList } from '../components/ColorList';
import { useGetUser } from '../hooks/useGetUser';

export function AddPage() {
  const user = useGetUser();
  const [values, setValues] = useState({ name: '', price: '', ability: '', power: '', colors: new Set<string>() });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) navigate('/');
  }, [navigate, user]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    setValues(values => ({ ...values, [ev.target.name]: ev.target.value }));
  };

  const handleSubmit: React.FormEventHandler = async ev => {
    ev.preventDefault();
    try {
      const trainingHistory = +values.power > 0 ? [{ date: Date.now(), power: +values.power }] : [];
      await heroService.add({ ...values, trainingHistory, colors: Array.from(values.colors) });
      navigate('/explore');
      setAlert({ message: 'Hero added', type: 'success' });
    } catch (err) {
      setAlert({ message: 'Could not add hero', type: 'error' });
    }
  };

  if (!user) return <div>Loading...</div>;
  return (
    <div className="container">
      <form className="content add-page flex column" onSubmit={handleSubmit}>
        <h2>Create a Hero</h2>
        <div>
          <input name="name" type="text" placeholder="Name" value={values.name} onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" value={values.price} onChange={handleChange} required />
          <input name="power" type="number" placeholder="Power" value={values.power} onChange={handleChange} required />
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
