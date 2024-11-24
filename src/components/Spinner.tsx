

const SpinnerLoader = () => {
  return (
    <div className="relative w-6 h-6 border-2 border-[#350545] rounded-full overflow-hidden shadow-[inset_-0.75px_-0.75px_0.75px_rgba(255,255,255,0.2),inset_1.5px_1.5px_1.5px_rgba(0,0,0,0.4),-0.75px_-0.75px_0.75px_rgba(255,255,255,0.1),1.5px_1.5px_1.5px_rgba(0,0,0,0.4)]">

      <div className="absolute top-1 left-1 right-1 bottom-1 z-10 bg-[#350545] rounded-full border border-[#350545] shadow-[inset_-0.25px_-0.25px_0.75px_rgba(255,255,255,0.2),inset_0.375px_0.375px_0.75px_rgba(0,0,0,0.5)]" />

    
      <div
        className="absolute inset-0 blur-[3px] rounded-full animate-spin"
        style={{
          backgroundImage: 'linear-gradient(-225deg, #ff7402 0%, #ffe700 50%, #fff55e 100%)',
        }}
      ></div>
    </div>
  );
};

export default SpinnerLoader;
