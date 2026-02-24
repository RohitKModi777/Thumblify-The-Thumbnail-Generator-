

const SoftBackdrop = () => {
  return (
    <div className='fixed inset-0 -z-1 pointer-events-none overflow-hidden'>
      {/* Top-left gold glow */}
      <div className='absolute -left-20 -top-20 w-[500px] h-[400px] rounded-full blur-[120px] opacity-15'
        style={{ background: "radial-gradient(circle, #f5c842 0%, #c98b0a 50%, transparent 100%)" }} />

      {/* Right silver/gray glow */}
      <div className='absolute right-0 top-1/3 w-[400px] h-[350px] rounded-full blur-[140px] opacity-10'
        style={{ background: "radial-gradient(circle, #d4d4d8 0%, #71717a 60%, transparent 100%)" }} />

      {/* Bottom-center deep purple-gold mix */}
      <div className='absolute left-1/2 -translate-x-1/2 bottom-0 w-[700px] h-[300px] rounded-full blur-[130px] opacity-12'
        style={{ background: "radial-gradient(ellipse, rgba(200,158,40,0.5) 0%, rgba(80,40,160,0.3) 60%, transparent 100%)" }} />
    </div>
  );
};

export default SoftBackdrop;
