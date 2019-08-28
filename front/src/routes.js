import Estudiante from './pages/estudiante';
import Curso from './pages/curso';
import Nota from './pages/nota';

const Routes = [
    {
        path: "/estudiante",
        component: Estudiante
    },
    {
        path: "/curso",
        component: Curso
    },
    {
        path: "/nota",
        component: Nota
    }
];

export default Routes;