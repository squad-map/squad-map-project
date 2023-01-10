interface GridCardsProps {
  children: React.ReactNode;
}

const GridCards = ({ children }: GridCardsProps) => (
  <section className="relative grid grid-cols-3 gap-4">{children}</section>
);

export default GridCards;
