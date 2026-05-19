import { toast } from 'react-toastify';

export const notify = (message, color) => toast[color](message);
