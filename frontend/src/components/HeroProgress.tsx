import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';
import { Line } from 'react-chartjs-2';
import { Hero } from '../services/hero.service';

interface Props {
  trainingHistory: Hero['trainingHistory'];
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function HeroProgress({ trainingHistory }: Props) {
  const labels = [];
  const dataset = [];
  for (const training of trainingHistory) {
    labels.push(format(new Date(training.date), 'dd/MM h:m'));
    dataset.push(training.power);
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: 'Power',
        data: dataset.reverse(),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <section className="hero-progress">
      <h2 className="text-center">Progress</h2>
      <Line data={data} options={options} />
    </section>
  );
}
