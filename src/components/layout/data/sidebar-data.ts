import {
  IconLayoutDashboard,
  IconUserCog,
  IconUsers,
  IconFileText,
  IconUserShield,
  IconPalette,
  IconNotification,
  IconBrowserCheck,
  IconHelp,
} from '@tabler/icons-react'
import { Command } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Ahmad Codes',
    email: 'contact@ahmadcodes.com',
    avatar: '/avatars/ahmad.jpg',
  },
  teams: [
    {
      name: 'Ahmad Codes Admin',
      logo: Command,
      plan: 'Content Management',
    },
  ],
  navGroups: [
    {
      title: 'Overview',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      title: 'Content Management',
      items: [
        {
          title: 'Articles',
          url: '/articles',
          icon: IconFileText,
        },
      ],
    },
    {
      title: 'User Management',
      items: [
        {
          title: 'Users',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Profile',
          url: '/settings/account',
          icon: IconUserCog,
        },
        {
          title: 'Account',
          url: '/settings/account',
          icon: IconUserShield,
        },
        {
          title: 'Appearance',
          url: '/settings/appearance',
          icon: IconPalette,
        },
        {
          title: 'Notifications',
          url: '/settings/notifications',
          icon: IconNotification,
        },
        {
          title: 'Display',
          url: '/settings/display',
          icon: IconBrowserCheck,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
