export function SummaryArea({ children }: Readonly<{ children?: React.ReactNode }>) {
  return <div className="pl-[13px] pr-[9px] flex">{children}</div>;
}

export function IconArea({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="pt-[2px]">{children}</div>;
}

export function InclineReqArea({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-[159px] flex flex-col items-end">{children}</div>;
}
