export function LumaBackground() {
  return (
    <>
      <div className="luma-background" aria-hidden="true">
        <span className="luma-aurora luma-aurora-top" />
        <span className="luma-aurora luma-aurora-fixed-blue" />
        <span className="luma-aurora luma-aurora-fixed-warm" />
      </div>
      <div className="luma-background-scroll" aria-hidden="true">
        <span className="luma-aurora luma-aurora-scroll-blue" />
        <span className="luma-aurora luma-aurora-scroll-yellow" />
        <span className="luma-aurora luma-aurora-scroll-lilac" />
        <span className="luma-aurora luma-aurora-scroll-bottom" />
      </div>
    </>
  );
}
