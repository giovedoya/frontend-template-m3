import { Link} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export default function ProfileViews() {
  const {user} = useAuth();
// use effect llame a getdressesofuserinsession, save in satte s
  return (
    <div>
    
        <div>
          <h3>Username: {user.username}</h3>
          <p>Email: {user.email}</p>
          <h2>Are you ready to sell? It will only take a few minutes</h2>
          <button>
                <Link to={`/dress/newdress`}>Create a new dress</Link>
              </button>            
        </div>
           
    </div>
  );
}