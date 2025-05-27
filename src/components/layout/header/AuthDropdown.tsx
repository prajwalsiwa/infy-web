import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { clearAuth as logout } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface AuthDropdownProps {
  user: string | null;
  menuItems: { id: number; label: string; disabled: boolean }[];
  onMenuClick: (id: number) => void;
}

function AuthDropdown({ user, menuItems, onMenuClick }: AuthDropdownProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full w-10 h-10 font-semibold"
          >
            {user}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 mr-28 mt-2 overflow-hidden rounded-lg bg-white text-gray-dark font-normal flex flex-col z-10 border">
          <DropdownMenuLabel className="pt-2 px-3 pb-1 hover:bg-grey-100 h-10 flex items-center cursor-not-allowed">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-b-[0.5px] border-grey-300" />
          <DropdownMenuGroup className="flex flex-col">
            {menuItems.map(({ id, label, disabled }) => (
              <DropdownMenuItem
                key={id}
                className={`cursor-pointer hover:bg-grey-100 px-3 h-10 flex items-center ${
                  disabled ? "cursor-not-allowed text-gray-400" : ""
                }`}
                onClick={() => !disabled && onMenuClick(id)}
              >
                <span>{label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="border-b-[0.5px] border-grey-300" />
          <DropdownMenuItem
            className="p-1 px-3 pb-3 hover:bg-grey-100 overflow-hidden cursor-pointer"
            onClick={handleLogout}
          >
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default AuthDropdown;
