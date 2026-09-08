const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cpath fill='none' stroke='%23c9a15c' stroke-opacity='0.5' stroke-width='0.75' d='M96 0H0V96'/%3E%3C/svg%3E")`;

const DUST = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'%3E%3Cg fill='%23c9a15c' fill-opacity='0.6'%3E%3Ccircle cx='32' cy='48' r='1'/%3E%3Ccircle cx='104' cy='12' r='1.4'/%3E%3Ccircle cx='176' cy='96' r='1'/%3E%3Ccircle cx='248' cy='40' r='1.2'/%3E%3Ccircle cx='64' cy='160' r='1'/%3E%3Ccircle cx='224' cy='184' r='1'/%3E%3Ccircle cx='128' cy='240' r='1.3'/%3E%3Ccircle cx='40' cy='248' r='1'/%3E%3Ccircle cx='256' cy='256' r='1'/%3E%3Ccircle cx='212' cy='128' r='0.9'/%3E%3Ccircle cx='88' cy='216' r='0.9'/%3E%3Ccircle cx='160' cy='272' r='1'/%3E%3C/g%3E%3C/svg%3E")`;

/**
 * BackgroundFX — static ambient background: base wash, aurora drift layers,
 * a soft spotlight cone, fine grid, sparse warm dust, grain and edge
 * vignette. All layers are pure CSS, so nothing reacts to the cursor.
 */
export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_95%_at_50%_-12%,#17171d_0%,#0d0d10_45%,#0a0a0c_100%)]" />

      {/* Aurora — slow GPU-transformed drift layers */}
      <div className="bg-sway-a absolute -top-[25%] left-[4%] h-[75vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(201,161,92,0.14),rgba(201,161,92,0))] blur-[120px]" />
      <div className="bg-sway-b absolute -bottom-[30%] right-[-8%] h-[70vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgba(63,84,137,0.17),rgba(63,84,137,0))] blur-[140px]" />
      <div className="bg-sway-c absolute top-[20%] left-[55%] h-[55vh] w-[45vw] rounded-full bg-[radial-gradient(closest-side,rgba(148,163,184,0.08),rgba(148,163,184,0))] blur-[150px]" />

      {/* Soft spotlight cone rising from the top */}
      <div className="absolute -top-[25%] left-1/2 h-[120vh] w-[150vw] -translate-x-1/2 bg-[conic-gradient(from_90deg_at_50%_0%,transparent_0deg,rgba(201,161,92,0.055)_12deg,transparent_24deg)]" />

      {/* Fine grid texture, fading toward the bottom */}
      <div
        className="absolute inset-0 opacity-[0.045] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        style={{ backgroundImage: GRID, backgroundSize: "96px 96px" }}
      />

      {/* Sparse warm dust */}
      <div
        className="absolute inset-0 opacity-[0.09] [mask-image:radial-gradient(120%_90%_at_50%_30%,black,transparent_75%)]"
        style={{ backgroundImage: DUST, backgroundSize: "280px 280px" }}
      />

      {/* Fine grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: "180px 180px" }}
      />

      {/* Edge vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_45%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}