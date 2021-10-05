import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';

import Search from './Search';
import RepoList from './RepoList';
import { ProviderContext } from '../context/provider';

export default function App() {
  return (
    <Router>
      <ProviderContext>
        <Container>
          <Search />
          <RepoList />
        </Container>
      </ProviderContext>
    </Router>
  );
}
