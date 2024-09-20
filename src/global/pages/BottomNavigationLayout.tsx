import {Link, Outlet} from "react-router-dom";
import {ROUTER_PATH} from "@/global/const/const.ts";
import {ActivityIcon} from "lucide-react";


export function BottomNavigationLayout() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full mb-[68px]"> {/* BottomNavigation의 높이만큼 빼줌 */}
        <div className="h-full flex-grow">
          <Outlet/> {/* 네비게이션을 제외한 위쪽 부분 */}
        </div>
      </div>
      <BottomNavigation/>
    </div>
  );
}

const bottomNavItems = [
  {name: "홈", path: ROUTER_PATH.HOME},
  {name: "좋아요", path: ROUTER_PATH.LIKE},
  {name: "등록", path: ROUTER_PATH.ADD},
  {name: "채팅", path: ROUTER_PATH.CHAT},
  {name: "마이", path: ROUTER_PATH.MY},
];

function BottomNavigation() {
  return (
    <div className="w-full h-[68px] max-w-[430px]
      fixed bottom-0  bg-white"
    >
      <div className="h-full flex justify-around items-center">
        {bottomNavItems.map((item) => (
          <Link key={item.path}
                to={item.path}
                className="h-full flex flex-col items-center justify-center"
          >
            <div className="">
              <ActivityIcon size={24}/>
            </div>
            <div>
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}