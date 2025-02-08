

import { RouterProvider } from 'react-router';
import { router } from './Router';

const App= () => {
  return (
  <RouterProvider router={router}></RouterProvider>
  );
};

export default App;