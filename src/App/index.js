import Search from "./Search";
import RepoList from './RepoList'
import { ProviderContext } from '../context/provider'

export default function App() {
  return (
    <div className="container">
      <ProviderContext>
        <Search />
        <RepoList />
      </ProviderContext>
    </div>
  )
}