type Props = {};

function Dock({}: Props) {
  return (
    <iframe
      className="max-w-7xl mx-auto w-full h-full"
      src={process.env.FLOWISE_HOST}
    />
  );
}

export default Dock;
