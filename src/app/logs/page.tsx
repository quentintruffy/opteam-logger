import { Sidemenu, Table } from '@/components';
import { getAllLogs } from '@/utils/redis';

export default async function LogsPage() {
  const logs = await getAllLogs();
  if (!logs) {
    return <div>No logs found</div>;
  }
  return (
    <div className="flex h-full flex-row">
      <Sidemenu data={logs} />
      <div className="flex-1 overflow-auto">
        <Table data={logs} />
      </div>
    </div>
  );
}
