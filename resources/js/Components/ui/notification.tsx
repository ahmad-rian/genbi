export function Notification({ message, type = 'success' }: { message: string, type?: 'success' | 'error' }) {
    const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
    const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
    const borderColor = type === 'success' ? 'border-green-500' : 'border-red-500';
  
    return (
      <div className={`${bgColor} border-l-4 ${borderColor} ${textColor} p-4`}>
        <p>{message}</p>
      </div>
    );
  }