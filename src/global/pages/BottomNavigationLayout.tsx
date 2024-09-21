import {Link, Outlet, useLocation} from "react-router-dom";
import {LANGUAGE, ROUTER_PATH} from "@/global/const/const.ts";
import {CirclePlus, CircleUserRound, Heart, House, MessageSquare} from "lucide-react";
import {useTranslation} from "react-i18next";


export function BottomNavigationLayout() {
  return (
    <div className="w-full fleBottomNavigationLayoutx flex-col">
      <div className="w-full h-[calc(100vh-68px)] flex-grow"> {/* BottomNavigation의 높이만큼 빼줌 */}
        <Outlet/> {/* 네비게이션을 제외한 위쪽 부분 */}
      </div>
      <BottomNavigation/>
    </div>
  );
}


function BottomNavigation() {

  const { t } = useTranslation();
  const location = useLocation();

  const bottomNavItems = [
    {
      name: `${t(LANGUAGE.HOME)}`,
      path: ROUTER_PATH.HOME,
      icon: House,
      variant: location.pathname === ROUTER_PATH.HOME? 'default' : 'ghost',
    },
    {
      name: `${t(LANGUAGE.LIKE)}`,
      path: ROUTER_PATH.LIKE,
      icon: Heart,
      variant: location.pathname === ROUTER_PATH.LIKE ? 'default' : 'ghost',
    },
    {
      name: `${t(LANGUAGE.ADD)}`,
      path: ROUTER_PATH.ADD,
      icon: CirclePlus,
      variant: location.pathname === ROUTER_PATH.ADD ? 'default' : 'ghost',
    },
    {
      name: `${t(LANGUAGE.CHAT)}`,
      path: ROUTER_PATH.CHAT,
      icon: MessageSquare,
      variant: location.pathname === ROUTER_PATH.CHAT ? 'default' : 'ghost',
    },
    {
      name: `${t(LANGUAGE.MY)}`,
      path: ROUTER_PATH.MY,
      icon: CircleUserRound,
      variant: location.pathname === ROUTER_PATH.MY ? 'default' : 'ghost',
    },
  ];

  return (
    <footer className="w-full h-[68px] max-w-[430px] bg-white">
      <div className="h-full flex justify-around items-center">
        {bottomNavItems.map((item) => (
          <Link key={item.path}
                to={item.path}
                className="h-full flex flex-col items-center justify-center"
          >
            <div className="">
              <item.icon
                fill={item.variant === "default" ? "#2E2E2E" : "#D5D5D5"}
                color={"#ffffff"}
                size={32}
              />
            </div>
            <div className="font-normal text-[14px]">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </footer>
  );
}