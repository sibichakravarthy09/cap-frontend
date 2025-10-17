// Use default imports and re-export as named exports
import LoginPage from './Login';
import RegisterPage from './Register';
import DashboardPage from './Dashboard';
import CustomersPage from './Customers';
import LeadsPage from './Leads';
import DealsPage from './Deals';
import TasksPage from './Tasks';
import ActivitiesPage from './Activities';
import ReportsPage from './Reports';

export const Login = LoginPage;
export const Register = RegisterPage;
export const Dashboard = DashboardPage;
export const Customers = CustomersPage;
export const Leads = LeadsPage;
export const Deals = DealsPage;
export const Tasks = TasksPage;
export const Activities = ActivitiesPage;
export const Reports = ReportsPage;

// Also export defaults for direct imports
export { default as LoginDefault } from './Login';
export { default as RegisterDefault } from './Register';
export { default as DashboardDefault } from './Dashboard';
export { default as CustomersDefault } from './Customers';
export { default as LeadsDefault } from './Leads';
export { default as DealsDefault } from './Deals';
export { default as TasksDefault } from './Tasks';
export { default as ActivitiesDefault } from './Activities';
export { default as ReportsDefault } from './Reports';