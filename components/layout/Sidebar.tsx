"use client";

import React, { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home, 
  Menu,
  Settings,
  Search,
  Building2,
  FileText,
  CreditCard,
  Wallet,
  BarChart3,
  ListChecks,
  BookOpen,
  FileSpreadsheet,
  Building,
  ArrowLeftRight,
  Upload,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  children?: React.ReactNode;
  isCollapsed?: boolean;
}

const NavItem = ({ href, icon, title, isActive, children, isCollapsed }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Boolean(children);

  return (
    <div>
      <div className="flex items-center">
        <Link 
          href={hasChildren ? '#' : href}
          onClick={hasChildren ? (e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          } : undefined}
          className={cn(
            "flex flex-1 items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
            isActive 
              ? "bg-primary/10 text-primary" 
              : "hover:bg-primary/5 text-foreground hover:text-primary"
          )}
        >
          {icon}
          {!isCollapsed && <span className="flex-1">{title}</span>}
        </Link>
        {hasChildren && !isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform", 
                isOpen && "rotate-180"
              )} 
            />
          </Button>
        )}
      </div>
      {hasChildren && isOpen && !isCollapsed && (
        <div className="ml-6 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const SubNavItem = ({ href, title, isActive, icon }: NavItemProps) => {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};

const Breadcrumb = ({ pathname }: { pathname: string }) => {
  if (pathname === '/') return null;

  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/');
    const title = path.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return { href, title };
  });

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-primary">
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.href}>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={crumb.href}
            className={cn(
              "hover:text-primary",
              index === breadcrumbs.length - 1 && "text-primary font-medium"
            )}
          >
            {crumb.title}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

const SearchBox = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        ref={inputRef}
        placeholder="Buscar..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { href: '/', icon: <Home size={18} />, title: 'Inicio' },
    { 
      href: '/cuenta-corriente', 
      icon: <Building2 size={18} />, 
      title: 'Cuenta Corriente',
      children: [
        {
          title: 'Gestión',
          description: 'Administración y gestión de cuentas',
          href: '#',
          icon: <Building2 size={18} />,
          children: [
            { href: '/cuenta-corriente/adm-cuenta-corriente', title: 'Adm. de cuenta Corriente', icon: <Building size={18} /> },
            { href: '/cuenta-corriente/abm-cuentas-remuneradas', title: 'ABM de Cuentas Remuneradas', icon: <FileSpreadsheet size={18} /> },
            { href: '/cuenta-corriente/reversas', title: 'Reversas', icon: <ArrowLeftRight size={18} /> },
            { href: '/cuenta-corriente/altas-masivas', title: 'Altas Masivas', icon: <Upload size={18} /> },
            { href: '/cuenta-corriente/cambio-sucursal', title: 'Cambio Sucursal', icon: <RefreshCw size={18} /> }
          ]
        },
        { href: '/cuenta-corriente/saldos', title: 'Saldos', icon: <Wallet size={18} /> },
        { href: '/cuenta-corriente/cheques', title: 'Cheques', icon: <FileText size={18} /> },
        { href: '/cuenta-corriente/listados', title: 'Listados', icon: <ListChecks size={18} /> },
        { href: '/cuenta-corriente/chequeras', title: 'Chequeras', icon: <BookOpen size={18} /> },
        { href: '/cuenta-corriente/acuerdos', title: 'Acuerdos', icon: <BarChart3 size={18} /> }
      ]
    },
    { href: '/configuracion', icon: <Settings size={18} />, title: 'Configuración' },
  ];

  const filterItems = useCallback((items: any[], query: string): any[] => {
    if (!query.trim()) return items;
    
    return items.filter(item => {
      const matchesTitle = item.title.toLowerCase().includes(query.toLowerCase());
      const hasMatchingChildren = item.children?.some((child: any) => 
        child.title.toLowerCase().includes(query.toLowerCase()) ||
        (child.children?.some((subChild: any) =>
          subChild.title.toLowerCase().includes(query.toLowerCase())
        ))
      );
      return matchesTitle || hasMatchingChildren;
    });
  }, []);

  const filteredNavItems = filterItems(navItems, searchQuery);

  const SidebarContent = () => (
    <div className={cn(
      "flex h-full flex-col gap-4 transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[280px]"
    )}>
      <div className="flex items-center justify-between px-3 py-4">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-foreground">Banco Bica</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hidden md:flex"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      {!isCollapsed && (
        <div className="px-3">
          <SearchBox 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      )}

      <div className="flex-1 space-y-1 px-3">
        {filteredNavItems.map((item, index) => (
          <div key={index} className="mb-1">
            <NavItem
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            >
              {!isCollapsed && item.children?.map((child: any, childIndex: number) => (
                <div key={childIndex}>
                  {child.children ? (
                    <NavItem
                      href={child.href}
                      icon={child.icon}
                      title={child.title}
                      isActive={pathname === child.href}
                    >
                      {child.children.map((subChild: any, subChildIndex: number) => (
                        <SubNavItem
                          key={subChildIndex}
                          href={subChild.href}
                          title={subChild.title}
                          icon={subChild.icon}
                          isActive={pathname === subChild.href}
                        />
                      ))}
                    </NavItem>
                  ) : (
                    <SubNavItem
                      href={child.href}
                      title={child.title}
                      icon={child.icon}
                      isActive={pathname === child.href}
                    />
                  )}
                </div>
              ))}
            </NavItem>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block border-r bg-card">
        <SidebarContent />
      </div>

      <div 
        className={cn(
          "fixed top-0 right-0 bg-background z-10 p-4 border-b transition-all duration-300",
          isCollapsed ? "left-[60px]" : "left-[280px]",
          "md:block"
        )}
      >
        <Breadcrumb pathname={pathname} />
      </div>
    </>
  );
}