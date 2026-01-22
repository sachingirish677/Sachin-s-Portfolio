import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderGit2, Wrench, GraduationCap, User, Briefcase } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/about', label: 'About', icon: User },
        { path: '/projects', label: 'Projects', icon: FolderGit2 },
        { path: '/skills', label: 'Skills', icon: Wrench },
        { path: '/education', label: 'Education', icon: GraduationCap },
        { path: '/experience', label: 'Experience', icon: Briefcase },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600">Portfolio Admin</h1>
                </div>
                <nav className="mt-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
