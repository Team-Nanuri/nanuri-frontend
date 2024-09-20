import { useUser } from "../hooks/useUser";
import { ActivityIcon } from "lucide-react";

export default function MyPage() {
  const {user, error} = useUser();
  
  return (
    <div className="w-full">
   <ActivityIcon size={24}/>
   {error && <p>Error loading user info</p>}
   {user ? (
        <div>
          {user.username} 
          {user.userType}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
 
  <img src={"/src/assets/profile.png"}/>
    <hr className="w-full bg-#F4F4F4  "></hr>
  
    </div>

  );
}
