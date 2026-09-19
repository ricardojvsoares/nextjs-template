import type { ReactNode } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logoutAction } from '@/lib/auth/auth.actions';
import {
  UserIcon,
  SettingsIcon,
  CreditCardIcon,
  UsersIcon,
  SquarePenIcon,
  CirclePlusIcon,
  LogOutIcon,
} from 'lucide-react';

type Props = {
  trigger: ReactNode;
  defaultOpen?: boolean;
  align?: 'start' | 'center' | 'end';
  user?: { displayName: string; email: string };
};

function initials(displayName: string) {
  return displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

const ProfileDropdown = ({ trigger, defaultOpen, align = 'end', user }: Props) => {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align={align || 'end'}>
        <DropdownMenuLabel className="flex items-center gap-4 px-4 py-2.5 font-normal">
          <div className="relative">
            <Avatar size="lg">
              <AvatarImage
                src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png"
                alt="John Doe"
              />
              <AvatarFallback>{user ? initials(user.displayName) : 'JD'}</AvatarFallback>
            </Avatar>
            <span className="ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2" />
          </div>
          <div className="flex flex-1 flex-col items-start">
            <span className="text-foreground text-lg font-semibold">
              {user?.displayName ?? 'John Doe'}
            </span>
            <span className="text-muted-foreground text-base">
              {user?.email ?? 'john.doe@example.com'}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 px-4 py-2.5 text-base">
            <UserIcon className="text-foreground size-5" />
            <span>My account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 px-4 py-2.5 text-base">
            <SettingsIcon className="text-foreground size-5" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 px-4 py-2.5 text-base">
            <CreditCardIcon className="text-foreground size-5" />
            <span>Billing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 px-4 py-2.5 text-base">
            <UsersIcon className="text-foreground size-5" />
            <span>Manage team</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 px-4 py-2.5 text-base">
            <SquarePenIcon className="text-foreground size-5" />
            <span>Customization</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 px-4 py-2.5 text-base">
            <CirclePlusIcon className="text-foreground size-5" />
            <span>Add team account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <form action={logoutAction}>
          <DropdownMenuItem variant="destructive" asChild className="gap-2 px-4 py-2.5 text-base">
            <button type="submit" className="w-full">
              <LogOutIcon className="size-5" />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
