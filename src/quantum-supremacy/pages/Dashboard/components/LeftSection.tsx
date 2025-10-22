import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  TbActivityHeartbeat,
  TbLayoutSidebarRightCollapse,
  TbZoom,
} from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavBar } from "../../../../features/quantumSupremacy/quantumSupremacy";
import { classNames } from "../../../constants/helpers";
import { MdKeyboardCommandKey } from "react-icons/md";
import {
  IoIosAdd,
  IoIosArrowUp,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { BsCalendar4Week, BsCalendarCheck, BsGear } from "react-icons/bs";
import { FaRegChartBar } from "react-icons/fa";
import { LuBadgeDollarSign } from "react-icons/lu";
import { FaRegFileLines } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { memo, useMemo, useCallback, useState } from "react";
import { SiAdguard } from "react-icons/si";
// import { IconType } from "react-icons";

// ========================= Types & Interfaces =========================

interface MenuItem {
  icon: any;
  label: string;
  active?: boolean;
}

interface MenuGroup {
  name: string;
  showRightIcon?: boolean;
  menus: MenuItem[];
}

interface RootState {
  quantumSupremacy: {
    navBarExpanded: boolean;
  };
}

interface ExpandedMenusState {
  [key: number]: boolean;
}

// ========================= Animation Variants =========================

const fadeInOut: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

const slideInOut: Variants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

const expandCollapse: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: "easeInOut" },
      opacity: { duration: 0.2, ease: "easeInOut" },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: "easeInOut" },
      opacity: { duration: 0.2, ease: "easeInOut" },
    },
  },
};

const searchInputVariants: Variants = {
  initial: { opacity: 0, width: 0 },
  animate: { opacity: 1, width: 100 },
  exit: { opacity: 0, width: 0 },
};

// ========================= Constants =========================

const MENU_GROUPS: MenuGroup[] = [
  {
    name: "Main menu",
    menus: [
      { icon: TbActivityHeartbeat, label: "Dashboard", active: true },
      { icon: HiOutlineRectangleStack, label: "Projects" },
      { icon: BsCalendarCheck, label: "Calendar" },
      { icon: BsCalendar4Week, label: "Leave Management" },
      { icon: BsGear, label: "Settings" },
    ],
  },
  {
    name: "Team management",
    showRightIcon: true,
    menus: [
      { icon: FaRegChartBar, label: "Preferences" },
      { icon: LuBadgeDollarSign, label: "Payrolls" },
      { icon: FaRegFileLines, label: "Invoices" },
      { icon: FiUsers, label: "Employees" },
    ],
  },
];

const TRANSITION_DURATION = {
  fast: 0.1,
  normal: 0.2,
  slow: 0.25,
} as const;

const INITIAL_EXPANDED_STATE: ExpandedMenusState = {
  0: true,
  1: true,
};

// ========================= Main Component =========================

const LeftSection = memo(() => {
  const navBarExpanded = useSelector(
    (state: RootState) => state.quantumSupremacy.navBarExpanded
  );

  return (
    <aside
      className="flex flex-col h-full"
      role="navigation"
      aria-label="Main navigation"
    >
      <TopHeader />
      <TopSubHeader />
      <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-112px)]">
        <LeftMenu />
        <AnimatePresence mode="wait">
          {navBarExpanded && <Oauth2ConsentBanner />}
        </AnimatePresence>
      </div>
    </aside>
  );
});

LeftSection.displayName = "LeftSection";

// ========================= Header Components =========================

const TopHeader = memo(() => {
  const navBarExpanded = useSelector(
    (state: RootState) => state.quantumSupremacy.navBarExpanded
  );
  const dispatch = useDispatch();

  const handleToggle = useCallback(() => {
    dispatch(toggleNavBar());
  }, [dispatch]);

  return (
    <header className="flex justify-between border-b-2 border-gray-800 p-3">
      <div className="flex gap-2 items-center">
        <LogoIcon onClick={handleToggle} />
        <AnimatePresence initial={false}>
          {navBarExpanded && (
            <motion.p
              key="logo-text"
              variants={fadeInOut}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: TRANSITION_DURATION.normal }}
              className="font-semibold select-none"
            >
              Amplilo
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {navBarExpanded && (
          <motion.button
            key="collapse-btn"
            variants={slideInOut}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: TRANSITION_DURATION.normal }}
            className="cursor-pointer p-[5px] bg-[#28272D] text-gray-100 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
            onClick={handleToggle}
            aria-label="Collapse sidebar"
          >
            <TbLayoutSidebarRightCollapse className="rotate-180" size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </header>
  );
});

