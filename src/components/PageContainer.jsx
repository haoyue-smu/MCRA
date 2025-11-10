function PageContainer({ children, className = '' }) {
  const containerClasses = ['max-w-7xl mx-auto px-6 md:px-12 py-8', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className={containerClasses}>{children}</div>
    </div>
  );
}

export default PageContainer;

