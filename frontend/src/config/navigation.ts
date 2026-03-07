export interface NavItem {
  label: string;
  to: string;
}

export const navConfig: Record<string, NavItem[]> = {
  guest: [
    { label: "Products", to: "/products" },
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
  ],
  user: [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Cart", to: "/cart" },
  ],
  admin: [
    { label: "Dashboard", to: "/admin" },
    { label: "Manage Products", to: "/admin/products" },
    { label: "Orders", to: "/admin/orders" },
  ],
};
