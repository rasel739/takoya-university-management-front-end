'use client';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Moon, Settings, Sun, User, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from 'next-themes';
import { SidebarTrigger, useSidebar } from './sidebar';
import { Button } from './button';
import { Badge } from '@/components/ui/badge';
import { getUserInfo } from '@/service/auth.service';
import { USER_ROLE } from '@/constants/role';

const Header = ({ notificationCount = 3, className = '' }) => {
  const { theme, setTheme } = useTheme();

  const { open } = useSidebar();

  const userInfo = getUserInfo() as { role: USER_ROLE; name?: string; email?: string } | null;

  const handleThemeChange = useCallback(
    (newTheme: string) => {
      try {
        setTheme(newTheme);
      } catch (error) {
        console.warn('Failed to change theme:', error);
      }
    },
    [setTheme]
  );

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const notificationVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
        delay: 0.3,
      },
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        repeat: Infinity,
        duration: 2,
      },
    },
  };

  return (
    <motion.header
      className={`px-4  md:px-6 py-2 flex items-center justify-between sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b-2 border-border/50  ${className}`}
      variants={headerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* Left side */}
      <motion.div
        initial={{ x: -6, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className='flex items-center gap-3 '
      >
        <motion.div variants={itemVariants} whileHover='hover' whileTap='tap'>
          <SidebarTrigger
            size='icon'
            className='hover:bg-primary/10 transition-colors duration-200 p-2'
          />
        </motion.div>

        {open ? (
          ''
        ) : (
          <motion.div variants={itemVariants}>
            <Link
              href='/dashboard'
              className='text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:from-primary/80 hover:to-primary transition-all duration-300'
            >
              Takoya University
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Right side */}
      <motion.div
        className='flex items-center gap-2 md:gap-3'
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Notifications with badge */}
        <motion.div variants={itemVariants} whileHover='hover' whileTap='tap'>
          <Button
            variant='ghost'
            size='icon'
            className='relative hover:bg-primary/10 transition-colors duration-200'
            aria-label={`Notifications (${notificationCount} unread)`}
          >
            <motion.div variants={notificationVariants} whileHover='hover'>
              <Bell className='h-5 w-5' />
            </motion.div>
            <AnimatePresence>
              {notificationCount > 0 && (
                <motion.div
                  variants={badgeVariants}
                  initial='hidden'
                  animate={['visible', 'pulse']}
                  exit='hidden'
                  className='absolute -top-1 -right-1'
                >
                  <Badge
                    variant='destructive'
                    className='h-5 w-5 p-0 flex items-center justify-center text-xs font-bold'
                  >
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        {/* Enhanced Theme toggle */}
        <motion.div variants={itemVariants} whileHover='hover' whileTap='tap'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='relative overflow-hidden hover:bg-primary/10 transition-colors duration-200'
                aria-label='Toggle theme'
              >
                <AnimatePresence mode='wait'>
                  {theme === 'dark' ? (
                    <motion.div
                      key='moon'
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className='h-5 w-5' />
                    </motion.div>
                  ) : (
                    <motion.div
                      key='sun'
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className='h-5 w-5' />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
              <DropdownMenuItem
                onClick={() => handleThemeChange('light')}
                className='cursor-pointer'
              >
                <Sun className='mr-2 h-4 w-4' />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleThemeChange('dark')}
                className='cursor-pointer'
              >
                <Moon className='mr-2 h-4 w-4' />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleThemeChange('system')}
                className='cursor-pointer'
              >
                <Settings className='mr-2 h-4 w-4' />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Enhanced User menu */}
        <motion.div variants={itemVariants} whileHover='hover' whileTap='tap'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                className='flex items-center gap-3 cursor-pointer hover:bg-primary/5 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label='User menu'
              >
                <Avatar className='h-8 w-8 md:h-9 md:w-9 ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200'>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt={`${userInfo?.name}'s avatar`}
                  />
                  <AvatarFallback className='bg-primary/10 text-primary font-semibold text-sm'>
                    {userInfo?.name}
                  </AvatarFallback>
                </Avatar>
                <div className='hidden sm:flex flex-col items-start'>
                  <span className='text-sm font-semibold text-foreground truncate max-w-32'>
                    {userInfo?.name}
                  </span>
                  <span className='text-xs text-muted-foreground'>{userInfo?.role}</span>
                </div>
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>{userInfo?.name}</p>
                  <p className='text-xs leading-none text-muted-foreground'>{userInfo?.email}</p>
                  <p className='text-xs leading-none text-primary'>{userInfo?.role}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href='/profile'>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href='/settings'>
                  <Settings className='mr-2 h-4 w-4' />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950'>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
