import { Container } from 'react-bootstrap';
import Search from './Search';
import RepoList from './RepoList';
import { ProviderContext } from '../context/provider';

export default function App() {
  return (
    <ProviderContext>
      <Container>
        <Search />
        <RepoList />
      </Container>
    </ProviderContext>
  );
}
