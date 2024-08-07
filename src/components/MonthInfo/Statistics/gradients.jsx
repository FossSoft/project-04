export const gradientId = 'waterGradient';

export const LinearGradient = () => (
  <defs>
    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#9BE1A0" stopOpacity={1} />
      <stop offset="100%" stopColor="#9BE1A0" stopOpacity={0} />
    </linearGradient>
  </defs>
);
