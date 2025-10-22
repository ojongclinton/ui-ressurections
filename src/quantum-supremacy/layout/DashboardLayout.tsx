import { useSelector } from "react-redux";
import { classNames } from "../constants/helpers";

function DashboardLayout({
  leftSection,
  rightSection,
}: {
  leftSection: React.ReactNode;
  rightSection: React.ReactNode;
}) {
  const navBarExpanded = useSelector(
    (state: any) => state.quantumSupremacy.navBarExpanded
  );

  return (
    <div
      className={classNames(
        "grid min-h-screen transition-[grid-template-columns] duration-300 ease-in-out",
        navBarExpanded ? "grid-cols-[240px_1fr]" : "grid-cols-[60px_1fr]"
      )}
    >
      <div className="border-r-[1.5px] border-gray-700 transition-all duration-300 ease-in-out overflow-hidden">
        {leftSection}
      </div>

      <div className="p-3 overflow-auto">{rightSection}</div>
    </div>
  );
}

export default DashboardLayout;
