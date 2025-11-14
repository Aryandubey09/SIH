import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components you’ll use in charts
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
