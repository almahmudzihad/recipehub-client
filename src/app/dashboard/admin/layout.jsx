import { requireRole } from "@/lib/action/recipe";

const AdminLayout = async({ children }) => {
    await requireRole('admin');
  return children;
}

export default AdminLayout