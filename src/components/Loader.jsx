const Loader = ({ label = 'Loading' }) => (
  <div className="grid min-h-[240px] place-items-center">
    <div className="text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-god-border border-t-god-gold" />
      <p className="mt-4 text-sm uppercase tracking-[0.25em] text-god-muted">{label}</p>
    </div>
  </div>
);

export default Loader;