TopHeader.displayName = "TopHeader";

// ========================= Logo Component =========================

interface LogoIconProps {
  onClick: () => void;
}

const LogoIcon = memo<LogoIconProps>(({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center cursor-pointer focus:outline-none rounded"
    aria-label="Toggle sidebar"
  >
    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0C27.4768 0 31.2154 -0.000204921 34 1.60742C35.8242 2.66064 37.3394 4.17577 38.3926 6C40.0002 8.7846 40 12.5232 40 20C40 27.4768 40.0002 31.2154 38.3926 34C37.3394 35.8242 35.8242 37.3394 34 38.3926C31.2154 40.0002 27.4768 40 20 40C12.5232 40 8.7846 40.0002 6 38.3926C4.17577 37.3394 2.66064 35.8242 1.60742 34C-0.000204921 31.2154 0 27.4768 0 20C0 12.5232 -0.000204921 8.7846 1.60742 6C2.66064 4.17577 4.17577 2.66064 6 1.60742C8.7846 -0.000204921 12.5232 0 20 0ZM22 4C13.1634 4 6 11.1634 6 20C6 28.8366 13.1634 36 22 36C30.8366 36 38 28.8366 38 20C38 11.1634 30.8366 4 22 4Z"
        fill="#FF4D00"
      />
      <path
        d="M36 20C36 25.5228 31.5228 30 26 30C20.4772 30 16 25.5228 16 20C16 14.4772 20.4772 10 26 10C31.5228 10 36 14.4772 36 20Z"
        fill="#FF4D00"
      />
    </svg>
  </button>
));

LogoIcon.displayName = "LogoIcon";

// ========================= Search Component =========================

const TopSubHeader = memo(() => {
  const navBarExpanded = useSelector(
    (state: RootState) => state.quantumSupremacy.navBarExpanded
  );

  return (
    <div className="p-3">
      <div
        className={classNames(
          "flex items-center bg-[#28272D] p-[5px] py-1 rounded-lg",
          "gap-2 pl-2",
          navBarExpanded
            ? "cursor-default"
            : "cursor-pointer transition-colors ease-in-out hover:bg-gray-900 hover:text-white"
        )}
        role="search"
      >
        <TbZoom size={20} className="my-1 shrink-0" aria-hidden="true" />

        <AnimatePresence initial={false}>
          {navBarExpanded && (
            <div className="flex items-center w-full">
              <motion.input
                key="search-input"
                variants={searchInputVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: TRANSITION_DURATION.slow,
                  ease: "easeInOut",
                }}
                className="h-[20px] w-full rounded-sm px-1 text-sm outline-none text-gray-400 bg-transparent"
                placeholder="Search..."
                aria-label="Search navigation"
              />
              <div
                className="flex items-center gap-1 ml-2"
                aria-label="Keyboard shortcut"
              >
                <MdKeyboardCommandKey
                  size={25}
                  className="p-[2px] px-[0px] bg-[#44454A] rounded-md"
                  aria-hidden="true"
                />
                <span className="p-[2px] px-[10px] bg-[#44454A] rounded-md text-sm">
                  K
                </span>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

TopSubHeader.displayName = "TopSubHeader";

// ========================= Menu Components =========================

const LeftMenu = memo(() => {
  const navBarExpanded = useSelector(
    (state: RootState) => state.quantumSupremacy.navBarExpanded
  );

  const [expandedMenus, setExpandedMenus] = useState<ExpandedMenusState>(
    INITIAL_EXPANDED_STATE
  );

  const toggleMenu = useCallback((index: number) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  return (
    <nav className="p-3" aria-label="Navigation menu">
      {MENU_GROUPS.map((group, index) => (
        <MenuGroup
          key={`menu-group-${index}`}
          group={group}
          index={index}
          isExpanded={expandedMenus[index]}
          onToggle={toggleMenu}
          navBarExpanded={navBarExpanded}
        />
      ))}
    </nav>
  );
});

LeftMenu.displayName = "LeftMenu";

// ========================= Menu Group Component =========================

interface MenuGroupProps {
  group: MenuGroup;
  index: number;
  isExpanded: boolean;
  onToggle: (index: number) => void;
  navBarExpanded: boolean;
}

const MenuGroup = memo<MenuGroupProps>(
  ({ group, index, isExpanded, onToggle, navBarExpanded }) => {
    const handleToggle = useCallback(() => {
      onToggle(index);
    }, [onToggle, index]);

    const arrowClasses = useMemo(
      () =>
        classNames(
          "cursor-pointer text-gray-400 hover:text-white transition-transform duration-200",
          isExpanded ? "rotate-0" : "rotate-180",
          navBarExpanded ? "" : "ml-3"
        ),
      [isExpanded, navBarExpanded]
    );

    return (
      <div className="mb-2">
        <button
          onClick={handleToggle}
          className="w-full cursor-pointer flex gap-2 items-center text-gray-400 text-sm mb-2 h-[25px] hover:text-white transition-colors focus:outline-none focus:text-white"
          aria-expanded={isExpanded}
          aria-label={`Toggle ${group.name}`}
          title={group.name}
        >
          <AnimatePresence initial={false}>
            {navBarExpanded && (
              <motion.span
                key={`top-menu-label-${index}`}
                variants={fadeInOut}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: TRANSITION_DURATION.fast }}
                className="text-sm line-clamp-1 truncate select-none"
              >
                {group.name}
              </motion.span>
            )}
          </AnimatePresence>

          <IoIosArrowUp size={14} className={arrowClasses} aria-hidden="true" />

          {group.showRightIcon && navBarExpanded && (
            <button
              className="ml-auto hover:text-white transition-colors"
              aria-label={`Add new ${group.name.toLowerCase()} item`}
              onClick={(e) => {
                e.stopPropagation();
                // Add handler for adding new items
              }}
            >
              <IoIosAdd size={20} className="rotate-90" />
            </button>
          )}
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key={`menu-group-content-${index}`}
              variants={expandCollapse}
              initial="initial"
              animate="animate"
              exit="exit"
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {group.menus.map((menu, menuIndex) => (
                  <MenuItemComponent
                    key={`menu-${index}-${menuIndex}`}
                    menu={menu}
                    navBarExpanded={navBarExpanded}
                    isActive={menuIndex === 0 && index === 0}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

MenuGroup.displayName = "MenuGroup";

// ========================= Menu Item Component =========================

interface MenuItemComponentProps {
  menu: MenuItem;
  navBarExpanded: boolean;
  isActive: boolean;
}

const MenuItemComponent = memo<MenuItemComponentProps>(
  ({ menu, navBarExpanded, isActive }) => {
    const Icon = menu.icon;

    const itemClasses = useMemo(
      () =>
        classNames(
          "p-2 rounded-sm mb-[3px] flex gap-2 items-center cursor-pointer transition-colors",
          isActive
            ? "bg-[#2D2C31] text-white"
            : "hover:bg-[#28272D] text-gray-300 hover:text-white"
        ),
      [isActive]
    );

    return (
      <button
        className={itemClasses}
        aria-label={menu.label}
        aria-current={isActive ? "page" : undefined}
        title={menu.label}
      >
        <Icon size={20} className="shrink-0" aria-hidden="true" />
        <AnimatePresence initial={false}>
          {navBarExpanded && (
            <motion.span
              key={`menu-label-${menu.label}`}
              variants={fadeInOut}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: TRANSITION_DURATION.fast }}
              className="text-sm line-clamp-1 truncate select-none text-left"
            >
              {menu.label}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }
);

MenuItemComponent.displayName = "MenuItemComponent";

// ========================= OAuth Banner Component =========================

const Oauth2ConsentBanner = memo(() => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleEnable = useCallback(() => {
    // Add 2FA enable logic here
    console.log("Enabling 2-step verification...");
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-[#2F2E33] m-3 rounded-lg"
      role="alert"
      aria-live="polite"
    >
      <div className="flex justify-between items-start mb-3">
        <SiAdguard
          size={30}
          className="text-green-400 shadow-sm"
          aria-hidden="true"
        />
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <IoIosCloseCircleOutline size={20} />
        </button>
      </div>
      <div className="my-3">
        <h3 className="font-semibold text-white text-sm my-1">
          Increase your security
        </h3>
        <p className="text-xs text-gray-400">
          Add a secondary method of verification used during login
        </p>
      </div>
      <button
        onClick={handleEnable}
        className="w-full bg-[#4C4B50] hover:bg-green-600 text-white p-2 rounded-md text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Enable 2-step verification
      </button>
    </motion.div>
  );
});

Oauth2ConsentBanner.displayName = "Oauth2ConsentBanner";

export default LeftSection;
