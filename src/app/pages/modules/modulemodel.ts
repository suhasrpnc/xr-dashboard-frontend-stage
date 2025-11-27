export interface AppModule {
  id: string;
  title: string;
  description: string;
  icon: string;          // PrimeIcons class (e.g., pi pi-chart-bar)
  route: string;         // route path
  rolesAllowed: string[]; // roles that can access this module
  color?: string;        // optional accent color
}
