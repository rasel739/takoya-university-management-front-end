'use client';

import { sidebaritems } from '@/constants/sidebaritems';
import { USER_ROLE } from '@/constants/role';
import { getUserInfo } from '@/service/auth.service';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from './sidebar';
import { ChevronDown, Home, AlertCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface AppSidebarProps {
  className?: string;
  onNavigate?: (path: string) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ className, onNavigate }) => {
  const { open } = useSidebar();
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  const userInfo = getUserInfo() as { role: USER_ROLE; name?: string; email?: string } | null;

  const menuItems = sidebaritems(userInfo?.role as string);

  const toggleGroup = useCallback((key: string) => {
    setOpenGroups((prev) => {
      const newOpenGroups = new Set(prev);
      if (newOpenGroups.has(key)) {
        newOpenGroups.delete(key);
      } else {
        newOpenGroups.add(key);
      }
      return newOpenGroups;
    });
  }, []);

  const isActivePath = useCallback(
    (path: string) => {
      return pathname === path || pathname?.startsWith(path + '/');
    },
    [pathname]
  );

  const handleNavigation = useCallback(
    (path: string) => {
      if (onNavigate) {
        onNavigate(path);
      }
    },
    [onNavigate]
  );

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.05,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
        delay: i * 0.03,
      },
    }),
    hover: {
      scale: 1.02,
      x: 4,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 25,
      },
    },
    tap: { scale: 0.98 },
  };

  const groupVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 25,
        staggerChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 25,
        staggerDirection: -1,
      },
    },
  };

  const chevronVariants = {
    closed: { rotate: 0 },
    open: {
      rotate: 180,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 25,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 15,
      },
    },
  };

  const subItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 25,
        delay: i * 0.02,
      },
    }),
    hover: {
      x: 6,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 20,
      },
    },
  };

  interface SidebarMenuItemType {
    key: string;
    label: string | React.ReactNode;
    icon?: React.ReactNode;
    children?: SidebarMenuItemType[];
  }

  const renderMenuItem = useCallback(
    (item: SidebarMenuItemType, index: number) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openGroups.has(item.key);
      const isActive = !hasChildren && isActivePath(item.key);

      if (hasChildren) {
        const hasActiveChild = item?.children?.some((child: SidebarMenuItemType) =>
          isActivePath(child.key)
        );

        return (
          <motion.div key={item.key} variants={menuItemVariants} custom={index}>
            <Collapsible open={isOpen} onOpenChange={() => toggleGroup(item.key)}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <motion.div whileHover='hover' whileTap='tap' variants={menuItemVariants}>
                    <SidebarMenuButton
                      className={cn(
                        'hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg group w-full justify-start',
                        hasActiveChild && 'bg-primary/5 text-primary'
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className={cn(
                          'transition-colors duration-200',
                          hasActiveChild ? 'text-primary' : 'text-primary/70'
                        )}
                      >
                        {item.icon || <AlertCircle className='h-5 w-5' />}
                      </motion.div>
                      <span className='font-medium flex-1 text-left'>{item.label}</span>
                      {hasActiveChild && (
                        <Badge variant='secondary' className='ml-auto mr-2 text-xs'>
                          Active
                        </Badge>
                      )}
                      <motion.div
                        variants={chevronVariants}
                        animate={isOpen ? 'open' : 'closed'}
                        className='shrink-0'
                      >
                        <ChevronDown className='h-4 w-4 transition-colors group-hover:text-primary' />
                      </motion.div>
                    </SidebarMenuButton>
                  </motion.div>
                </CollapsibleTrigger>
                <AnimatePresence>
                  {isOpen && (
                    <CollapsibleContent forceMount>
                      <motion.div
                        variants={groupVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                      >
                        <SidebarMenuSub className='ml-4 border-l border-border/30 pl-4 space-y-1'>
                          {item?.children?.map((child, childIndex: number) => {
                            const isChildActive = isActivePath(child.key);
                            return (
                              <motion.div
                                key={child.key}
                                variants={subItemVariants}
                                custom={childIndex}
                                whileHover='hover'
                                whileTap={{ scale: 0.98 }}
                              >
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton asChild>
                                    <Link
                                      href={child.key}
                                      className={cn(
                                        'flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg w-full',
                                        isChildActive && 'bg-primary/10 text-primary font-medium'
                                      )}
                                      onClick={() => handleNavigation(child.key)}
                                    >
                                      {child.icon && (
                                        <motion.div
                                          whileHover={{ scale: 1.1, rotate: 3 }}
                                          transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 17,
                                          }}
                                          className={cn(
                                            'transition-colors duration-200',
                                            isChildActive ? 'text-primary' : 'text-primary/60'
                                          )}
                                        >
                                          {child.icon}
                                        </motion.div>
                                      )}
                                      <span className='flex-1'>
                                        {typeof child.label === 'object' && child?.label
                                          ? child.label
                                          : child.label}
                                      </span>
                                      {isChildActive && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className='w-2 h-2 bg-primary rounded-full'
                                        />
                                      )}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              </motion.div>
                            );
                          })}
                        </SidebarMenuSub>
                      </motion.div>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
              </SidebarMenuItem>
            </Collapsible>
          </motion.div>
        );
      }

      return (
        <motion.div
          key={item.key}
          variants={menuItemVariants}
          custom={index}
          whileHover='hover'
          whileTap='tap'
        >
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href={item.key}
                className={cn(
                  'flex items-center gap-3 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg w-full',
                  isActive && 'bg-primary/10 text-primary font-medium'
                )}
                onClick={() => handleNavigation(item.key)}
              >
                {item.icon && (
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className={cn(
                      'transition-colors duration-200',
                      isActive ? 'text-primary' : 'text-primary/70'
                    )}
                  >
                    {item.icon}
                  </motion.div>
                )}
                <span className='font-medium flex-1 text-left'>
                  {typeof item.label === 'object' && item?.label ? item.label : item.label}
                </span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className='w-2 h-2 bg-green-600 rounded-full'
                  />
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </motion.div>
      );
    },
    [openGroups, isActivePath, toggleGroup, handleNavigation]
  );

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !open}
            className='fixed inset-0  z-40 md:hidden'
            aria-hidden='true'
          />
        )}
      </AnimatePresence>
      <motion.div
        variants={sidebarVariants}
        initial={{ width: 80 }}
        animate={{
          width: open ? 320 : 80,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className={cn(`h-full hidden md:block ${open ? 'w-xs' : 'w-20'}`, className)}
      >
        <Sidebar
          collapsible='icon'
          className='border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed   top-0 left-0 bottom-0 min-h-screen  shadow-xl md:shadow-lg z-50 md:z-30 overflow-hidden flex flex-col'
        >
          {/* Header */}
          <SidebarHeader className='py-4 border-b border-border/50'>
            <motion.div variants={headerVariants}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <motion.div variants={logoVariants} whileHover='hover' whileTap={{ scale: 0.95 }}>
                    <SidebarMenuButton asChild>
                      <Link
                        href='/dashboard'
                        className='hover:bg-primary/10 transition-colors duration-200 rounded-lg'
                        onClick={() => handleNavigation('/dashboard')}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                          <Home className='h-5 w-5 mr-2 text-primary' />
                        </motion.div>
                        <span className='font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
                          Takoya University
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
              </SidebarMenu>
            </motion.div>
          </SidebarHeader>

          {/* Main Content */}
          <SidebarContent className={`px-2 py-4 min-h-screen ${!open && 'w-20'}`}>
            <SidebarGroup>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              ></motion.div>
              <SidebarGroupContent>
                <motion.div
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  initial='hidden'
                  animate='visible'
                >
                  <SidebarMenu className='space-y-2'>
                    {menuItems.length > 0 ? (
                      menuItems.map((item, index) => renderMenuItem(item, index))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='flex flex-col items-center justify-center py-8 text-muted-foreground'
                      >
                        <AlertCircle className='h-8 w-8 mb-2' />
                        <p className='text-sm text-center'>No menu items available</p>
                      </motion.div>
                    )}
                  </SidebarMenu>
                </motion.div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </motion.div>
    </>
  );
};

export default AppSidebar;
