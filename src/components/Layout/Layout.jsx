import css from './Layout.module.css';
import { Toaster } from 'react-hot-toast';
export default function Layout({ children }) {
  return (
    <div className={css.container}>
      {children}
      <Toaster />
    </div>
  );
}
