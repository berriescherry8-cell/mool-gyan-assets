
import type { LucideIcon } from "lucide-react";
import { Home, Newspaper, Video, Camera, BookOpen, UserPlus, HelpCircle, ShoppingCart, LayoutDashboard, FileText, BookCopy, Library, LogIn, MessageSquareQuote, Shield, DownloadCloud, AudioLines, Sparkles, Wifi, Music, BellRing, HandHeart } from "lucide-react";
import type { Translation } from './i18n/locales';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  isAdmin?: boolean;
  isHidden?: boolean; // To hide from UI
}

export const getNavItems = (t: Translation): NavItem[] => [
  { href: "/", label: "Home", icon: Home },
  { href: "/deeksha-aavedan", label: t.nav_deeksha_aavedan, icon: HandHeart },
  { href: "/live-satsang", label: t.nav_live_satsang, icon: Wifi },
  { href: "/satsang", label: t.nav_satsang, icon: Video },
  { href: "/photos", label: t.nav_photos, icon: Camera },
  { href: "/books", label: t.nav_bookstore, icon: BookOpen },
  { href: "/news", label: t.nav_news, icon: Newspaper },
  { href: "/join", label: t.nav_join, icon: UserPlus },
  { href: "/satguru-bhajan", label: t.nav_satguru_bhajan, icon: Music },
  { href: "/reference", label: t.nav_reference, icon: Library },
  { href: "/faq", label: t.nav_faq, icon: HelpCircle },
  { href: "/feedback", label: t.nav_feedback, icon: MessageSquareQuote },
  { href: "/privacy-policy", label: "Privacy Policy", icon: Shield, isHidden: true },
  { href: "/login", label: "Admin Login", icon: LogIn, isHidden: true },
  { href: "/admin", label: "Admin", icon: LayoutDashboard, isAdmin: true },
  { href: "/admin/orders", label: "Manage Orders", icon: ShoppingCart, isAdmin: true },
  { href: "/admin/notifications", label: "Notification Manager", icon: BellRing, isAdmin: true },
  { href: "/admin/deeksha", label: "Manage Deeksha", icon: HandHeart, isAdmin: true },
  { href: "/admin/news", label: "Manage News", icon: Newspaper, isAdmin: true },
  { href: "/admin/books", label: "Manage Books", icon: BookOpen, isAdmin: true },
  { href: "/admin/satguru-bhajan", label: "Manage Satguru Bhajan", icon: Music, isAdmin: true },
  { href: "/admin/faqs", label: "Manage FAQs", icon: HelpCircle, isAdmin: true },
  { href: "/admin/feedback", label: "Manage Feedback", icon: MessageSquareQuote, isAdmin: true },
  { href: "/admin/members", label: "Manage Members", icon: UserPlus, isAdmin: true },
  { href: "/admin/photos", label: "Manage Photos", icon: Camera, isAdmin: true },
  { href: "/admin/videos", label: "Manage Videos", icon: Video, isAdmin: true },
  { href: "/admin/saar-sangrah", label: "Manage Saar Sangrah", icon: BookCopy, isAdmin: true },
  { href: "/admin/reference", label: "Manage Reference", icon: FileText, isAdmin: true },
  { href: "/admin/tools/storage-browser", label: "Storage Browser", icon: Sparkles, isAdmin: true },
];
